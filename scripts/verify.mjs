import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const origin=new URL(process.env.SITE_URL || 'https://milksy.app').origin;
const app='https://apps.apple.com/us/app/milksy/id6810681675';
const files=fs.readdirSync('dist',{recursive:true}).filter(file=>file.endsWith('.html'));
const titles=new Set(), descriptions=new Set();
const locales=fs.readdirSync('src/data/locales').filter(file=>file.endsWith('.json')).map(file=>file.replace(/\.json$/,''));
const copyFor=locale=>JSON.parse(fs.readFileSync(`src/data/locales/${locale}.json`,'utf8'));
const englishCopy=copyFor('en');
const homeRoute=locale=>locale==='en'?'/':`/${locale}/`;
const homeRoutes=new Set(locales.map(homeRoute));
for(const locale of locales){
 const copy=copyFor(locale);
 assert.deepEqual(Object.keys(copy).sort(),Object.keys(englishCopy).sort(),`${locale}: translation keys differ`);
 for(const [key,value] of Object.entries(copy))assert(typeof value==='string' && value.trim(),`${locale}: empty translation ${key}`);
}
let appLinks=0;
for(const file of files){
 const html=fs.readFileSync(path.join('dist',file),'utf8');
 const route=file==='index.html' ? '/' : file==='404.html' ? '/404.html' : '/'+file.replace(/index\.html$/,'');
 const title=html.match(/<title>(.*?)<\/title>/s)?.[1]; assert(title,`${file}: title missing`); assert(!titles.has(title),`Duplicate title: ${title}`); titles.add(title);
 const desc=html.match(/<meta name="description" content="([^"]+)"/)?.[1]; assert(desc,`${file}: description missing`); assert(!descriptions.has(desc),`Duplicate description: ${desc}`); descriptions.add(desc);
 assert(html.includes(`rel="canonical" href="${origin}${route}"`),`${file}: canonical wrong`);
 for(const key of ['og:title','og:description','og:image','og:url','twitter:card','twitter:title','twitter:description','twitter:image'])assert(html.includes(`="${key}"`),`${file}: ${key} missing`);
 assert(html.includes('app-id=6810681675'),`${file}: smart banner missing`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: expected one h1`);
 const locale=homeRoutes.has(route) && route!=='/' ? route.split('/')[1] : 'en';
 assert(html.includes(`<html lang="${locale}">`),`${file}: document language wrong`);
 const alternates=[...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
 if(homeRoutes.has(route)){
  assert.equal(alternates.length,locales.length+1,`${file}: alternate language count wrong`);
  const languageURLs=new Map(alternates.map(match=>[match[1],match[2]]));
  for(const language of locales)assert.equal(languageURLs.get(language),origin+homeRoute(language),`${file}: missing or wrong ${language} alternate`);
  assert.equal(languageURLs.get('x-default'),origin+'/',`${file}: x-default wrong`);
  assert(html.includes('class="language-switcher"'),`${file}: switcher missing`);
  for(const language of locales)assert(html.includes(`href="${homeRoute(language)}" lang="${language}" hreflang="${language}"`),`${file}: switcher missing ${language}`);
  const badge=['en','bs','sr-Latn'].includes(locale)?'/app-store-badge.svg':`/badges/${locale}.svg`;
  assert(html.includes(`src="${badge}"`),`${file}: localized badge wrong`);
  const screenLocale=['bs','sr-Latn'].includes(locale)?'hr':locale;
  const screens=[...html.matchAll(/data-screen="([^"]+)" data-screen-locale="([^"]+)"/g)];
  assert.equal(screens.length,3,`${file}: homepage screenshots incomplete`);
  assert.deepEqual(screens.map(match=>match[1]).sort(),['timeline','today','trends']);
  for(const screen of screens)assert.equal(screen[2],screenLocale,`${file}: ${screen[1]} screenshot language wrong`);
  if(screenLocale!=='en')for(const screen of screens)assert(fs.existsSync(`src/assets/screenshots/${screenLocale}/${screen[1]}.png`),`${file}: source screenshot missing`);
  const schema=JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1]);
  for(const type of ['WebSite','FAQPage'])assert(schema.some(item=>item['@type']===type && item.inLanguage===locale),`${file}: ${type} language wrong`);
  assert.equal(schema.find(item=>item['@type']==='FAQPage').mainEntity.length,5,`${file}: FAQ incomplete`);
 }else assert.equal(alternates.length,0,`${file}: untranslated page claims translated equivalents`);
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
 for(const match of html.matchAll(/<(a|img|source|link)\b[^>]*?\b(?:href|src)="([^"]+)"/g)){
  const ref=match[2];
  if(ref.startsWith('mailto:'))continue;
  if(ref.startsWith('#')){assert(ids.has(ref.slice(1)),`${file}: broken fragment ${ref}`);continue;}
  const url=new URL(ref,origin+route);
  if(url.hostname==='apps.apple.com'){const allowed=[app,'https://apps.apple.com/us/app/nara-baby-pregnancy-tracker/id1444639029','https://apps.apple.com/us/app/huckleberry-baby-tracker/id1169136078','https://apps.apple.com/us/app/baby-tracker-newborn-log/id779656557'];assert(allowed.includes(url.href),`${file}: unknown App Store link`);if(url.href===app)appLinks++;}
  if(url.origin!==origin)continue;
  let target=path.join('dist',decodeURIComponent(url.pathname));
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  assert(fs.existsSync(target),`${file}: broken link ${ref}`);
  if(url.hash){const targetHTML=fs.readFileSync(target,'utf8'); assert(targetHTML.includes(`id="${url.hash.slice(1)}"`),`${file}: broken linked fragment ${ref}`);}
 }
 for(const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)){
  const data=JSON.parse(match[1]);assert(Array.isArray(data));
  for(const item of data){assert.equal(item['@context'],'https://schema.org');assert(item['@type']);
   if(item['@type']==='FAQPage')for(const q of item.mainEntity){assert(html.includes(q.name.replace(/&/g,'&amp;')),`${file}: FAQ question is not visible`);assert(q.acceptedAnswer.text);}
  }
 }
 const clientScripts=[...html.matchAll(/<script(?![^>]*type="application\/ld\+json")([^>]*)>/gi)];
 assert.equal(clientScripts.length,1,`${file}: expected one analytics entry script`);
 const scriptSource=clientScripts[0][1].match(/src="([^"]+)"/)?.[1];
 assert(scriptSource?.startsWith('/_astro/'),`${file}: analytics script must be a local bundle`);
 assert(fs.existsSync(path.join('dist',scriptSource)),`${file}: analytics script missing`);
 assert(html.includes('id="analytics-consent"') && html.includes('id="analytics-settings"'),`${file}: analytics controls missing`);
 assert(!html.includes('Writing a Milksy article'),`${file}: draft leaked`);
}
// Comparison content must stay crawlable and linked as new competitors are added.
const comparisonFiles=files.filter(file=>file.startsWith('compare/'));
assert(comparisonFiles.length>=4,'Comparison hub and three detail pages missing');
for(const file of comparisonFiles){
 const html=fs.readFileSync(path.join('dist',file),'utf8');
 assert(html.includes('Last updated:') && /<time datetime="\d{4}-\d{2}-\d{2}">/.test(html),`${file}: visible review date missing`);
 assert(html.includes('<table') && html.includes('<caption'),`${file}: static comparison table missing`);
 assert(html.includes('id="sources"'),`${file}: visible sources missing`);
 const schema=JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s)[1]);
 assert(schema.some(item=>item['@type']==='BreadcrumbList'),`${file}: breadcrumbs missing`);
 assert(schema.some(item=>item['@type']==='FAQPage'),`${file}: FAQ schema missing`);
 assert(schema.some(item=>item['@type']===(file==='compare/index.html'?'CollectionPage':'WebPage')),`${file}: page schema missing`);
 for(const target of comparisonFiles){
  if(target===file)continue;
  const route='/'+target.replace(/index\.html$/,'');
  assert(html.includes(`href="${route}"`),`${file}: related comparison missing: ${route}`);
 }
}
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
for(const entry of sitemap.matchAll(/<url>(.*?)<\/url>/gs)){
 const url=entry[1].match(/<loc>(.*?)<\/loc>/)[1];
 const alternates=[...entry[1].matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
 if(homeRoutes.has(new URL(url).pathname)){
  assert.equal(alternates.length,locales.length+1,`${url}: sitemap alternate count wrong`);
  for(const language of locales)assert(alternates.some(match=>match[1]===language && match[2]===origin+homeRoute(language)),`${url}: sitemap alternate missing ${language}`);
  assert(alternates.some(match=>match[1]==='x-default' && match[2]===origin+'/'),`${url}: sitemap x-default wrong`);
 }else assert.equal(alternates.length,0,`${url}: unexpected sitemap alternates`);
}
assert.equal(urls.length,files.length-1,'Sitemap should include all pages except 404');
for(const url of urls){assert(url.startsWith(origin+'/'));const target=path.join('dist',new URL(url).pathname,'index.html');assert(fs.existsSync(target),`Sitemap route missing: ${url}`);}
const robots=fs.readFileSync('dist/robots.txt','utf8');assert(robots.includes('User-agent: OAI-SearchBot\nAllow: /'));assert(robots.includes('User-agent: *\nAllow: /'));assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(fs.readFileSync('dist/rss.xml','utf8').includes('<rss'));
assert(fs.readdirSync('dist',{recursive:true}).some(file=>file.endsWith('.js')), 'Analytics bundles missing');
console.log(`Verified ${files.length} HTML pages, ${urls.length} sitemap URLs, ${appLinks} App Store links, unique metadata, JSON-LD, internal links, draft exclusion and analytics entry scripts.`);
