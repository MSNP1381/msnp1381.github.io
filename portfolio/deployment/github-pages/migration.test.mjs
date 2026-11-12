import test from "node:test";
import assert from "node:assert/strict";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
const scripts = resolve("deployment/github-pages");
function fixture(fn) {
  const root = mkdtempSync(join(tmpdir(), "msnp-pages-"));
  try {
    fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
function run(script, cwd) {
  return spawnSync(process.execPath, [join(scripts, script)], {
    cwd,
    encoding: "utf8",
  });
}
test("subpath configuration preserves existing settings and is repeatable", () =>
  fixture((root) => {
    writeFileSync(
      join(root, "_config.yml"),
      'title: My blog\nbaseurl: ""\npwa:\n  enabled: true\nexclude:\n  - docs\n  - tools\n',
    );
    assert.equal(run("configure-blog.mjs", root).status, 0);
    assert.equal(run("configure-blog.mjs", root).status, 0);
    const config = readFileSync(join(root, "_config.yml"), "utf8");
    assert.match(config, /^baseurl: "\/blog"$/m);
    assert.match(config, /pwa:\n  enabled: true/);
    assert.match(config, /  - docs\n  - tools/);
    assert.equal(config.match(/  - portfolio/g).length, 1);
    assert.equal(config.match(/  - _site/g).length, 1);
  }));
test("real portfolio build and blog coexist; legacy posts redirect and blog worker is preserved", () =>
  fixture((root) => {
    const blog = join(root, "_site/blog");
    mkdirSync(join(blog, "posts/hello"), { recursive: true });
    mkdirSync(join(blog, "assets"), { recursive: true });
    writeFileSync(join(blog, "index.html"), "<h1>Original blog</h1>");
    writeFileSync(
      join(blog, "posts/hello/index.html"),
      "<h1>Original post</h1>",
    );
    writeFileSync(join(blog, "sw.min.js"), "// blog worker");
    writeFileSync(join(blog, "assets/style.css"), "body{color:black}");
    mkdirSync(join(root, "portfolio"), { recursive: true });
    cpSync(resolve("dist"), join(root, "portfolio/dist"), { recursive: true });
    const result = run("assemble.mjs", root);
    assert.equal(result.status, 0, result.stderr);
    assert.match(
      readFileSync(join(root, "_site/index.html"), "utf8"),
      /id="root"/,
    );
    assert.equal(
      readFileSync(join(blog, "posts/hello/index.html"), "utf8"),
      "<h1>Original post</h1>",
    );
    assert.equal(
      readFileSync(join(blog, "sw.min.js"), "utf8"),
      "// blog worker",
    );
    const redirect = readFileSync(
      join(root, "_site/posts/hello/index.html"),
      "utf8",
    );
    assert.match(redirect, /url=\/blog\/posts\/hello\//);
    assert.match(redirect, /location.search\+location.hash/);
    assert.match(
      readFileSync(join(root, "_site/sw.min.js"), "utf8"),
      /registration.unregister/,
    );
    assert.ok(existsSync(join(root, "_site/assets/msnp-dark.png")));
    assert.ok(existsSync(join(root, "_site/.nojekyll")));
  }));
test("assembly refuses to publish if the old blog has not been built", () =>
  fixture((root) => {
    const result = run("assemble.mjs", root);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Build the Jekyll blog first/);
    assert.ok(!existsSync(join(root, "_site/index.html")));
  }));
