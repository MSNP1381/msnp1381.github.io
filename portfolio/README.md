# MSNP — personal portfolio

Full-screen terminal portfolio for Muhammad Sadegh Nematpour, built with React, Vite, and modular SCSS. The opening viewport contains a minimal shell with a plain Linux-style `visitor@msnp:~$` prompt with a `help` hint. Scrolling reveals sticky navigation, an intro, a work and education timeline, and the project grid. The official React starter was generated with `npm create vite@latest -- --template react --no-interactive`; its React/Vite structure and plugin configuration were used for this app.

## Develop

Requires Node.js 22.12+ (or a supported newer release).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. `npm run build` produces `dist/`; `npm run preview` serves the production build.

## Structure

- `src/components/`: terminal, résumé dialog, intro, work and education timeline, projects, work status, writing, contact.
- `src/data/profile.js`: terminal profile, links, projects, command reference.
- `src/data/resume.js`: downloadable Markdown résumé.
- `src/styles/`: SCSS partials for base styles, layout, terminal, sections, and responsive rules.
- `tests/portfolio.spec.js`: browser checks for commands, keyboard navigation, downloads, dialogs, project details, and responsive overflow.

## Terminal

`help`, `whoami`, `resume`, `resume download`, `projects`, `stack`, `now`, `contact`, `github`, `blog`, `ls`, `cat resume.md`, `cat stack.json`, `cat contact.txt`, `cd projects`, `cd about`, `cd now`, `cd blog`, `pwd`, `date`, `echo`, `clear`.

`help` lists five primary commands; `help all` lists every supported command. Arrow keys browse history, Tab completes command names, and Ctrl+L clears output. Commands run entirely in the browser.

## Content

Project descriptions are grounded in the public [Kaggle Agent](https://github.com/MSNP1381/kaggle-Agent) and [Cache-cool](https://github.com/MSNP1381/cache-cool) READMEs. Articles link to the [existing blog](https://msnp1381.github.io/). The résumé is a concise portfolio summary, downloadable as Markdown. Verify your experience details before substituting a full CV. Current role and availability link to LinkedIn rather than making a potentially stale claim.

## Browser checks

```sh
npm run dev
npm test
```

Playwright uses locally installed Google Chrome. Alternatively install Chromium with `npx playwright install chromium` and remove the `channel` option in the Playwright configuration.

The supplied MSNP logo and its dark-background edit are documented in [brand assets](docs/brand-assets.md).

## GitHub Pages with the existing blog

See [the migration guide](deployment/github-pages/README.md) for keeping the current Jekyll code beside `portfolio/`, publishing React at `/`, and preserving the blog at `/blog/`. The ready workflow and migration scripts are included.
