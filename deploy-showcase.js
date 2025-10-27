#!/usr/bin/env node

/**
 * Deploy showcase build to separate GitHub Pages repository
 * Cross-platform compatible deployment script using Node.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

// Configuration
const PAGES_REPO_URL = "git@github.com:ProjektAdLer/projektadler.github.io.git";
const PAGES_BRANCH = "main";
const CUSTOM_DOMAIN = "hello.projekt-adler.eu";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function log(emoji, message, color = colors.reset) {
  console.log(`${emoji} ${color}${message}${colors.reset}`);
}

function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: options.silent ? "pipe" : "inherit",
      ...options,
    });
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return null;
  }
}

async function main() {
  log(
    "🚀",
    "Starting showcase deployment to GitHub Pages repository...",
    colors.cyan,
  );

  // Check if build directory exists
  const buildDir = path.join(process.cwd(), "build");
  if (!fs.existsSync(buildDir)) {
    log(
      "❌",
      'Error: build directory not found. Please run "npm run build-showcase" first.',
      colors.red,
    );
    process.exit(1);
  }

  // Create temporary directory
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "adler-deploy-"));
  log("📦", `Temporary repository directory: ${tempDir}`, colors.cyan);

  try {
    // Clone the GitHub Pages repository
    log("🔄", "Cloning GitHub Pages repository...", colors.cyan);
    exec(`git clone "${PAGES_REPO_URL}" "${tempDir}"`);

    // Navigate to temp directory
    process.chdir(tempDir);

    // Configure git for large file handling
    log("⚙️", "Configuring git for large file handling...", colors.cyan);
    const gitConfigs = [
      "git config http.postBuffer 1048576000",
      "git config http.maxRequestBuffer 100M",
      "git config core.compression 0",
      "git config core.preloadindex true",
      "git config core.fscache true",
      "git config gc.auto 256",
      "git config http.lowSpeedLimit 0",
      "git config http.lowSpeedTime 999999",
    ];

    gitConfigs.forEach((config) =>
      exec(config, { silent: true, ignoreError: true }),
    );

    // Remove all existing files (except .git)
    log("🧹", "Cleaning up existing files...", colors.cyan);
    const files = fs.readdirSync(tempDir);
    files.forEach((file) => {
      if (file !== ".git") {
        const filePath = path.join(tempDir, file);
        if (fs.statSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
    });

    // Copy build contents
    log("📁", "Copying build contents...", colors.cyan);
    const buildFiles = fs.readdirSync(buildDir);
    buildFiles.forEach((file) => {
      const srcPath = path.join(buildDir, file);
      const destPath = path.join(tempDir, file);

      if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });

    // Add .nojekyll file for GitHub Pages
    fs.writeFileSync(path.join(tempDir, ".nojekyll"), "");

    // Add CNAME file for custom domain
    log("📝", "Creating CNAME file for custom domain...", colors.cyan);
    fs.writeFileSync(path.join(tempDir, "CNAME"), CUSTOM_DOMAIN);

    // Add all files and commit
    log("💾", "Committing changes...", colors.cyan);
    exec("git add .");

    // Check if there are changes to commit
    const hasChanges =
      exec("git diff --staged --quiet", { silent: true, ignoreError: true }) ===
      null;

    if (!hasChanges) {
      log("⚠️", "No changes detected in build output", colors.yellow);
    } else {
      log("✅", "Changes detected, committing...", colors.green);
      const timestamp = new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
      exec(`git commit -m "Deploy showcase build ${timestamp}"`);
    }

    // Push to remote repository
    log("🌐", "Pushing to GitHub Pages repository...", colors.cyan);
    log("📦", "Using optimized push settings...", colors.cyan);

    try {
      exec(`git push origin ${PAGES_BRANCH} --force`);
    } catch (error) {
      log(
        "⚠️",
        "Standard push failed. Trying alternative approach...",
        colors.yellow,
      );
      try {
        exec(`git push origin ${PAGES_BRANCH}`);
      } catch (error2) {
        log(
          "❌",
          "Push failed. This might be due to large file sizes or network issues.",
          colors.red,
        );
        log("💡", "Suggestions:", colors.cyan);
        log("", "   - Check your internet connection");
        log("", "   - Ensure you have push permissions to the repository");
        log("", "   - Consider reducing build size by optimizing assets");
        process.exit(1);
      }
    }

    log("✅", "Showcase deployment completed successfully!", colors.green);
    log(
      "🌍",
      "The showcase should be available at: https://projektadler.github.io",
      colors.cyan,
    );
    log("🌍", `Custom domain: https://${CUSTOM_DOMAIN}`, colors.cyan);
  } finally {
    // Clean up temporary directory
    log("🧹", "Cleaning up temporary files...", colors.cyan);
    process.chdir(buildDir.replace("build", "")); // Go back to project root
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

// Run the deployment
main().catch((error) => {
  console.error("❌", "Deployment failed:", error.message);
  process.exit(1);
});
