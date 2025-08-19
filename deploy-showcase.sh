#!/bin/bash

# Deploy showcase build to showcase-deployment branch

set -e  # Exit on any error

echo "🚀 Starting showcase deployment..."

# Check if we have a build directory
if [ ! -d "build" ]; then
    echo "❌ Error: build directory not found. Please run 'npm run build-showcase' first."
    exit 1
fi

# Store current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Create a temporary directory for build contents
TEMP_BUILD_DIR=$(mktemp -d)
echo "📦 Copying build to temporary directory: $TEMP_BUILD_DIR"
cp -r build/* "$TEMP_BUILD_DIR/"

# Add .nojekyll file for GitHub Pages to temp directory
touch "$TEMP_BUILD_DIR/.nojekyll"

# Check if showcase-deployment branch exists locally
if git show-ref --verify --quiet refs/heads/showcase-deployment; then
    echo "📦 Switching to existing showcase-deployment branch"
    git checkout showcase-deployment
else
    echo "🆕 Creating new showcase-deployment branch"
    git checkout -b showcase-deployment
fi

# Remove all files except .git 
echo "🧹 Cleaning up branch..."
find . -maxdepth 1 -not -name '.git' -not -name '.' -not -name '..' -exec rm -rf {} \; 2>/dev/null || true

# Copy build contents from temp directory to root
echo "📁 Moving build contents to root..."
cp -r "$TEMP_BUILD_DIR"/* .
cp -r "$TEMP_BUILD_DIR"/.[!.]* . 2>/dev/null || true  # Copy hidden files if any exist

# Clean up temp directory
rm -rf "$TEMP_BUILD_DIR"

# Add all files and commit
echo "💾 Committing changes..."
git add .

# Check if there are actually changes to commit
if git diff --staged --quiet; then
    echo "⚠️  No changes detected in build output"
    echo "📊 Checking file timestamps..."
    ls -la static/js/ | head -5
    echo "🔍 Comparing with last commit..."
    git log --oneline -1
else
    echo "✅ Changes detected, committing..."
    git commit -m "Deploy showcase build $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Push to remote
echo "🌐 Pushing to remote showcase-deployment branch..."
git push origin showcase-deployment --force

# Switch back to original branch
echo "🔄 Switching back to $CURRENT_BRANCH"
git checkout $CURRENT_BRANCH

echo "✅ Showcase deployment completed successfully!"
echo "🌍 The showcase should be available on the showcase-deployment branch"