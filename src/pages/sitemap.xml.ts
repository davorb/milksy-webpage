import type { APIContext } from 'astro';
import { comparisons } from '../data/comparisons';
import { landings } from '../data/landings';
import { publishedArticles } from '../data/articles';
import { locales, homePath } from '../data/localization';
const escape = (text: string) => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export async function GET({ site }: APIContext) {
 const homePaths = locales.map(homePath);
 const paths = [...homePaths, '/about/', '/privacy/', '/blog/', '/compare/', ...comparisons.map(page => `/compare/${page.slug}/`), ...landings.map(page => `/${page.slug}/`), ...(await publishedArticles()).map(post => `/blog/${post.id}/`)];
 const alternates = [...locales.map(locale => ({ locale, path: homePath(locale) })), { locale: 'x-default', path: '/' }].map(({ locale, path }) => `<xhtml:link rel="alternate" hreflang="${locale}" href="${escape(new URL(path, site).href)}"/>`).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${paths.map(path => `<url><loc>${escape(new URL(path,site).href)}</loc>${homePaths.includes(path) ? alternates : ''}</url>`).join('')}</urlset>`, { headers: { 'Content-Type':'application/xml' } });
}
