const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs/promises");

const PROJECT_DIR = path.resolve(__dirname);
const REBUILD_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
const PORT = process.argv[2] || 3000;

let serverProcess = null;

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

function runCommand(cmd, args = []) {
  return new Promise((resolve, reject) => {
    log(`Running: ${cmd} ${args.join(" ")}`);

    const proc = spawn(cmd, args, {
      cwd: PROJECT_DIR,
      stdio: "inherit", // Show output in console
    });

    proc.on("close", (code) => {
      if (code === 0) {
        log(`✓ ${cmd} completed successfully`);
        resolve();
      } else {
        reject(new Error(`${cmd} ${args.join(" ")} failed with code ${code}`));
      }
    });

    proc.on("error", reject);
  });
}

async function startServer() {
  try {
    log("Deleting .next folder...");
    await fs.rm(path.join(PROJECT_DIR, ".next"), { recursive: true, force: true });

    log("Building Next.js app...");
    await runCommand("npm", ["run", "build"]);

    log(`Starting server on port ${PORT}...`);
    serverProcess = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
      cwd: PROJECT_DIR,
      stdio: "inherit", // Show server output
    });

    serverProcess.on("error", (err) => {
      log(`Server error: ${err.message}`);
    });

    serverProcess.on("exit", (code, signal) => {
      log(`Server exited with code ${code}, signal ${signal}`);
    });

    log(`✓ Server started (PID: ${serverProcess.pid})`);
  } catch (err) {
    log(`✗ Error during startup: ${err.message}`);
    throw err; // Re-throw to handle in restartLoop
  }
}

async function killServer() {
  if (!serverProcess || serverProcess.killed) {
    log("No server process to kill");
    return;
  }

  log(`Stopping server (PID: ${serverProcess.pid})...`);

  return new Promise((resolve) => {
    serverProcess.on("exit", () => {
      log("✓ Server stopped");
      resolve();
    });

    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", serverProcess.pid, "/f", "/t"]);
    } else {
      serverProcess.kill("SIGTERM");
    }

    // Timeout fallback
    setTimeout(() => {
      if (!serverProcess.killed) {
        log("Force killing server...");
        serverProcess.kill("SIGKILL");
      }
      resolve();
    }, 5000);
  });
}

async function restartLoop() {
  log("=== Auto Rebuilder Started ===");
  log(`Rebuild interval: ${REBUILD_INTERVAL / 1000 / 60 / 60} hours`);
  log(`Port: ${PORT}`);

  while (true) {
    try {
      await startServer();

      const nextRebuild = new Date(Date.now() + REBUILD_INTERVAL);
      log(`Next rebuild scheduled at: ${nextRebuild.toISOString()}`);

      await new Promise((r) => setTimeout(r, REBUILD_INTERVAL));

      log("=== Starting scheduled rebuild ===");
      await killServer();
    } catch (err) {
      log(`Error in restart loop: ${err.message}`);
      log("Retrying in 30 seconds...");
      await new Promise((r) => setTimeout(r, 30000));
    }
  }
}

// Handle uncaught errors to prevent silent exits
process.on("uncaughtException", (err) => {
  log(`Uncaught Exception: ${err.message}`);
  console.error(err.stack);
});

process.on("unhandledRejection", (reason) => {
  log(`Unhandled Rejection: ${reason}`);
});

restartLoop();
