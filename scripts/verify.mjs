import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const origin=new URL(process.env.SITE_URL || 'https://milksy.app').origin;
const app='https://apps.apple.com/us/app/milksy/id6810681675';
const files=fs.readdirSync('dist',{recursive:true}).filter(file=>file.endsWith('.html'));
const titles=new Set(), descriptions=new Set();
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
 assert(html.includes('lang="en"'),`${file}: language missing`);
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
assert.equal(urls.length,files.length-1,'Sitemap should include all pages except 404');
for(const url of urls){assert(url.startsWith(origin+'/'));const target=path.join('dist',new URL(url).pathname,'index.html');assert(fs.existsSync(target),`Sitemap route missing: ${url}`);}
const robots=fs.readFileSync('dist/robots.txt','utf8');assert(robots.includes('User-agent: OAI-SearchBot\nAllow: /'));assert(robots.includes('User-agent: *\nAllow: /'));assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert(fs.readFileSync('dist/rss.xml','utf8').includes('<rss'));
assert(fs.readdirSync('dist',{recursive:true}).some(file=>file.endsWith('.js')), 'Analytics bundles missing');
console.log(`Verified ${files.length} HTML pages, ${urls.length} sitemap URLs, ${appLinks} App Store links, unique metadata, JSON-LD, internal links, draft exclusion and analytics entry scripts.`);
