import type { APIContext } from 'astro';
export function GET({ site }: APIContext) { return new Response(`User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: ${new URL('/sitemap.xml',site).href}\n`, { headers:{'Content-Type':'text/plain'} }); }
