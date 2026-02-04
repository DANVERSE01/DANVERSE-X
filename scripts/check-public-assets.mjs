import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const SEARCH_DIRS = ["app", "components", "styles"];
const ASSET_REGEX = /\/[^\s"'()<>]+?\.(?:png|jpe?g|svg|webp|gif|mp4|webm|ico)\b/gi;

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function fileExists(filePath) {
  try {
    const fileStat = await stat(filePath);
    return fileStat.isFile();
  } catch {
    return false;
  }
}

async function main() {
  const missing = new Map();

  for (const dir of SEARCH_DIRS) {
    const fullDir = path.join(ROOT, dir);
    const exists = await fileExists(fullDir);
    if (!exists) continue;

    const files = await listFiles(fullDir);
    for (const file of files) {
      const content = await readFile(file, "utf8");
      const matches = content.matchAll(ASSET_REGEX);
      for (const match of matches) {
        const assetPath = match[0];
        if (assetPath.startsWith("//") || assetPath.startsWith("/_next/")) {
          continue;
        }
        const assetFile = path.join(PUBLIC_DIR, assetPath.replace(/^\/+/, ""));
        if (!(await fileExists(assetFile))) {
          const relFile = path.relative(ROOT, file);
          const list = missing.get(assetPath) ?? new Set();
          list.add(relFile);
          missing.set(assetPath, list);
        }
      }
    }
  }

  if (missing.size > 0) {
    console.error("Missing public assets referenced in code:");
    for (const [asset, files] of missing.entries()) {
      console.error(`- ${asset} (referenced in ${Array.from(files).join(", ")})`);
    }
    process.exit(1);
  }

  console.log("Public asset references look good.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
