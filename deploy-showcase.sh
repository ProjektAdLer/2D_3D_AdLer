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

# Check if showcase-deployment branch exists locally
if git show-ref --verify --quiet refs/heads/showcase-deployment; then
    echo "📦 Switching to existing showcase-deployment branch"
    git checkout showcase-deployment
else
    echo "🆕 Creating new showcase-deployment branch"
    git checkout -b showcase-deployment
fi

# Remove all files except .git, build directory and some essential files
echo "🧹 Cleaning up branch..."
find . -maxdepth 1 -not -name '.git' -not -name 'build' -not -name '.' -not -name '..' -exec rm -rf {} \; 2>/dev/null || true

# Move build contents to root
echo "📁 Moving build contents to root..."
shopt -s dotglob  # Include hidden files in globbing
mv build/* .
shopt -u dotglob  # Disable dotglob again
rmdir build

# Create .nojekyll file for GitHub Pages
echo "📄 Creating .nojekyll file for GitHub Pages..."
touch .nojekyll

# Add all files and commit
echo "💾 Committing changes..."
git add .
git commit -m "Deploy showcase build - $(date '+%Y-%m-%d %H:%M:%S')" || echo "⚠️  No changes to commit"

# Push to remote
echo "🌐 Pushing to remote showcase-deployment branch..."
git push origin showcase-deployment --force

# Switch back to original branch
echo "🔄 Switching back to $CURRENT_BRANCH"
git checkout $CURRENT_BRANCH

echo "✅ Showcase deployment completed successfully!"
echo "🌍 The showcase should be available on the showcase-deployment branch"