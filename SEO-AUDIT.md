# Milksy search audit — 4 October 2026

## Outcome

No general crawl blocker was found on the live site. All 24 sitemap URLs returned HTTP 200, self-referencing canonical URLs, descriptions, one H1 and no noindex directives or X-Robots-Tag restrictions. This does not establish whether Google has indexed them: Search Console access is needed for that diagnosis.

The changes passed local validation before commit. Deployment and Search Console indexing must be verified separately after publication. Existing screenshot/import edits were preserved.

## Checklist

| Request | Verified result / work completed |
| --- | --- |
| Server rendering | Astro renders full HTML at build time. The static host sends content without waiting for JavaScript. No server migration is needed. |
| Sitemap | Existing `/sitemap.xml` lists all 24 public URLs, with alternate languages. Excludes the 404 page and draft articles. |
| Search Console | Submission pending Google sign-in and ownership access. The browser reached the Google sign-in screen. |
| Googlebot | Live `/robots.txt` allows general crawlers and references the sitemap. GPTBot's separate rule does not block Googlebot. |
| Noindex | None on live public pages. Removed the local error-page noindex directive as requested. Real missing URLs must still return HTTP 404; the error page remains outside the sitemap. |
| Redirect chains | All sitemap URLs respond directly. HTTP apex, HTTP www and HTTPS www each reach HTTPS apex in one redirect. |
| 404s | No missing sitemap pages or broken local internal links found. An unknown live URL returns HTTP 404. Search Console may reveal historical broken URLs; those need redirects only when a real replacement exists. |
| Canonicals / descriptions / H1 | Already present. Unique local metadata and one H1 per generated page pass the build verifier. |
| FAQ schema | Already present where visible FAQs exist. Schema does not guarantee a special Google appearance. |
| Breadcrumbs | Added one shared visible breadcrumb navigation and BreadcrumbList schema on every public inner page. Existing comparison breadcrumbs were consolidated. |
| Orphan pages | Every local public HTML route is reachable from the homepage through links. Added a build check for reachability. |
| Image alternatives | Every generated image has alt text; decorative brand icons use empty alternatives. Build also requires image width and height to reserve space. |
| Layout shifts | Live homepage mobile Lighthouse CLS was 0. Reserved image dimensions and system fonts already prevent common shifts. Responsive checks found no horizontal overflow or broken eager images. |
| Under 2 seconds | Live homepage mobile Lighthouse FCP and LCP were 1.0 s, Speed Index 2.6 s and total blocking time 0 ms. Performance score 100. This is a lab sample, not a guarantee for every page/device/network or full-load metric. |
| Copy | Replaced several vague English homepage slogans with concrete app behavior; simplified About, blog and 404 headings. Other languages retain existing translations. |
| Author | Added Davor's factual developer bio, personal-site link and Person schema. Comparison bylines link to that bio; future articles include author schema and a visible byline. No medical expertise or personal parenting history was invented. |
| Backlinks | No new backlinks obtained. A review pitch and a verified editorial contact route are prepared below. Publication remains an editor's decision. |

## Evidence

- `npm run build`: 0 Astro diagnostics; 25 HTML pages including the error page; 24 sitemap URLs.
- `scripts/verify.mjs`: metadata, schemas, internal links, draft exclusion, language alternates, noindex, image alternatives/dimensions and homepage reachability.
- `qa/seo-live-audit.json`: direct live HTTP and metadata checks for all sitemap URLs.
- `qa/seo-lighthouse-live.json`: mobile Lighthouse audit of the deployed homepage before these local changes.
- Browser QA: homepage, About, feeding, blog hub, comparison hub and Nara comparison at 320, 390, 768 and 1440 pixels; 24 checks with no horizontal overflow or broken eager images.
- The live site's robots response had a 3 October 2026 Last-Modified header. This alone does not prove the site's original launch date.

## Search Console handoff

1. Sign in at https://search.google.com/search-console with the Google account that owns the property.
2. Select the `milksy.app` domain property or `https://milksy.app/` URL-prefix property. If missing, verify ownership using the exact DNS TXT record or HTML verification token Google provides. No verification token has been invented or added.
3. Open Sitemaps and submit `https://milksy.app/sitemap.xml` (or `sitemap.xml` when the property prefix is already shown). Confirm successful processing.
4. Inspect `https://milksy.app/` and a feature URL. Record Google's selected canonical, crawl status and indexing exclusion reason. Run Test live URL and request indexing if eligible.
5. Check Page indexing for historical missing/redirected URLs and Core Web Vitals for field performance. A submitted sitemap or indexing request is not confirmation of indexing.

Official instructions: https://support.google.com/webmasters/answer/7451001

## Editorial outreach draft

Candidate: MacStories covers Apple apps and publishes editorial contact addresses on https://www.macstories.net/about/. Check the current editorial contact before sending. This is a relevant prospect, not an endorsement or promise of coverage. No outreach has been sent.

Subject: Milksy — an iPhone baby log with iCloud family sharing

Hello MacStories team,

I’m Davor, a software developer in Sweden and the maker of Milksy. It records bottle feeds, breastfeeding and diaper changes in a chronological timeline, with iCloud invitations so two parents can contribute to the same log. It also includes sleep, pumping and medication or vitamin entries.

If it fits your app coverage, you can see the interface and details at https://milksy.app/ and the App Store listing at https://apps.apple.com/us/app/milksy/id6810681675. I’d be happy to answer questions about the implementation.

Thanks,
Davor

Other concrete opportunities to verify in the relevant owner accounts: link Milksy from Davor's projects page and ensure the App Store developer/support links lead to the relevant Milksy pages. These changes were not made in this website checkout. Links and independent reviews should serve readers; do not buy ranking links or manufacture endorsements.

## Expectations

There is no guaranteed #1 position or Friday deadline. Rankings depend on the query, country, competition and Google's systems. Google's guide says changes may take hours to months, and recommends assessing impact over weeks: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
