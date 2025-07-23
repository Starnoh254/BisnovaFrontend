#!/bin/bash

# BisnovaFrontend Automated Deployment Script
# Usage: ./deploy.sh [environment]
# Default environment: production

set -e  # Exit on any error

# Configuration
PROJECT_DIR="/var/www/BisnovaFrontend"
BACKUP_DIR="$PROJECT_DIR/backups"
ENVIRONMENT=${1:-production}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
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

# Check if running as correct user
check_permissions() {
    log "Checking permissions..."
    if [[ $EUID -eq 0 ]]; then
        error "This script should not be run as root"
    fi
}

# Create backup directory if it doesn't exist
setup_backup_dir() {
    log "Setting up backup directory..."
    mkdir -p "$BACKUP_DIR"
}

# Create backup of current deployment
create_backup() {
    log "Creating backup of current deployment..."
    if [ -d "$PROJECT_DIR/dist" ]; then
        cp -r "$PROJECT_DIR/dist" "$BACKUP_DIR/dist-backup-$TIMESTAMP"
        success "Backup created: $BACKUP_DIR/dist-backup-$TIMESTAMP"
    else
        warning "No existing dist directory found, skipping backup"
    fi
}

# Pull latest changes from repository
pull_changes() {
    log "Pulling latest changes from repository..."
    cd "$PROJECT_DIR"
    
    # Stash any local changes
    git stash push -m "Auto-stash before deployment $TIMESTAMP" || true
    
    # Fetch and reset to latest
    git fetch origin
    git reset --hard origin/main
    
    success "Code updated to latest version"
}

# Install dependencies
install_dependencies() {
    log "Installing/updating dependencies..."
    cd "$PROJECT_DIR"
    
    if [ "$ENVIRONMENT" = "production" ]; then
        npm ci --only=production
    else
        npm ci
    fi
    
    success "Dependencies installed"
}

# Build application
build_application() {
    log "Building application for $ENVIRONMENT..."
    cd "$PROJECT_DIR"
    
    # Run build
    npm run build
    
    # Verify build was successful
    if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
        error "Build failed - dist directory or index.html not found"
    fi
    
    success "Application built successfully"
}

# Set proper permissions
set_permissions() {
    log "Setting proper file permissions..."
    cd "$PROJECT_DIR"
    
    # Set ownership to www-data
    sudo chown -R www-data:www-data dist/
    
    # Set proper permissions
    sudo chmod -R 755 dist/
    
    success "Permissions set correctly"
}

# Test nginx configuration
test_nginx() {
    log "Testing nginx configuration..."
    
    if sudo nginx -t; then
        success "Nginx configuration is valid"
        return 0
    else
        error "Nginx configuration test failed"
        return 1
    fi
}

# Reload nginx
reload_nginx() {
    log "Reloading nginx..."
    
    if sudo systemctl reload nginx; then
        success "Nginx reloaded successfully"
    else
        error "Failed to reload nginx"
    fi
}

# Rollback to previous version
rollback() {
    warning "Rolling back to previous version..."
    cd "$PROJECT_DIR"
    
    # Find latest backup
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/dist-backup-* 2>/dev/null | head -1)
    
    if [ -n "$LATEST_BACKUP" ]; then
        log "Restoring from backup: $LATEST_BACKUP"
        sudo rm -rf dist
        sudo cp -r "$LATEST_BACKUP" dist
        set_permissions
        reload_nginx
        success "Rollback completed"
    else
        error "No backup found for rollback"
    fi
}

# Clean up old backups
cleanup_backups() {
    log "Cleaning up old backups (keeping last 5)..."
    cd "$BACKUP_DIR"
    
    # Remove old backups, keep last 5
    ls -t dist-backup-* 2>/dev/null | tail -n +6 | xargs rm -rf 2>/dev/null || true
    
    success "Backup cleanup completed"
}

# Health check
health_check() {
    log "Performing health check..."
    
    # Check if nginx is running
    if ! sudo systemctl is-active --quiet nginx; then
        error "Nginx is not running"
    fi
    
    # Check if site is accessible
    if command -v curl >/dev/null; then
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/ || echo "000")
        if [ "$HTTP_CODE" = "200" ]; then
            success "Site is accessible (HTTP $HTTP_CODE)"
        else
            warning "Site returned HTTP $HTTP_CODE"
        fi
    fi
}

# Send notification (optional - can be extended)
send_notification() {
    log "Deployment completed at $(date)"
    success "🚀 BisnovaFrontend deployed successfully!"
    
    # You can add webhook notifications here
    # curl -X POST -H 'Content-type: application/json' \
    #   --data '{"text":"🚀 BisnovaFrontend deployed successfully!"}' \
    #   YOUR_SLACK_WEBHOOK_URL
}

# Main deployment function
main() {
    log "Starting BisnovaFrontend deployment (Environment: $ENVIRONMENT)"
    
    # Trap errors and attempt rollback
    trap 'error "Deployment failed! Attempting rollback..."; rollback' ERR
    
    check_permissions
    setup_backup_dir
    create_backup
    pull_changes
    install_dependencies
    build_application
    set_permissions
    
    if test_nginx; then
        reload_nginx
        cleanup_backups
        health_check
        send_notification
    else
        rollback
    fi
    
    success "🎉 Deployment completed successfully!"
}

# Show usage
show_help() {
    echo "BisnovaFrontend Deployment Script"
    echo ""
    echo "Usage: $0 [environment]"
    echo ""
    echo "Environments:"
    echo "  production (default) - Deploy for production"
    echo "  staging             - Deploy for staging"
    echo ""
    echo "Examples:"
    echo "  $0                  # Deploy to production"
    echo "  $0 production       # Deploy to production"
    echo "  $0 staging          # Deploy to staging"
    echo ""
    echo "Options:"
    echo "  -h, --help          # Show this help message"
}

# Parse command line arguments
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    *)
        main
        ;;
esac
