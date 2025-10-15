/**
 * Scan project files and replace curly single quotes (U+2018 / U+2019)
 * with the HTML escape &apos; so ESLint react/no-unescaped-entities errors are avoided.
 *
 * Usage:
 * 1) Commit or stash your changes first: git add -A && git commit -m "WIP: backup"
 * 2) Preview changes: node ./scripts/fix-apostrophes.js --preview
 * 3) Apply changes:     node ./scripts/fix-apostrophes.js
 *
 * The script creates a .bak file next to each modified file (original content).
 */
const fs = require("fs").promises;
const path = require("path");

const ROOT = path.resolve(__dirname, ".."); // project root
const IGNORE_DIRS = new Set(["node_modules", ".git", ".next", "out", "dist", "public", "build"]);
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx", ".md", ".html"]);
const PREVIEW = process.argv.includes("--preview");

// characters to replace (curly single quotes)
const FIND_REGEX = /[\u2018\u2019]/g;
const REPLACE_WITH = "&apos;";

async function walk(dir) {
  let results = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of list) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (IGNORE_DIRS.has(ent.name)) continue;
      results = results.concat(await walk(full));
    } else if (ent.isFile()) {
      const ext = path.extname(ent.name).toLowerCase();
      if (EXTENSIONS.has(ext)) results.push(full);
    }
  }
  return results;
}

async function processFile(file) {
  const original = await fs.readFile(file, "utf8");
  if (!FIND_REGEX.test(original)) return null;
  const updated = original.replace(FIND_REGEX, REPLACE_WITH);
  // Count replacements
  const count = (original.match(FIND_REGEX) || []).length;
  return { file, original, updated, count };
}

(async () => {
  try {
    console.log(`Scanning project: ${ROOT}`);
    console.log(PREVIEW ? "Preview mode — no files will be modified\n" : "Apply mode — backups (.bak) will be created\n");

    const files = await walk(ROOT);
    let total = 0;
    const changed = [];
    for (const file of files) {
      const res = await processFile(file);
      if (res) {
        changed.push(res);
        total += res.count;
      }
    }

    if (changed.length === 0) {
      console.log("No curly apostrophes found. Nothing to do.");
      return;
    }

    for (const item of changed) {
      const rel = path.relative(ROOT, item.file);
      console.log(`Found ${item.count} occurrence(s) in: ${rel}`);
      if (!PREVIEW) {
        // backup original
        const bakPath = item.file + ".bak";
        await fs.writeFile(bakPath, item.original, "utf8");
        await fs.writeFile(item.file, item.updated, "utf8");
        console.log(`  → backup: ${path.relative(ROOT, bakPath)}  (original preserved)`);
        console.log(`  → updated file saved`);
      }
    }

    console.log(`\nSummary: ${changed.length} file(s) changed, ${total} replacement(s) ${PREVIEW ? "(preview)" : "(applied)"}.\n`);
    if (PREVIEW) {
      console.log("To apply changes run: node ./scripts/fix-apostrophes.js");
    } else {
      console.log("Review changes, run your tests, then commit.");
    }
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
})();