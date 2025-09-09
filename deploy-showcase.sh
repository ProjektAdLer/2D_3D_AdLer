#!/bin/bash

# Deploy # Clone the GitHub Pages repository
echo "🔄 Cloning GitHub Pages repository..."
git clone "$PAGES_REPO_URL" "$TEMP_REPO_DIR"

# Navigate to the cloned repository
cd "$TEMP_REPO_DIR"

# Configure git for large file handling (only if not already set)
echo "⚙️ Checking git configuration..."
if [ "$(git config --get http.postBuffer)" != "1048576000" ]; then
    echo "🔧 Configuring git for large file handling..."
    git config http.postBuffer 1048576000  # 1GB buffer
    git config http.maxRequestBuffer 100M
    git config core.compression 0
    git config core.preloadindex true
    git config core.fscache true
    git config gc.auto 256
    git config http.lowSpeedLimit 0
    git config http.lowSpeedTime 999999
else
    echo "✅ Git already optimally configured"
fise build to separate GitHub Pages repository

set -e  # Exit on any error

echo "🚀 Starting showcase deployment to GitHub Pages repository..."

# Check if we have a build directory
if [ ! -d "build" ]; then
    echo "❌ Error: build directory not found. Please run 'npm run build-showcase' first."
    exit 1
fi

# Configuration - adjust these variables as needed
PAGES_REPO_URL="https://github.com/ProjektAdLer/projektadler.github.io.git"
PAGES_BRANCH="main"  # GitHub Pages typically uses main branch
TEMP_REPO_DIR=$(mktemp -d)

echo "� Current directory: $(pwd)"
echo "📦 Temporary repository directory: $TEMP_REPO_DIR"

# Clone the GitHub Pages repository
echo "� Cloning GitHub Pages repository..."
git clone "$PAGES_REPO_URL" "$TEMP_REPO_DIR"

# Navigate to the cloned repository
cd "$TEMP_REPO_DIR"

# Remove all existing files (except .git)
echo "🧹 Cleaning up existing files..."
find . -maxdepth 1 -not -name '.git' -not -name '.' -not -name '..' -exec rm -rf {} \; 2>/dev/null || true

# Copy build contents from the original repository
echo "📁 Copying build contents..."
cp -r "$OLDPWD/build"/* .

# Add .nojekyll file for GitHub Pages
touch .nojekyll

# Add all files and commit
echo "💾 Committing changes..."
git add .

# Check if there are actually changes to commit
if git diff --staged --quiet; then
    echo "⚠️  No changes detected in build output"
    echo "📊 Checking file timestamps..."
    ls -la static/js/ | head -5 2>/dev/null || true
    echo "🔍 Checking current status..."
    git log --oneline -1 2>/dev/null || echo "No previous commits"
else
    echo "✅ Changes detected, committing..."
    git commit -m "Deploy showcase build $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Push to remote repository
echo "🌐 Pushing to GitHub Pages repository..."
echo "📦 Using optimized push settings..."

# Push with force to handle any conflicts
if ! git push origin "$PAGES_BRANCH" --force; then
    echo "⚠️ Standard push failed. Trying alternative approach..."
    
    # Alternative: Try pushing without force first
    if ! git push origin "$PAGES_BRANCH"; then
        echo "❌ Push failed. This might be due to large file sizes or network issues."
        echo "💡 Suggestions:"
        echo "   - Check your internet connection"
        echo "   - Ensure you have push permissions to the repository"
        echo "   - Consider reducing build size by optimizing assets"
        exit 1
    fi
fi

# Navigate back to original directory
cd "$OLDPWD"

# Clean up temporary directory
echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_REPO_DIR"

echo "✅ Showcase deployment completed successfully!"
echo "🌍 The showcase should be available at: https://projektadler.github.io"