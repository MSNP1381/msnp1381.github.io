# Portfolio at `/`, existing Chirpy blog at `/blog/`

Prepared for `MSNP1381/msnp1381.github.io`, whose default branch is `master`.

Keep the existing Jekyll files at the repository root. Add this React application in a sibling `portfolio/` folder. There is no need to move or rewrite the posts, theme, or their Git history.

```text
msnp1381.github.io/
├── _config.yml                    # existing blog configuration
├── _posts/                        # existing articles
├── _layouts/, _includes/, assets/  # existing Chirpy theme
├── Gemfile, package.json          # existing blog tooling
├── portfolio/                     # this Vite/React application
│   ├── src/, public/, package.json
│   └── deployment/github-pages/
└── .github/workflows/pages-deploy.yml  # replace with the supplied workflow
```

## Install beside the existing code

Run these commands from `/Users/wallex/projects/nemat-site`:

```sh
git clone https://github.com/MSNP1381/msnp1381.github.io.git github-pages
git -C github-pages switch -c feat/portfolio-and-blog
rsync -a \
  --exclude='.git/' --exclude='.openai/' \
  --exclude='node_modules/' --exclude='dist/' \
  --exclude='test-results/' --exclude='playwright-report/' \
  --exclude='.playwright/' --exclude='preview*.png' \
  portfolio/ github-pages/portfolio/
cp github-pages/portfolio/deployment/github-pages/pages-deploy.yml \
  github-pages/.github/workflows/pages-deploy.yml
```

Replace the existing Pages workflow; do not add a second independent deployment workflow. The supplied workflow runs on `master` or manual dispatch, matching the inspected repository. Review the combined build before publishing to the default branch.

In GitHub, open **Settings → Pages → Build and deployment → Source → GitHub Actions**. Review and merge the migration branch into `master` when ready. Pushing or merging to `master` publishes the new home page and relocates the blog.

## What the build does

1. `configure-blog.mjs` sets `baseurl: "/blog"` in the CI checkout and adds `portfolio` and `_site` to the existing Jekyll exclusions. The committed blog source remains where it is.
2. Installs the existing root Node dependencies and rebuilds Chirpy's JavaScript. This step matters: the theme imports `baseurl` into its PWA code at bundle time. A Jekyll CLI override by itself would leave its old precompiled service-worker URLs pointing at `/`.
3. Builds Jekyll into `_site/blog/` using Ruby 3.3 and the existing Gemfile.
4. Builds React with `VITE_BLOG_BASE_URL=/blog/`, then copies its output into `_site/`. Vite's default base `/` is correct for this user-site home page.
5. Generates static redirect pages for the blog's former HTML URLs, excluding the home page and 404. For example `/posts/Evolution-Prompt/` redirects to `/blog/posts/Evolution-Prompt/`. Query strings and fragments are preserved when JavaScript is enabled; the fallback uses meta refresh and a normal link. These are static redirects, not HTTP 301 responses.
6. Replaces the former root `sw.min.js` with a retiring worker, leaving the rebuilt `/blog/sw.min.js` worker scoped to the blog. It does not delete other origin caches or unregister unrelated workers.
7. Uploads one `_site/` artifact and deploys it to GitHub Pages.

The published files look like:

```text
_site/
├── index.html        # React portfolio
├── assets/           # React assets and logo
├── blog/
│   ├── index.html    # original blog home
│   ├── posts/
│   ├── assets/
│   └── sw.min.js
├── posts/...         # legacy redirect pages
└── sw.min.js         # retires the old root-scoped worker
```

## Updating afterward

- Website: edit `portfolio/src/` or `portfolio/public/`.
- Blog: continue writing Markdown in the existing root `_posts/` folder.
- Push changes to `master`: one workflow rebuilds and publishes both.
- Preview the portfolio: `cd portfolio && npm ci && npm run dev`.
- During development, the Blog links still use the currently live blog. The combined Pages build changes all of them, including terminal and article links, to `/blog/`.

## Validation and limits

The React build and the migration scripts can be checked locally. Full validation still requires running the actual Chirpy/Jekyll build and the first Pages workflow; this machine's system Ruby 2.6 cannot build the existing Ruby 3.1+ theme. After publishing, check `/`, `/blog/`, a post, tags/search, and an old post redirect, including a previously cached browser session.

The root theme currently has no committed npm or Ruby lockfile, so its existing dependencies are resolved at build time. The React application uses its committed `package-lock.json` and `npm ci`.

Sources: [existing Pages workflow](https://github.com/MSNP1381/msnp1381.github.io/blob/master/.github/workflows/pages-deploy.yml), [existing blog configuration](https://github.com/MSNP1381/msnp1381.github.io/blob/master/_config.yml), [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Vite GitHub Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages).
