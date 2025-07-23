#!/bin/bash

# Node.js PATH Fix Script for VPS
# This script fixes common Node.js PATH issues for automated deployments

set -e

echo "🔧 Fixing Node.js PATH for automated deployments..."

# Check if running as root
if [[ $EUID -eq 0 ]]; then
    echo "❌ This script should not be run as root"
    exit 1
fi

# Function to create symlinks
create_symlinks() {
    local node_path="$1"
    local npm_path="$2"
    
    echo "Creating symlinks in /usr/local/bin..."
    
    if [ -n "$node_path" ] && [ -f "$node_path" ]; then
        sudo ln -sf "$node_path" /usr/local/bin/node
        echo "✅ Node.js symlink created: /usr/local/bin/node -> $node_path"
    fi
    
    if [ -n "$npm_path" ] && [ -f "$npm_path" ]; then
        sudo ln -sf "$npm_path" /usr/local/bin/npm
        echo "✅ NPM symlink created: /usr/local/bin/npm -> $npm_path"
    fi
}

# Find Node.js and NPM
echo "🔍 Searching for Node.js and NPM..."
NODE_PATH=$(find /usr /opt /snap /home -name "node" -type f -executable 2>/dev/null | head -1)
NPM_PATH=$(find /usr /opt /snap /home -name "npm" -type f -executable 2>/dev/null | head -1)

echo "Found Node.js at: ${NODE_PATH:-'not found'}"
echo "Found NPM at: ${NPM_PATH:-'not found'}"

# Check if Node.js is installed
if [ -z "$NODE_PATH" ]; then
    echo "❌ Node.js not found. Installing Node.js..."
    
    # Install Node.js via NodeSource
    echo "Installing Node.js LTS via NodeSource repository..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Update paths
    NODE_PATH="/usr/bin/node"
    NPM_PATH="/usr/bin/npm"
    
    echo "✅ Node.js installed successfully"
else
    echo "✅ Node.js found, creating symlinks..."
    create_symlinks "$NODE_PATH" "$NPM_PATH"
fi

# Verify installation
echo ""
echo "🧪 Testing Node.js installation..."

# Test in current shell
if command -v node >/dev/null 2>&1; then
    echo "✅ Node.js available in current shell: $(node --version)"
else
    echo "❌ Node.js not available in current shell"
fi

if command -v npm >/dev/null 2>&1; then
    echo "✅ NPM available in current shell: $(npm --version)"
else
    echo "❌ NPM not available in current shell"
fi

# Test in non-interactive shell (simulates deployment environment)
echo ""
echo "🧪 Testing in non-interactive shell (deployment simulation)..."
NON_INTERACTIVE_TEST=$(bash -c 'node --version && npm --version' 2>/dev/null || echo "FAILED")

if [ "$NON_INTERACTIVE_TEST" != "FAILED" ]; then
    echo "✅ Node.js and NPM work in non-interactive shell"
    echo "$NON_INTERACTIVE_TEST"
else
    echo "⚠️  Node.js/NPM not working in non-interactive shell"
    echo "Applying additional fixes..."
    
    # Add to system-wide environment
    echo "Adding Node.js to system PATH..."
    
    # Update /etc/environment
    if ! grep -q "/usr/local/bin" /etc/environment; then
        sudo sed -i 's|PATH="\(.*\)"|PATH="/usr/local/bin:\1"|' /etc/environment
        echo "✅ Updated /etc/environment"
    fi
    
    # Create profile script
    sudo tee /etc/profile.d/nodejs.sh > /dev/null << 'EOF'
# Node.js environment setup
export PATH="/usr/local/bin:$PATH"

# Load NVM if available
if [ -f "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi
EOF
    
    sudo chmod +x /etc/profile.d/nodejs.sh
    echo "✅ Created /etc/profile.d/nodejs.sh"
    
    # Test again
    NON_INTERACTIVE_TEST_2=$(bash -c 'source /etc/profile.d/nodejs.sh && node --version && npm --version' 2>/dev/null || echo "STILL_FAILED")
    
    if [ "$NON_INTERACTIVE_TEST_2" != "STILL_FAILED" ]; then
        echo "✅ Node.js now works in non-interactive shell after fixes"
    else
        echo "❌ Still having issues. Manual intervention may be required."
    fi
fi

# Set up project permissions
echo ""
echo "🔐 Setting up project permissions..."
PROJECT_DIR="/var/www/BisnovaFrontend"

if [ -d "$PROJECT_DIR" ]; then
    # Ensure user can access project directory
    sudo chown -R $(whoami):$(whoami) "$PROJECT_DIR"
    
    # Make sure node_modules can be created
    mkdir -p "$PROJECT_DIR/node_modules"
    
    echo "✅ Project permissions configured"
else
    echo "⚠️  Project directory not found: $PROJECT_DIR"
fi

echo ""
echo "🎉 Node.js PATH fix completed!"
echo ""
echo "📋 Summary:"
echo "- Node.js version: $(node --version 2>/dev/null || echo 'Error getting version')"
echo "- NPM version: $(npm --version 2>/dev/null || echo 'Error getting version')"
echo "- Node.js location: $(which node 2>/dev/null || echo 'Not in PATH')"
echo "- NPM location: $(which npm 2>/dev/null || echo 'Not in PATH')"
echo ""
echo "🚀 You can now try deploying again!"
echo "   The GitHub Actions workflow should now be able to find Node.js and NPM."
