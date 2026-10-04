# Milksy website

Static Astro + TypeScript website for https://milksy.app. Static HTML and CSS with consent-based PostHog website analytics. No remote fonts or UI frameworks.

## Run and deploy

Use Node.js 22.12+ (Node 24 LTS recommended).

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run dev
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run preview
```

Upload `dist/` to a static host. Configure the host to serve directory indexes and `404.html` for missing pages. Set the custom domain to `milksy.app`, enable HTTPS, and redirect alternate domains to it. No server runtime or secrets are required. The domain is already configured; an alternate origin can be built with `SITE_URL=https://example.com npm run build`. Root-path hosting is intentional. Subpath deployments need additional base-path work.

`npm run build` runs TypeScript/Astro diagnostics, generates the site, and verifies metadata, JSON-LD syntax, canonical URLs, sitemap, robots rules, internal links, App Store links, draft exclusion, and the presence of the analytics entry script and consent controls. `npm run verify` repeats the generated-output checks.

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

## Localized homepages

The homepage supports the same 12 languages as the current Milksy app: English, Swedish, German, Spanish, French, Italian, Dutch, Japanese, Brazilian Portuguese, Bosnian, Croatian, and Serbian in Latin script. English remains at `/`. Other homepages use `/sv/`, `/de/`, `/es/`, `/fr/`, `/it/`, `/nl/`, `/ja/`, `/pt-BR/`, `/bs/`, `/hr/`, and `/sr-Latn/`.

`src/components/HomePage.astro` renders every homepage from complete, typed JSON dictionaries in `src/data/locales/`. `src/data/localization.ts` defines the supported locales, native language names, home URLs, Open Graph locale identifiers, badge paths and FAQ mapping. The shared layout localizes navigation, footer, accessible labels and analytics consent controls. Each homepage has translated titles, descriptions, image descriptions, FAQs and structured data. Translation text was checked for consistency with the existing feature claims; independent native-speaker review has not been performed. The homepage screenshots use the matching generated iOS captures for Swedish, German, Spanish, French, Italian, Dutch, Japanese, Brazilian Portuguese and Croatian. Per the owner’s preference, Bosnian and Serbian Latin use the Croatian captures. The shared social-card artwork remains English.

Feature pages, comparisons, articles, About and Privacy remain English. Links to these pages on translated homepages include a translated “in English” note. The language switcher appears throughout the site and links to each language’s homepage; it does not imply that the current feature or comparison page has a translation. It uses a native HTML disclosure and ordinary links, with no JavaScript or automatic redirects.

Every homepage has its own canonical URL and the complete reciprocal `hreflang` set, including itself and an English `x-default`. The sitemap lists all localized homepages and includes the same alternate-language relationships. Untranslated pages have no alternate-page declarations. Original English routes and the GitHub Pages deployment path are preserved.

Apple’s unmodified localized App Store badges are stored in `public/badges/`. Their source is `https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/LOCALE?releaseDate=1464739200`, using `sv-se`, `de-de`, `es-es`, `fr-fr`, `it-it`, `nl-nl`, `ja-jp`, `pt-br` and `hr-hr`. Apple does not list Bosnian or Serbian Latin badge artwork, so these pages retain the official English graphic with translated alternative text and accessible link labels. Do not edit Apple’s artwork to translate it. Source and usage rules: https://developer.apple.com/app-store/marketing/guidelines/.

To update copy, edit the corresponding JSON dictionary. Keep all keys present, including consent text, accessible labels and FAQ answers. English homepage line breaks are represented by `\n` in heading strings. To add a language, add a complete dictionary, import it into the typed registry, add its native name and Open Graph locale identifier, and provide an official badge or document its fallback. Routing, alternate links and sitemap entries derive from the registry. Before expanding supported languages, compare the registry with the app’s current string catalog and Xcode `knownRegions`.

The production build verifier checks translation completeness, document languages, canonical URLs, reciprocal homepage alternates, sitemap relationships, badges, screenshot language selection, localized FAQ schema, existing internal links and metadata. Browser validation on 3 October 2026 covered all 12 homepages at 320, 390, 768 and 1440px: no horizontal overflow or broken eager images; switching languages and opening FAQs worked with JavaScript disabled. Keyboard switching, localized consent controls, and consent persistence between languages also passed. Screenshots and the report are under ignored `qa/localized-*` and `qa/localization-browser-checks.json`. These are local checks, not confirmation of deployment or search indexing.

## Analytics

PostHog JavaScript SDK uses EU Cloud project 292911 and its public write-only project token from `src/scripts/analytics.ts`. No secret or deployment environment variable is needed. The shared layout includes consent controls on every page; the SDK is dynamically loaded only after acceptance in production builds. Development mode does not send analytics. Local production previews can send analytics if accepted.

Events: Standard PostHog page views, page engagement and automatic interaction capture, plus `app_store_clicked` for links with `data-cta="app-store"` (page path and link label). Uses PostHog’s recommended `2026-05-30` defaults. Session recording and surveys are disabled for this marketing site. No identify calls are made. PostHog uses local storage; a separate `milksy-analytics-consent` preference remembers Accept/Decline. Footer Analytics settings allows withdrawing consent and clears PostHog persistence. Without JavaScript the website works and analytics remain disabled. The website section of `/privacy/` explains this integration; the application's published policy is unchanged.

