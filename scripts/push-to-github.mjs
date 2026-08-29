// Uploads the project to GitHub without local git, via the GitHub Git Data API.
// Usage:
//   1. Create a token at https://github.com/settings/tokens (classic, scope: repo)
//   2. $env:GITHUB_TOKEN="ghp_xxx"
//   3. node scripts/push-to-github.mjs [repo-name]
import fs from "fs";
import path from "path";

const TOKEN = process.env.GITHUB_TOKEN;
if (!TOKEN) {
  console.error("Set GITHUB_TOKEN first. Create one at https://github.com/settings/tokens (scope: repo)");
  process.exit(1);
}
const REPO_NAME = process.argv[2] ?? "david-talia-realestate";
const API = "https://api.github.com";
const IGNORE = new Set(["node_modules", ".next", ".env", ".env.local", ".vercel", ".git"]);

async function gh(method, url, body) {
  const res = await fetch(`${API}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "david-talia-realestate-pusher",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok && res.status !== 422) {
    throw new Error(`${method} ${url} -> ${res.status}: ${JSON.stringify(data)}`);
  }
  return { status: res.status, data };
}

function walk(dir, base = "") {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.has(entry.name)) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full, rel));
    else files.push({ rel, full });
  }
  return files;
}

// 1. Who am I
const me = await gh("GET", "/user");
const owner = me.data.login;
console.log("Authenticated as:", owner);

// 2. Create repo (422 = already exists, that's fine)
const created = await gh("POST", "/user/repos", {
  name: REPO_NAME,
  private: false,
  description: "אתר תדמית - David&talia Real Estate",
});
console.log(created.status === 422 ? "Repo already exists" : "Repo created");

// 3. Make sure the repo has an initial commit (blob/tree API 409s on a truly empty repo)
const existingRef = await gh("GET", `/repos/${owner}/${REPO_NAME}/git/ref/heads/main`).catch(() => null);
if (!existingRef || existingRef.status !== 200) {
  await gh("PUT", `/repos/${owner}/${REPO_NAME}/contents/README.md`, {
    message: "Initial commit",
    content: Buffer.from(`# ${REPO_NAME}\n`).toString("base64"),
  });
  console.log("Initialized empty repo with README.md");
}

// 4. Upload files as blobs
const root = path.resolve(import.meta.dirname, "..");
const files = walk(root);
console.log(`Uploading ${files.length} files...`);
const treeItems = [];
for (const f of files) {
  const content = fs.readFileSync(f.full);
  const blob = await gh("POST", `/repos/${owner}/${REPO_NAME}/git/blobs`, {
    content: content.toString("base64"),
    encoding: "base64",
  });
  treeItems.push({ path: f.rel, mode: "100644", type: "blob", sha: blob.data.sha });
  console.log("  +", f.rel);
}

// 5. Create tree + commit
const tree = await gh("POST", `/repos/${owner}/${REPO_NAME}/git/trees`, { tree: treeItems });
let parents = [];
const ref = await gh("GET", `/repos/${owner}/${REPO_NAME}/git/ref/heads/main`).catch(() => null);
if (ref && ref.status === 200) parents = [ref.data.object.sha];
const commit = await gh("POST", `/repos/${owner}/${REPO_NAME}/git/commits`, {
  message: "David&talia Real Estate: website",
  tree: tree.data.sha,
  parents,
});

// 6. Point main at the commit
if (parents.length) {
  await gh("PATCH", `/repos/${owner}/${REPO_NAME}/git/refs/heads/main`, {
    sha: commit.data.sha,
    force: true,
  });
} else {
  await gh("POST", `/repos/${owner}/${REPO_NAME}/git/refs`, {
    ref: "refs/heads/main",
    sha: commit.data.sha,
  });
}

console.log(`\n✅ Done! https://github.com/${owner}/${REPO_NAME}`);
