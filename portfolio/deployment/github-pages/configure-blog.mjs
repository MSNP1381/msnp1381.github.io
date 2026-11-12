import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Run from the existing Jekyll repository root, before building Chirpy's JS.
const configPath = resolve("_config.yml");
let config = readFileSync(configPath, "utf8");
if (!/^baseurl:.*$/m.test(config))
  throw new Error("Expected the existing Chirpy baseurl setting.");
if (!/^exclude:\s*$/m.test(config))
  throw new Error("Expected the existing Chirpy exclude list.");
config = config.replace(/^baseurl:.*$/m, 'baseurl: "/blog"');
// Preserve the existing exclusions; Jekyll must not publish the React sources or build output.
const additions = ["portfolio", "_site"].filter(
  (name) => !new RegExp(`^  - ${name}\\s*$`, "m").test(config),
);
if (additions.length)
  config = config.replace(
    /^exclude:\s*$/m,
    "exclude:\n" + additions.map((name) => `  - ${name}`).join("\n"),
  );
writeFileSync(configPath, config);
console.log("Configured Jekyll and compiled theme assets for /blog/.");
