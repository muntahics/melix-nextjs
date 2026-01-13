const { spawn, execSync } = require("child_process");
const path = require("path");
const fs = require("fs/promises");

const PROJECT_DIR = path.resolve(__dirname);
const REBUILD_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
const PORT = process.argv[2] || 3000;

let serverProcess = null;
let rebuildTimer = null;

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

function runCommandSync(cmd, args = []) {
  log(`Running: ${cmd} ${args.join(" ")}`);
  try {
    execSync(`${cmd} ${args.join(" ")}`, {
      cwd: PROJECT_DIR,
      stdio: "inherit",
    });
    log(`✓ ${cmd} completed successfully`);
    return true;
  } catch (err) {
    log(`✗ ${cmd} failed: ${err.message}`);
    return false;
  }
}

async function startServer() {
  // Kill any existing server first
  await killServer();

  log("Deleting .next folder...");
  await fs.rm(path.join(PROJECT_DIR, ".next"), { recursive: true, force: true });

  log("Building Next.js app...");
  const buildSuccess = runCommandSync("npm", ["run", "build"]);

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

async function killServer() {
  if (rebuildTimer) {
    clearTimeout(rebuildTimer);
    rebuildTimer = null;
  }

  if (!serverProcess) {
    return;
  }

  log(`Stopping server (PID: ${serverProcess.pid})...`);

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      if (serverProcess && !serverProcess.killed) {
        log("Force killing server...");
        serverProcess.kill("SIGKILL");
      }
      resolve();
    }, 5000);

    serverProcess.once("exit", () => {
      clearTimeout(timeout);
      log("✓ Server stopped");
      serverProcess = null;
      resolve();
    });

    serverProcess.kill("SIGTERM");
  });
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  log("Received SIGINT, shutting down...");
  await killServer();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  log("Received SIGTERM, shutting down...");
  await killServer();
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