After deploying, accept analytics and check PostHog Live events for a page view and an App Store click. Events from users who decline or block analytics will not appear. SDK/configuration reference: https://posthog.com/docs/libraries/js.

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

## Comparison pages

- `/compare/`
- `/compare/milksy-vs-nara-baby/`
- `/compare/milksy-vs-huckleberry/`
- `/compare/milksy-vs-baby-tracker/`

The comparison hub and individual pages are static Astro output. `src/data/comparisons.ts` contains the app identifiers, common criteria, official source links, review date and individually written narratives. `ComparisonTable.astro` shares factual criteria, while each comparison has its own summary, sections, parent scenarios and FAQ. The same semantic table becomes labeled criterion cards below 680px; no client JavaScript is required for comparisons or FAQ interactions. Real Milksy screenshots use the existing responsive AVIF/WebP pipeline. Competitor visuals are linked to their official store screenshots rather than reproduced or invented.

To add a competitor, extend `AppId`, `appNames`, `allApps`, the criteria values, `sources` and `comparisons`. The detail route, hub links and sitemap derive from these records. Add any new App Store URL to the narrow allowlist in `scripts/verify.mjs`. Recheck all existing prices and relevant source facts, then update `reviewedOn` and `reviewedLabel`. Do not update the review date merely because a build ran. Narrative sections should address that app's actual trade-offs rather than replace names in another comparison.

Each comparison has unique title/description, canonical and social metadata, a visible reviewed date, FAQPage and BreadcrumbList JSON-LD. The hub uses CollectionPage with an ItemList of comparison links; details use WebPage with source citations and software subjects. No ratings, review scores, prices in structured offers, or rich-result eligibility promises are added.

### Research notes — 3 October 2026

Official references are linked visibly on each page and centrally in `src/data/comparisons.ts`. The comparisons disclose that Milksy publishes them. Logging ease and complexity are editorial assessments; no measured speed or reliability comparison is claimed. Milksy's implementation and listing copy were checked locally for tracking, sharing, storage, ads and feature scope.

- Nara's US iOS listing shows monthly $9.99 and lifetime $69.99 purchases. Its Android description still says free and ad-free. This discrepancy is disclosed. **Manual check:** exact current paywall, trial, lifetime eligibility, any retained free access, and current advertising experience. No effective subscription-change date is claimed.
- Huckleberry's official pricing page shows a free tracker and annual-billing equivalents of $5.74/month for Plus and $9.99/month for Premium. Annual equivalents are labeled explicitly. It documents same-account caregiver sharing. **Manual check:** local checkout totals, monthly billing offers, and ads; no confirmed ad-free claim is made.
- Baby Tracker means Nighp's app, US iOS ID 779656557. Its current listing describes free core tracking, advertising, Remove Ads $4.99, Plus monthly $5.99 and yearly $49.99, with optional What’s Next cues and existing purchases remaining valid. **Manual check:** exact current account/sync setup, Android entitlements and purchase unlocks. The older public FAQ is not used as current sync instructions.
- Regional pricing and feature parity should be checked on the actual caregiver devices. Store listings confirm availability, not that every feature or purchase behaves identically across platforms.
- Milksy's live store price could not be independently confirmed, so the table links users to the current listing rather than inventing a price. No competitor import is promised.

Run `npm run build` to check all HTML, unique metadata, internal links, JSON-LD and sitemap coverage. Browser QA results and mobile/desktop screenshots are saved under `qa/compare-*` and `qa/comparison-browser-checks.json`. Local browser timing is diagnostic only; it is not field Core Web Vitals evidence.

### Refresh app screenshots

Run `npm run sync:screenshots` to refresh the website from the sibling iOS project's `AppStoreScreenshots/source/`. It copies six English captures (`today`, `timeline`, `trends`, `breast`, `bottle`, `diapers`) from `source/iphone/` into `src/assets/`, and three homepage captures (`today`, `timeline`, `trends`) per available language from `source/LOCALE/iphone/` into `src/assets/screenshots/LOCALE/`. It validates every available set before writing, copies PNGs unchanged, and skips identical files. Missing localized directories retain existing assets; missing English captures or incomplete available sets stop the import. App Store campaign compositions are not used.

```sh
npm run sync:screenshots -- --dry-run
npm run sync:screenshots
npm run build
```

For another checkout, use `npm run sync:screenshots -- /absolute/path/to/AppStoreScreenshots/source` (optionally with `--dry-run`). Default paths are resolved relative to the script, so direct invocation also works from another directory. `npm run import:screenshots` remains a compatible alias. Sync is an explicit refresh, not a background watcher or part of the production build, which does not require the Xcode checkout.

To regenerate captures first, run `MILKSY_LOCALES="en sv de es fr it nl ja pt-BR hr" bash AppStoreScreenshots/scripts/generate.sh` from the Milksy project root, then run the website sync command. Generation requires Xcode, the configured simulators and the screenshot pipeline's Python dependencies; see the iOS project's `AppStoreScreenshots/USAGE.md`.

`AppScreenshot.astro` selects these assets using the homepage locale and produces responsive AVIF/WebP images with PNG fallbacks through Astro's image pipeline. Missing mapped captures fail the build. The screenshot language map is `screenshotLocales` in `src/data/localization.ts`; Bosnian and Serbian Latin intentionally map to Croatian. If dedicated captures become available, update that mapping and their captions along with importing the images.
