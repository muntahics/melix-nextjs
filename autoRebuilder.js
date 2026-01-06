const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs/promises");

const PROJECT_DIR = path.resolve(__dirname);
const REBUILD_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
const PORT = process.argv[2] || 3000;

let serverProcess = null;

function runCommand(cmd, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd: PROJECT_DIR,
      stdio: "ignore",
    });

    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} failed with code ${code}`));
    });

    proc.on("error", reject);
  });
}

async function startServer() {
  try {
    // Delete .next folder (cross-platform)
    await fs.rm(path.join(PROJECT_DIR, ".next"), { recursive: true, force: true });

    // Build
    await runCommand("npm", ["run", "build"]);

    // Start
    serverProcess = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
      cwd: PROJECT_DIR,
      stdio: "ignore",
      detached: true,
    });
  } catch {
    // Ignore all errors (per no-logs requirement)
  }
}

async function killServer() {
  if (!serverProcess || serverProcess.killed) return;

  const exited = new Promise((resolve) => serverProcess.on("exit", resolve));

  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", serverProcess.pid, "/f", "/t"]);
  } else {
    try {
      process.kill(-serverProcess.pid, "SIGTERM");
    } catch {
      // ignore
    }
  }

  return exited;
}

async function restartLoop() {
  while (true) {
    await startServer();
    await new Promise((r) => setTimeout(r, REBUILD_INTERVAL));
    await killServer();
  }
}

restartLoop();
