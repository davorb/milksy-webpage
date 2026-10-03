import type { APIContext } from 'astro';
import { comparisons } from '../data/comparisons';
import { landings } from '../data/landings';
import { publishedArticles } from '../data/articles';
const escape = (text: string) => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export async function GET({ site }: APIContext) { const paths = ['/', '/about/', '/privacy/', '/blog/', '/compare/', ...comparisons.map(page => `/compare/${page.slug}/`), ...landings.map(page => `/${page.slug}/`), ...(await publishedArticles()).map(post => `/blog/${post.id}/`)]; return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${escape(new URL(path,site).href)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type':'application/xml' } }); }
