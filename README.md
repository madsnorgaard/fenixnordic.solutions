[![Build and deploy](https://github.com/madsnorgaard/fenixnordic.solutions/actions/workflows/ci.yml/badge.svg)](https://github.com/madsnorgaard/fenixnordic.solutions/actions/workflows/ci.yml)

# fenixnordic.solutions

Marketing site for Fenix Nordic Solutions. Bilingual, English at `/` and Danish at `/da`.

**Stack**: Nuxt 4 (static generate), Nuxt Content, Nuxt i18n, Nuxt SEO, nginx:alpine, Docker, Traefik TLS.

Project memory, decisions, guidelines and the goal backlog live in Jumbo (`jumbo session start`). `AGENTS.md` and `CLAUDE.md` are the pointer stubs Jumbo writes; do not add instructions to them.

## Local development

Node 24.11 or newer is required.

```bash
cd frontend/
npm install
npm run dev
```

Production build and a local preview of the static output:

```bash
npm run generate
npx serve .output/public
```

The real production path is nginx serving the generated files. Verify routing in the container before shipping:

```bash
docker build -t fenix-site frontend/
docker run --rm -p 8080:80 fenix-site
curl -I http://localhost:8080/aabenforms
```

## Quality gates

```bash
npm run lint        # eslint
npm run typecheck   # vue-tsc through nuxt
npm run check:copy  # no em dashes, EN and DA parity, message syntax
npm run generate    # prerender with the link checker
```

All four run in CI on every pull request and on main before the deploy is dispatched.

## Project structure

```
frontend/
  app/
    app.vue                    Layout wrapper
    layouts/default.vue        Skip link, header, main, footer, hreflang
    pages/index.vue            Front page
    pages/[slug].vue           Case studies from content/
    error.vue                  404 and other errors
    components/
      PhoenixMark.vue          The mark, solid or as strokes that draw in
      SiteHeader.vue           Brand, language switch, contact link
      SiteFooter.vue
      SiteSection.vue          A section with a sticky running head in the spine
      AppButton.vue            Primary and quiet buttons, link or button
      LocaleSwitch.vue
      SkipLink.vue
      home/                    Front page sections
      content/                 Components usable in markdown and in Vue
      OgImage/                 Social card templates
    composables/useCopy.ts     Typed access to a branch of the locale dictionary
    plugins/legacy-locale.client.ts   Sends visitors with the old stored language to /da
    utils/site.ts              Contact details and external addresses
    assets/css/                Layered stylesheet: reset, tokens, base, layout, components, utilities
  content/en/*.md              Case studies, English
  content/da/*.md              Case studies, Danish
  i18n/locales/en.ts           Front page and chrome copy, English
  i18n/locales/da.ts           Front page and chrome copy, Danish
  public/fonts/                Bricolage Grotesque, self-hosted
  public/media/                Screenshots (1x and 2x WebP) and flow recordings (WebM, MP4, poster)
  public/aabenforms-demo-*.html   Interactive demo widgets, standalone
  media-src/                   GIF masters for the flow recordings
  scripts/                     Media extraction, video conversion, copy check
  nuxt.config.ts
  content.config.ts
  Dockerfile                   node:24-alpine build, nginx:alpine serve
  nginx.conf
```

## Editing content

Front page copy: `i18n/locales/en.ts` and `i18n/locales/da.ts`. Both files must have the same keys. Contact details are in `app/utils/site.ts`.

Case studies: `content/en/<slug>.md` and `content/da/<slug>.md`. The frontmatter carries the title, kicker, lede, fact sentence, call to action and footnote. The body uses these components:

```md
::margin-note{term="Honest status"}
A qualification that hangs in the margin next to what follows.
::

::rows
:::row{term="Term"}
Definition.
:::
::

::status-list
:::status-item{state="done" label="Built"}
What is built.
:::
::

::case-figure{src="/media/x/y.webp" src2x="/media/x/y@2x.webp" width="960" height="667" alt="..."}
Caption.
::

::flow-video{name="aabenforms-skoleskift-en" width="1440" height="900" alt="..." demo="/aabenforms-demo-en.html"}
Caption.
::
```

Rules: no em dashes anywhere. No `@`, `|`, `{` or `}` inside locale messages. Every string exists in both languages.

## Media

New screenshots: place a WebP at 1x (960 wide) and 2x under `public/media/<product>/`. The extraction script that produced the current set from the old static pages is `scripts/extract-case-media.mjs`.

New flow recordings: drop a GIF in `media-src/` and run `npm run media:flows`. It writes WebM, MP4 and a poster to `public/media/flows/`.

## Design system

Tokens live in `app/assets/css/tokens.css`. Two colour poles on a warm black: ember (hot) and ash (cold). One typeface, Bricolage Grotesque, with weight, width and optical size axes. The only animation is the phoenix mark drawing in and igniting on scroll on the front page; everything honours `prefers-reduced-motion`.

## Deploy pipeline

Push to `main` triggers `.github/workflows/ci.yml`: lint, typecheck, copy check, generate, output assertions and a container smoke test. When that passes on main, it dispatches a `deploy` event to `madsnorgaard/contabo-infrastructure`, whose self-hosted runner rsyncs `docker-compose.yml` and `frontend/` to VPS2 and runs `docker compose build nuxt` and `docker compose up -d --remove-orphans`.

Rollback: the state before the 2026 redesign is tagged `pre-redesign`. Revert main to it and push; nothing on the VPS holds state.

## Docker services

| Service | Container | Purpose |
|---------|-----------|---------|
| `nuxt` | `fenix_nuxt` | Static site via nginx, Traefik-routed to fenixnordic.solutions |
| `mailer` | `fenix_mailer` | PHP relay for the contact form at `/api/contact` |
| `fenix_db` | `fenix_db` | MariaDB 11, internal only |
| `phpmyadmin` | `fenix_db_admin` | DB admin at phpmyadmin.fenixnordic.solutions |
| `fenix_redis` | `fenix_redis` | Redis, internal only |
| `fenix_solr` | `fenix_solr` | Solr 8.11, internal only |

Security headers, including the CSP, are set by Traefik in `docker-compose.yml`. Do not add them in nginx or in `nuxt.config.ts`.

## Known issues

- `fenix_solr` must not expose port 8983 on the host; `madsnorgaard_solr` owns it.
- Old Drupal artefacts (`web/`, `composer.json`, `settings.php`) remain in the repo root and are unused by the site.
