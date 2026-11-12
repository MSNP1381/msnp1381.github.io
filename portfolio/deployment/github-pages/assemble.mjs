import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

// Run from the existing Jekyll repository root, after building both applications.
const output = resolve("_site");
const blog = join(output, "blog");
const portfolio = resolve("portfolio/dist");
if (!existsSync(join(blog, "index.html")))
  throw new Error("Build the Jekyll blog first.");
if (!existsSync(join(portfolio, "index.html")))
  throw new Error("Build the portfolio first.");
if (existsSync(join(portfolio, "blog")))
  throw new Error("The portfolio must not own /blog/.");
cpSync(portfolio, output, { recursive: true });

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
let redirects = 0;
function redirectOldPages(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) {
      redirectOldPages(file);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const oldPath = relative(blog, file);
    // The portfolio owns the home page; the blog keeps its own 404 under /blog/.
    if (oldPath === "index.html" || oldPath === "404.html") continue;
    const destination = join(output, oldPath);
    if (existsSync(destination))
      throw new Error(`Portfolio/legacy URL collision: ${oldPath}`);
    let target =
      "/blog/" + oldPath.split(sep).map(encodeURIComponent).join("/");
    if (target.endsWith("/index.html")) target = target.slice(0, -10);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(
      destination,
      `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page moved</title><link rel="canonical" href="${escapeHtml(target)}"><meta http-equiv="refresh" content="0;url=${escapeHtml(target)}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></head><body><a href="${escapeHtml(target)}">Continue to the blog</a></body></html>`,
    );
    redirects++;
  }
}
redirectOldPages(blog);

// Replace the former root-scoped Chirpy worker. /blog/sw.min.js remains independent.
writeFileSync(
  join(output, "sw.min.js"),
  `self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',event=>event.waitUntil((async()=>{await self.clients.claim();await self.registration.unregister();})()));`,
);
writeFileSync(join(output, ".nojekyll"), "");
// Preserve an existing custom-domain file if the repository ever has one.
if (existsSync(resolve("CNAME")))
  cpSync(resolve("CNAME"), join(output, "CNAME"));
const home = readFileSync(join(output, "index.html"), "utf8");
if (!home.includes('id="root"'))
  throw new Error("Root index must be the React portfolio.");
console.log(
  `Assembled / portfolio + /blog/ Jekyll site, with ${redirects} legacy page redirects.`,
);
