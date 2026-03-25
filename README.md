[![Deploy to Production](https://github.com/madsnorgaard/fenixnordic.solutions/actions/workflows/deploy.yml/badge.svg)](https://github.com/madsnorgaard/fenixnordic.solutions/actions/workflows/deploy.yml)

# fenixnordic.solutions

Marketing site for Fenix Nordic Solutions. Bilingual EN/DA, dark Nordic editorial design.

**Stack**: Nuxt 3 (static generate) · nginx:alpine · Docker · Traefik TLS

---

## Local development

```bash
cd frontend/
npm install
npm run dev -- --port 3030
# → http://localhost:3030
```

To preview the production static build:

```bash
npm run generate
npx serve .output/public
```

---

## Project structure

```
frontend/
  app.vue                   Root layout (TheCursor + NuxtPage + grain overlay)
  pages/index.vue           Page composition (section order)
  components/
    TheNav.vue              Fixed nav, scroll opacity, lang toggle
    HeroSection.vue         Full-viewport hero, 3-line headline
    HowWeWorkSection.vue    Define / Build / Deliver process steps
    ServicesSection.vue     2×2 capability grid
    AboutSection.vue        Phoenix profile + stats column
    ContactSection.vue      mailto form + contact details
    TheFooter.vue           One-line footer
    TheCursor.vue           Custom ember cursor + click sparks
  composables/
    useLocale.ts            EN/DA state via useState, persists to localStorage
    useT.ts                 Returns typed i18n object for current locale
    useReveal.ts            IntersectionObserver scroll reveal
    useMagnetic.ts          Magnetic pull effect for CTA buttons
  i18n/
    en.ts                   All English strings
    da.ts                   All Danish strings
  assets/css/main.css       Design system: variables, reset, animations, buttons
  public/favicon.svg        Ember circle SVG
  Dockerfile                node:22-alpine build → nginx:alpine serve
  nginx.conf                SPA fallback, gzip, 1y cache for assets
```

---

## Content updates

All copy lives in `frontend/i18n/en.ts` and `frontend/i18n/da.ts`.

Keys: `hero`, `how` (process steps), `services`, `about`, `contact`, `footer`.

After editing: commit and push — the deploy pipeline handles the rest.

No em dashes anywhere in copy.

---

## Design system

| Variable | Value | Use |
|----------|-------|-----|
| `--bg` | `#0b0b10` | Page background |
| `--surface` | `#111119` | Card backgrounds |
| `--border` | `#1c1c2a` | All borders |
| `--text` | `#f2ece0` | Body text |
| `--text-muted` | `#7a7585` | Secondary text |
| `--accent` | `#c4622a` | Ember / CTA colour |
| `--font-display` | Cormorant Garamond | Headings |
| `--font-body` | DM Sans | Body, UI |

Fonts loaded via Google Fonts in `nuxt.config.ts`.

---

## Deploy pipeline

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`), which fires a
`repository_dispatch` event to `madsnorgaard/contabo-infrastructure`.

The infrastructure runner (self-hosted on VPS1):
1. Checks out this repo
2. Rsyncs `docker-compose.yml` + `frontend/` to VPS2 at `~/docker/fenixnordic.solutions/`
3. Runs `docker compose build nuxt` on VPS2
4. Runs `docker compose up -d --remove-orphans`

VPS2 does not need GitHub SSH access — all files are pushed from the runner.

**Why `npm install` not `npm ci`**: dependency tree has conflicting commander version
ranges across transitive deps; `npm ci` rejects the lockfile. `npm install` resolves it.

---

## Docker services

| Service | Container | Purpose |
|---------|-----------|---------|
| `nuxt` | `fenix_nuxt` | Static site via nginx, Traefik-routed to fenixnordic.solutions |
| `fenix_db` | `fenix_db` | MariaDB 11, internal only |
| `phpmyadmin` | `fenix_db_admin` | DB admin at phpmyadmin.fenixnordic.solutions |
| `fenix_redis` | `fenix_redis` | Redis, internal only |
| `fenix_solr` | `fenix_solr` | Solr 8.11, internal only (no host port — conflicts with madsnorgaard_solr) |

Database and Solr are retained for a future headless CMS integration.

---

## Maintenance

**Rebuild and restart the site container on VPS2:**
```bash
cd ~/docker/fenixnordic.solutions
docker compose build nuxt
docker compose up -d nuxt
```

**Check container status:**
```bash
docker compose ps
docker compose logs nuxt --tail 30
```

**Force full redeploy** via GitHub Actions → Deploy to Production → Run workflow → check "Force recreate containers".

---

## Known issues / gotchas

- `fenix_solr` must not expose port 8983 on the host — `madsnorgaard_solr` already owns it.
  The port binding is intentionally absent from `docker-compose.yml`.
- Old Drupal artefacts (`web/`, `composer.json`, `settings.php`, etc.) remain in the repo root
  — they are not used by the Nuxt site and can be cleaned up in a future housekeeping pass.
