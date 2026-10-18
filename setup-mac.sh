
#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Checking macOS environment..."

if [[ "$(uname -s)" != "Darwin" ]]; then
    echo "This installer is intended for macOS."
    exit 1
fi

if ! command -v node >/dev/null 2>&1; then
    if ! command -v brew >/dev/null 2>&1; then
        echo "Install Homebrew first: https://brew.sh"
        exit 1
    fi

    echo "Installing Node.js..."
    brew install node
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "npm is missing. Check your Node.js installation."
    exit 1
fi

if [[ ! -d "/Applications/Google Chrome.app" ]] && \
   [[ ! -d "$HOME/Applications/Google Chrome.app" ]]; then
    if ! command -v brew >/dev/null 2>&1; then
        echo "Install Chrome manually or install Homebrew."
        exit 1
    fi

    echo "Installing Google Chrome..."
    brew install --cask google-chrome
fi

echo "Installing project dependencies..."
npm ci

echo "Setup completed successfully."
echo "Run your tests with: npm test"
