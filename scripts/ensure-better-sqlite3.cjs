/**
 * Vercel's restored pnpm cache can contain better-sqlite3 extracted with its
 * build scripts skipped (pnpm v10 blocks them by default), and `pnpm rebuild`
 * no-ops on it. If the native bindings are missing, run the package's own
 * install script (prebuild-install, falling back to node-gyp) in place.
 *
 * NOTE: better-sqlite3 loads its bindings lazily, so a bare require() is not
 * a valid health check — we must actually open a database.
 */
const path = require("node:path");
const { execSync } = require("node:child_process");

function bindingsWork() {
  try {
    const Database = require("better-sqlite3");
    const db = new Database(":memory:");
    db.close();
    return true;
  } catch {
    return false;
  }
}

if (!bindingsWork()) {
  const pkgDir = path.dirname(require.resolve("better-sqlite3/package.json"));
  console.log(`better-sqlite3 bindings missing, building in ${pkgDir}`);
  execSync("npm run install", { cwd: pkgDir, stdio: "inherit" });
  // require() caches the failed module; verify in a fresh process instead.
  execSync(
    `node -e "const D=require('better-sqlite3'); new D(':memory:').close(); console.log('better-sqlite3 bindings OK')"`,
    { cwd: __dirname, stdio: "inherit" },
  );
}
