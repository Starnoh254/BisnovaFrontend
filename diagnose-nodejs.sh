#!/bin/bash

# Node.js Environment Diagnostic Script
# Run this on your VPS to diagnose Node.js installation issues

echo "🔍 Node.js Environment Diagnostic"
echo "=================================="

# Check current user
echo "Current user: $(whoami)"
echo "Current PATH: $PATH"
echo ""

# Check for Node.js installations
echo "🔍 Searching for Node.js installations..."
NODE_LOCATIONS=$(find /usr /opt /snap /home -name "node" -type f -executable 2>/dev/null | head -10)
if [ -n "$NODE_LOCATIONS" ]; then
    echo "Found Node.js at:"
    echo "$NODE_LOCATIONS"
else
    echo "❌ No Node.js installations found"
fi
echo ""

# Check for NPM installations
echo "🔍 Searching for NPM installations..."
NPM_LOCATIONS=$(find /usr /opt /snap /home -name "npm" -type f -executable 2>/dev/null | head -10)
if [ -n "$NPM_LOCATIONS" ]; then
    echo "Found NPM at:"
    echo "$NPM_LOCATIONS"
else
    echo "❌ No NPM installations found"
fi
echo ""

# Check which command results
echo "🔍 Testing 'which' commands..."
echo "which node: $(which node 2>/dev/null || echo 'not found')"
echo "which npm: $(which npm 2>/dev/null || echo 'not found')"
echo ""

# Check common installation methods
echo "🔍 Checking installation methods..."

# Check for NVM
if [ -f ~/.nvm/nvm.sh ]; then
    echo "✅ NVM found at ~/.nvm/nvm.sh"
    source ~/.nvm/nvm.sh
    echo "NVM version: $(nvm --version 2>/dev/null || echo 'error')"
    echo "Available Node versions: $(nvm list 2>/dev/null || echo 'none')"
else
    echo "❌ NVM not found"
fi

# Check for snap installation
if [ -d /snap/node ]; then
    echo "✅ Node.js snap package found"
    echo "Snap node version: $(/snap/bin/node --version 2>/dev/null || echo 'error')"
else
    echo "❌ Node.js snap package not found"
fi

# Check for system package installation
if command -v apt >/dev/null 2>&1; then
    echo "📦 Checking apt packages..."
    if dpkg -l | grep -q nodejs; then
        echo "✅ nodejs package installed via apt"
        echo "Version: $(dpkg -l | grep nodejs | awk '{print $3}')"
    else
        echo "❌ nodejs package not installed via apt"
    fi
fi

# Check for different shell environments
echo ""
echo "🔍 Testing different shell environments..."

# Test with bash login shell
echo "Testing bash login shell:"
bash -l -c "echo 'PATH in login shell: $PATH'; which node; which npm" 2>/dev/null || echo "Error in bash login shell"

# Test with specific paths
echo ""
echo "🔍 Testing with common paths added..."
TEST_PATHS="/usr/local/bin:/usr/bin:/bin:/snap/bin:/opt/node/bin"
PATH="$TEST_PATHS:$PATH" bash -c "echo 'Extended PATH: $PATH'; which node; which npm" 2>/dev/null || echo "Still not found with extended PATH"

echo ""
echo "🛠️  SOLUTIONS:"
echo "==============="
echo ""

if [ ! -f ~/.nvm/nvm.sh ] && [ ! -d /snap/node ] && ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not installed or not properly configured."
    echo ""
    echo "Option 1: Install Node.js via NodeSource repository (recommended):"
    echo "  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    echo ""
    echo "Option 2: Install via snap:"
    echo "  sudo snap install node --classic"
    echo ""
    echo "Option 3: Install via NVM:"
    echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "  source ~/.bashrc"
    echo "  nvm install --lts"
else
    echo "✅ Node.js appears to be installed but may not be in PATH for non-interactive shells."
    echo ""
    echo "Solutions to try:"
    echo ""
    echo "1. Add Node.js to system PATH by editing /etc/environment:"
    echo "   sudo nano /etc/environment"
    echo "   Add your Node.js path to the PATH variable"
    echo ""
    echo "2. Create symlinks in /usr/local/bin:"
    NODE_BIN=$(find /usr /opt /snap /home -name "node" -type f -executable 2>/dev/null | head -1)
    NPM_BIN=$(find /usr /opt /snap /home -name "npm" -type f -executable 2>/dev/null | head -1)
    if [ -n "$NODE_BIN" ]; then
        echo "   sudo ln -sf $NODE_BIN /usr/local/bin/node"
    fi
    if [ -n "$NPM_BIN" ]; then
        echo "   sudo ln -sf $NPM_BIN /usr/local/bin/npm"
    fi
    echo ""
    echo "3. If using NVM, add to ~/.bashrc:"
    echo "   export NVM_DIR=\"\$HOME/.nvm\""
    echo "   [ -s \"\$NVM_DIR/nvm.sh\" ] && \\. \"\$NVM_DIR/nvm.sh\""
    echo "   [ -s \"\$NVM_DIR/bash_completion\" ] && \\. \"\$NVM_DIR/bash_completion\""
fi

echo ""
echo "🔄 After applying fixes, test with:"
echo "   bash -c 'node --version && npm --version'"
echo ""
echo "Then re-run your deployment!"
