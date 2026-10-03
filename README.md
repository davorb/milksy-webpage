# Milksy website

Static Astro + TypeScript website for https://milksy.app. Plain HTML and CSS; no browser JavaScript, tracking scripts, remote fonts, or UI frameworks.

## Run and deploy

Use Node.js 22.12+ (Node 24 LTS recommended).

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run dev
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run preview
```

Upload `dist/` to a static host. Configure the host to serve directory indexes and `404.html` for missing pages. Set the custom domain to `milksy.app`, enable HTTPS, and redirect alternate domains to it. No server runtime or secrets are required. The domain is already configured; an alternate origin can be built with `SITE_URL=https://example.com npm run build`. Root-path hosting is intentional. Subpath deployments need additional base-path work.

`npm run build` runs TypeScript/Astro diagnostics, generates the site, and verifies metadata, JSON-LD syntax, canonical URLs, sitemap, robots rules, internal links, App Store links, draft exclusion, and the absence of browser JavaScript. `npm run verify` repeats the generated-output checks.

## Pages

- `/`
- `/baby-feeding-tracker/`
- `/breastfeeding-tracker/`
- `/bottle-feeding-tracker/`
- `/diaper-tracker/`
- `/baby-tracker-for-couples/`
- `/about/`
- `/privacy/`
- `/blog/`
- `404.html`

Astro outputs trailing slashes. Normal static hosts resolve the requested non-trailing-slash URLs to the same directory pages.

## Articles

Add Markdown in `src/content/blog/`:

```yaml
---
title: "A useful feature announcement"
description: "A concise, unique summary."
publishedAt: 2026-10-03
draft: false
---
```

The filename becomes `/blog/filename/`. Nested filenames are supported. Draft and future-dated articles are excluded from HTML, RSS, and sitemap. Rebuild after publication dates arrive. The only included article is an unpublished format example; no filler is published. Articles are rendered statically and included automatically in `/rss.xml` and `/sitemap.xml`.

## Design and evidence

Tokens translated from `Milksy/Milksy/Design.swift`: feeding blue `#1f61d1`, nursing lilac `#8c4db8`, canvas `#f2f7ff`, 24px glass corners, native system typography. Website text uses dark ink and solid backgrounds where readability matters. No fake device shells or generated app UI.

Original app icon and English screenshots copied from the sibling Milksy repository. Source files remain in `src/assets/`; Astro generates responsive AVIF/WebP screenshots with PNG fallbacks at build time. Hero images are eager, other screenshots lazy. Icon/social exports can be regenerated with `node scripts/prepare-assets.mjs`. The social card contains the confirmed domain; update its text if changing domain.

Feature copy checked against `ContentView.swift`, `FeedLogger.swift`, `FamilyView.swift`, `SyncRegistry.swift`, `MilksyStore.swift`, and `AppStoreListing/en/description.txt`. The current registry includes diaper sharing, which supersedes older local-only implementation notes. Public sharing copy describes the implementation; this website work does not certify two-device Production sync.

App Store listing inspected 3 October 2026: iOS/iPadOS 26.5 minimum. The privacy page links the policy already published at https://appland.info/app/33309/privacy-policy rather than inventing legal terms. That policy has generic collection/retention clauses while the listing states Data Not Collected; the owner should reconcile the published policy with the app’s actual practices separately. No policy terms were changed.

Apple’s official badge is stored locally, unmodified, at `public/app-store-badge.svg`. Badge artwork source: https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1464739200. Guidelines: https://developer.apple.com/app-store/marketing/guidelines/.

Astro content collection reference: https://docs.astro.build/en/guides/content-collections/.

## Search discovery

Unique titles/descriptions, canonical URLs, Open Graph and X cards, a 1200×630 social image, favicon, Apple touch icon, Smart App Banner, visible FAQ answers, MobileApplication/SoftwareApplication and WebSite JSON-LD, plus FAQPage and BlogPosting where applicable. No invented prices, ratings, reviews or user numbers.

`robots.txt` allows regular search crawlers and explicitly allows OAI-SearchBot. GPTBot is blocked independently. Discovery and indexing remain search-engine decisions; structured data does not guarantee enhanced search results.

## Analytics

No analytics are enabled. App Store links have `data-cta="app-store"` for an optional future click measurement integration. Choose a provider and update the website privacy explanation if analytics are added. Hosting access logs can provide visits/referrers depending on host configuration.

## Validation on 3 October 2026

Production build: 0 diagnostics. Generated-output checks passed for 10 HTML pages, 9 sitemap URLs and 23 App Store links, with zero client JS. All 9 public routes checked at 320, 390, 768 and 1440px with JavaScript disabled: no overflow or broken eager images; native FAQ interaction works. Automated axe WCAG A/AA checks reported zero violations across those routes. Local mobile Lighthouse audits for the homepage and couples page scored 100 for performance, accessibility, best practices and SEO. These are local lab results, not guarantees of production hosting performance or a substitute for assistive-technology/device testing.

Local QA screenshots and reports are kept under ignored `qa/`. No website deployment was performed.

## GitHub Pages setup

The included `.github/workflows/pages.yml` builds and verifies the site with Node 24, uploads only `dist/`, and deploys pushes to `main`. It also supports manual runs. No repository secrets are needed.

1. Register `milksy.app` if you do not already own it.
2. Create an empty GitHub repository named `milksy-webpage`. Use Public for GitHub Free; private repository Pages requires an eligible paid plan. Do not initialize it with a README or gitignore.
3. From this folder, run `git init -b main`, `git add .`, and `git commit -m "Build Milksy website"`. Then add the new GitHub repository as `origin` using its URL, and push with `git push -u origin main`.
4. In repository Settings → Pages, choose GitHub Actions under Build and deployment → Source.
5. In the same Pages settings, set Custom domain to `milksy.app` and save it before changing DNS. Custom Actions workflows do not require a CNAME file in the repository.
6. In the DNS provider for `milksy.app`, add four A records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Replace conflicting web/parking records for `@`; retain email MX/TXT records. Optionally add a `www` CNAME pointing to `YOUR-USERNAME.github.io` (no repository name); GitHub redirects www to the configured apex domain.
7. In Actions, open Deploy Milksy to GitHub Pages and choose Run workflow for main if the initial run failed before Pages was enabled. Check both build and deploy finish successfully.
8. Once the Pages DNS check passes and the certificate is ready, enable Enforce HTTPS. DNS propagation and certificate availability may take up to 24 hours.
9. Check `https://milksy.app/`, a feature page, `/sitemap.xml`, and `/robots.txt`. The project is configured for the custom-domain root, so its styles and links are intended for `milksy.app`, not the temporary github.io repository subpath.

Future updates: commit changes and push to `main`; the workflow rebuilds and deploys automatically.

GitHub references: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages and https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site.
