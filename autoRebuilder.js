const { spawn, spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const PROJECT_DIR = path.resolve(__dirname);
const REBUILD_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
const PORT = process.argv[2] || 3000;

let serverProcess = null;
let rebuildTimer = null;

function log(message) {
  const timestamp = new Date().toISOString();
  const msg = `[${timestamp}] ${message}`;
  console.log(msg);
  // Force flush
  if (process.stdout.write) process.stdout.write("");
}

function runCommand(cmd, args = []) {
  log(`Running: ${cmd} ${args.join(" ")}`);

  const result = spawnSync(cmd, args, {
    cwd: PROJECT_DIR,
    stdio: "inherit",
    shell: true,
  });

  if (result.error) {
    log(`✗ ${cmd} error: ${result.error.message}`);
    return false;
  }

  if (result.status === 0) {
    log(`✓ ${cmd} completed successfully`);
    return true;
  } else {
    log(`✗ ${cmd} failed with exit code ${result.status}`);
    return false;
  }
}

function startServer() {
  // Kill any existing server first
  killServerSync();

  log("Deleting .next folder...");
  const deleteResult = spawnSync("rm", ["-rf", ".next"], {
    cwd: PROJECT_DIR,
    shell: true,
  });
  if (deleteResult.status === 0) {
    log("✓ .next folder deleted");
  } else {
    log("Warning: Could not delete .next folder");
  }

  log("Building Next.js app...");
  const buildSuccess = runCommand("npm", ["run", "build"]);

  if (!buildSuccess) {
    log("✗ Build failed, retrying in 30 seconds...");
    setTimeout(() => startServer(), 30000);
    return;
  }

  log(`Starting server on port ${PORT}...`);
  serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: PROJECT_DIR,
    stdio: "inherit",
    shell: true,
  });

  serverProcess.on("error", (err) => {
    log(`✗ Server error: ${err.message}`);
  });

  serverProcess.on("exit", (code, signal) => {
    log(`Server exited (code: ${code}, signal: ${signal})`);
    serverProcess = null;

    // If server dies unexpectedly (not from our kill), restart it
    if (signal !== "SIGTERM" && signal !== "SIGKILL") {
      log("Server died unexpectedly, restarting in 10 seconds...");
      setTimeout(() => startServer(), 10000);
    }
  });

  log(`✓ Server started (PID: ${serverProcess.pid})`);

  // Schedule next rebuild
  const nextRebuild = new Date(Date.now() + REBUILD_INTERVAL);
  log(`Next rebuild scheduled at: ${nextRebuild.toISOString()}`);

  rebuildTimer = setTimeout(() => {
    log("=== Starting scheduled rebuild ===");
    startServer();
  }, REBUILD_INTERVAL);
}

function killServerSync() {
  if (rebuildTimer) {
    clearTimeout(rebuildTimer);
    rebuildTimer = null;
  }

  if (!serverProcess) {
    return;
  }

  log(`Stopping server (PID: ${serverProcess.pid})...`);

  try {
    serverProcess.kill("SIGTERM");
    // Give it a moment
    const start = Date.now();
    while (!serverProcess.killed && Date.now() - start < 5000) {
      // busy wait (not ideal but simple)
    }
    if (!serverProcess.killed) {
      log("Force killing server...");
      serverProcess.kill("SIGKILL");
    }
    log("✓ Server stopped");
  } catch (err) {
    log(`Warning during kill: ${err.message}`);
  }
  serverProcess = null;
}

// Handle graceful shutdown
process.on("SIGINT", () => {
  log("Received SIGINT, shutting down...");
  killServerSync();
  process.exit(0);
});

process.on("SIGTERM", () => {
  log("Received SIGTERM, shutting down...");
  killServerSync();
  process.exit(0);
});

// Handle uncaught errors
process.on("uncaughtException", (err) => {
  log(`Uncaught Exception: ${err.message}`);
  console.error(err.stack);
});

process.on("unhandledRejection", (reason) => {
  log(`Unhandled Rejection: ${reason}`);
});

// Start
log("=== Auto Rebuilder Started ===");
log(`Rebuild interval: ${REBUILD_INTERVAL / 1000 / 60 / 60} hours`);
log(`Port: ${PORT}`);
log(`Project: ${PROJECT_DIR}`);

startServer();
