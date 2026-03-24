const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the workspace root for shared packages (lib/db, etc.)
config.watchFolders = [workspaceRoot];

// Avoid watching heavy/unnecessary dirs that cause OOM
config.resolver.blockList = [
  // Block other artifacts (api-server, web) from being watched
  new RegExp(path.resolve(workspaceRoot, "artifacts/api-server").replace(/[\\]/g, "\\\\") + ".*"),
  new RegExp(path.resolve(workspaceRoot, "artifacts/web").replace(/[\\]/g, "\\\\") + ".*"),
  // Block .git
  /\.git\/.*/,
];

// Ensure we look for node_modules in both the mobile dir and workspace root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;
