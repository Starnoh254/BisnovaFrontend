# BisnovaFrontend Deployment Guide

This guide provides step-by-step instructions to deploy the BisnovaFrontend React application to a VPS with Node.js and Nginx already installed.

## Prerequisites

- VPS with root/sudo access
- Node.js installed (v18 or higher recommended)
- Nginx installed and running
- Git installed on VPS
- Domain name pointed to your VPS IP (optional but recommended)

## Deployment Steps

### 1. Prepare Your Local Environment

Before deploying, ensure your application builds successfully locally:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test the build locally (optional)
npm run preview
```

### 2. Upload Code to VPS

#### Option A: Using Git (Recommended)

```bash
# SSH into your VPS
ssh your-username@your-vps-ip

# Navigate to web directory
cd /var/www

# Clone your repository
sudo git clone https://github.com/Starnoh254/BisnovaFrontend.git
sudo chown -R $USER:$USER BisnovaFrontend
cd BisnovaFrontend

# If updating existing deployment
# git pull origin main
```

#### Option B: Using SCP/SFTP

```bash
# From your local machine, compress and upload
tar -czf bisnova-frontend.tar.gz .
scp bisnova-frontend.tar.gz your-username@your-vps-ip:/var/www/

# On VPS
ssh your-username@your-vps-ip
cd /var/www
sudo tar -xzf bisnova-frontend.tar.gz
sudo mv bisnova-frontend BisnovaFrontend  # Rename if needed
sudo chown -R $USER:$USER BisnovaFrontend
```

### 3. Build the Application on VPS

```bash
# Navigate to project directory
cd /var/www/BisnovaFrontend

# Install dependencies
npm install

# Build the production version
npm run build

# Verify build was successful
ls -la dist/
```

### 4. Configure Nginx

#### Create Nginx Configuration

```bash
# Create nginx configuration file
sudo nano /etc/nginx/sites-available/bisnova-frontend
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain or VPS IP
    
    root /var/www/BisnovaFrontend/dist;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Handle client-side routing (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Hide nginx version
    server_tokens off;
}
```

#### Enable the Site

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/bisnova-frontend /etc/nginx/sites-enabled/

# Remove default site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Ensure nginx is running
sudo systemctl status nginx
sudo systemctl enable nginx  # Enable auto-start on boot
```

### 5. Set Up SSL Certificate (Optional but Recommended)

If you have a domain name, set up SSL using Let's Encrypt:

```bash
# Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 6. Set Up Firewall (Optional but Recommended)

```bash
# Configure UFW firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 7. Create Deployment Script (Optional)

Create a deployment script for easier updates:

```bash
# Create deployment script
nano /var/www/BisnovaFrontend/deploy.sh
```

Add the following content:

```bash
#!/bin/bash

# BisnovaFrontend Deployment Script

echo "Starting deployment..."

# Navigate to project directory
cd /var/www/BisnovaFrontend

# Pull latest changes
git pull origin main

# Install/update dependencies
npm install

# Build the application
npm run build

# Reload nginx
sudo systemctl reload nginx

echo "Deployment completed successfully!"
echo "Site is available at: http://your-domain.com"
```

Make it executable:

```bash
chmod +x /var/www/BisnovaFrontend/deploy.sh
```

### 8. Verify Deployment

1. **Check if the site is accessible:**
   ```bash
   curl -I http://your-vps-ip
   # or
   curl -I http://your-domain.com
   ```

2. **Check nginx logs if there are issues:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

3. **Check nginx status:**
   ```bash
   sudo systemctl status nginx
   ```

## Troubleshooting

### Common Issues and Solutions

1. **403 Forbidden Error:**
   ```bash
   # Check file permissions
   sudo chown -R www-data:www-data /var/www/BisnovaFrontend/dist
   sudo chmod -R 755 /var/www/BisnovaFrontend/dist
   ```

2. **404 Error on Routes:**
   - Ensure the nginx configuration includes `try_files $uri $uri/ /index.html;`
   - This handles client-side routing

3. **Build Fails:**
   ```bash
   # Check Node.js version
   node --version
   
   # Clear npm cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Nginx Won't Start:**
   ```bash
   # Check configuration syntax
   sudo nginx -t
   
   # Check for port conflicts
   sudo netstat -tlnp | grep :80
   ```

## Updating the Application

To update your deployed application:

```bash
# Using the deployment script
/var/www/BisnovaFrontend/deploy.sh

# Or manually
cd /var/www/BisnovaFrontend
git pull origin main
npm install
npm run build
sudo systemctl reload nginx
```

## Automated Deployment with GitHub Actions

For automatic deployments when you push to GitHub, follow these steps:

### 1. Setup VPS for Automation

Run the VPS setup script on your server:

```bash
# On your VPS, navigate to project directory
cd /var/www/BisnovaFrontend

# Make setup script executable and run it
chmod +x vps-setup.sh
./vps-setup.sh
```

This script will:
- Generate SSH keys for GitHub Actions
- Set up proper permissions
- Create deployment scripts
- Configure webhook listener (optional)

### 2. Configure GitHub Secrets

In your GitHub repository, go to Settings > Secrets and variables > Actions, and add these secrets:

```
VPS_HOST: your-server-ip-or-domain
VPS_USERNAME: your-vps-username  
VPS_SSH_KEY: your-private-ssh-key-content
VPS_PORT: 22 (or your custom SSH port)
```

### 3. GitHub Actions Workflow

The `.github/workflows/deploy.yml` file is already configured to:
- Run tests and build validation on every push/PR
- Deploy to VPS only on pushes to main branch
- Create automatic backups before deployment
- Rollback on deployment failures
- Set proper file permissions

### 4. Deployment Process

Now when you push to the main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

The following will happen automatically:
1. GitHub Actions runs tests and builds
2. If tests pass, connects to your VPS via SSH
3. Creates backup of current deployment
4. Pulls latest code and rebuilds
5. Updates nginx and verifies deployment
6. Rolls back if anything fails

### 5. Monitor Deployments

- Check GitHub Actions tab for deployment status
- View deployment logs in real-time
- Get notified of deployment success/failure

### Alternative: Webhook Method

For more advanced webhook handling, you can also use the webhook listener:

```bash
# Start the webhook service
sudo systemctl start bisnova-webhook
sudo systemctl enable bisnova-webhook

# Check status
sudo systemctl status bisnova-webhook
```

Then configure GitHub webhook to point to: `http://your-server:3001/webhook`

## Performance Optimization

1. **Enable Nginx Caching:**
   Add to your nginx configuration:
   ```nginx
   location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

2. **Monitor Performance:**
   ```bash
   # Monitor nginx access logs
   sudo tail -f /var/log/nginx/access.log
   
   # Monitor system resources
   htop
   ```

## Security Considerations

1. **Regular Updates:**
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade
   
   # Update Node.js dependencies
   npm audit fix
   ```

2. **Backup Strategy:**
   ```bash
   # Create backup script
   sudo cp -r /var/www/BisnovaFrontend /backup/bisnova-frontend-$(date +%Y%m%d)
   ```

## Support

- Check nginx error logs: `/var/log/nginx/error.log`
- Check nginx access logs: `/var/log/nginx/access.log`
- Monitor system resources with `htop` or `top`
- Test nginx configuration: `sudo nginx -t`

---

**Note:** Replace `your-domain.com` and `your-vps-ip` with your actual domain name and VPS IP address throughout this guide.
