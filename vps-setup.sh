#!/bin/bash

# VPS Setup Script for GitHub Webhook Deployment
# This script sets up the VPS to handle automated deployments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Configuration
PROJECT_DIR="/var/www/BisnovaFrontend"
WEBHOOK_PORT="3001"
WEBHOOK_SECRET="your-webhook-secret-here"  # Change this!

log "Setting up VPS for automated GitHub deployments..."

# 1. Setup SSH key for GitHub Actions (if not exists)
setup_ssh_key() {
    log "Setting up SSH key for GitHub Actions..."
    
    if [ ! -f ~/.ssh/id_rsa ]; then
        ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
        success "SSH key generated"
    else
        warning "SSH key already exists"
    fi
    
    echo ""
    echo "🔑 Add this public key to your GitHub repository secrets as 'VPS_SSH_KEY':"
    echo "==================================================================================="
    cat ~/.ssh/id_rsa
    echo "==================================================================================="
    echo ""
    echo "📝 Also add these secrets to your GitHub repository:"
    echo "VPS_HOST: $(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
    echo "VPS_USERNAME: $(whoami)"
    echo "VPS_PORT: 22"
    echo ""
}

# 2. Setup project directory permissions
setup_project_permissions() {
    log "Setting up project directory permissions..."
    
    # Ensure user owns the project directory
    sudo chown -R $(whoami):$(whoami) "$PROJECT_DIR"
    
    # Add user to www-data group
    sudo usermod -a -G www-data $(whoami)
    
    # Set proper permissions
    sudo chmod -R 755 "$PROJECT_DIR"
    
    success "Project permissions configured"
}

# 3. Install webhook listener (optional - for more advanced webhook handling)
setup_webhook_listener() {
    log "Setting up webhook listener..."
    
    # Create webhook script
    cat > "$PROJECT_DIR/webhook-listener.js" << 'EOF'
const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const PORT = process.env.WEBHOOK_PORT || 3001;
const SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret-here';
const DEPLOY_SCRIPT = '/var/www/BisnovaFrontend/deploy.sh';

function verifySignature(payload, signature) {
    const computedSignature = crypto
        .createHmac('sha256', SECRET)
        .update(payload)
        .digest('hex');
    
    return crypto.timingSafeEqual(
        Buffer.from(`sha256=${computedSignature}`),
        Buffer.from(signature)
    );
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const signature = req.headers['x-hub-signature-256'];
                
                if (!signature || !verifySignature(body, signature)) {
                    res.writeHead(401);
                    res.end('Unauthorized');
                    return;
                }
                
                const payload = JSON.parse(body);
                
                // Only deploy on push to main branch
                if (payload.ref === 'refs/heads/main') {
                    console.log('🚀 Deployment triggered by GitHub push');
                    
                    exec(`bash ${DEPLOY_SCRIPT}`, (error, stdout, stderr) => {
                        if (error) {
                            console.error('❌ Deployment failed:', error);
                        } else {
                            console.log('✅ Deployment completed:', stdout);
                        }
                    });
                    
                    res.writeHead(200);
                    res.end('Deployment triggered');
                } else {
                    res.writeHead(200);
                    res.end('No deployment needed');
                }
            } catch (error) {
                console.error('Error processing webhook:', error);
                res.writeHead(400);
                res.end('Bad Request');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`🎣 Webhook listener running on port ${PORT}`);
});
EOF

    success "Webhook listener created"
}

# 4. Create systemd service for webhook listener
setup_webhook_service() {
    log "Setting up webhook service..."
    
    sudo tee /etc/systemd/system/bisnova-webhook.service > /dev/null << EOF
[Unit]
Description=BisnovaFrontend Webhook Listener
After=network.target

[Service]
Type=simple
User=$(whoami)
WorkingDirectory=$PROJECT_DIR
ExecStart=/usr/bin/node webhook-listener.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=WEBHOOK_PORT=$WEBHOOK_PORT
Environment=WEBHOOK_SECRET=$WEBHOOK_SECRET

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable bisnova-webhook
    
    success "Webhook service configured"
}

# 5. Setup firewall for webhook
setup_firewall() {
    log "Configuring firewall for webhook..."
    
    # Allow webhook port
    sudo ufw allow $WEBHOOK_PORT/tcp
    
    success "Firewall configured for webhook port $WEBHOOK_PORT"
}

# 6. Setup nginx reverse proxy for webhook (optional)
setup_nginx_webhook() {
    log "Setting up nginx reverse proxy for webhook..."
    
    # Create webhook nginx config
    sudo tee /etc/nginx/sites-available/bisnova-webhook > /dev/null << EOF
server {
    listen 80;
    server_name webhook.your-domain.com;  # Change this to your webhook subdomain
    
    location /webhook {
        proxy_pass http://localhost:$WEBHOOK_PORT/webhook;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

    success "Nginx webhook configuration created (optional)"
}

# 7. Make deployment script executable
make_script_executable() {
    log "Making deployment script executable..."
    chmod +x "$PROJECT_DIR/deploy.sh"
    success "Deployment script is now executable"
}

# 8. Test deployment
test_deployment() {
    log "Testing deployment script..."
    
    if [ -f "$PROJECT_DIR/deploy.sh" ]; then
        # Just validate the script syntax
        bash -n "$PROJECT_DIR/deploy.sh"
        success "Deployment script syntax is valid"
    else
        warning "Deployment script not found - will be created during first deployment"
    fi
}

# Main setup function
main() {
    log "🚀 Starting VPS setup for automated deployments..."
    
    # Check if running as correct user
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root"
    fi
    
    setup_ssh_key
    setup_project_permissions
    setup_webhook_listener
    setup_webhook_service
    setup_firewall
    setup_nginx_webhook
    make_script_executable
    test_deployment
    
    echo ""
    success "🎉 VPS setup completed!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Add the SSH private key to GitHub secrets as 'VPS_SSH_KEY'"
    echo "2. Add VPS_HOST, VPS_USERNAME, and VPS_PORT to GitHub secrets"
    echo "3. Update webhook secret in webhook-listener.js if using webhook method"
    echo "4. Commit and push to trigger your first automated deployment"
    echo ""
    echo "🔧 Optional webhook setup:"
    echo "- Start webhook service: sudo systemctl start bisnova-webhook"
    echo "- Check webhook status: sudo systemctl status bisnova-webhook"
    echo "- Webhook URL: http://your-server:$WEBHOOK_PORT/webhook"
    echo ""
}

# Show help
show_help() {
    echo "VPS Setup Script for BisnovaFrontend"
    echo ""
    echo "This script prepares your VPS for automated GitHub deployments"
    echo ""
    echo "Usage: $0"
    echo ""
    echo "What this script does:"
    echo "1. Generates SSH keys for GitHub Actions"
    echo "2. Sets up proper permissions"
    echo "3. Creates webhook listener (optional)"
    echo "4. Configures systemd service"
    echo "5. Sets up firewall rules"
    echo "6. Prepares nginx configuration"
    echo ""
}

case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    *)
        main
        ;;
esac
