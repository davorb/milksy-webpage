import { defineConfig } from 'astro/config';
const site = process.env.SITE_URL || 'https://milksy.app';
const url = new URL(site);
if (url.protocol !== 'https:' || url.pathname !== '/') throw new Error('SITE_URL must be an HTTPS origin without a subpath.');
export default defineConfig({ site: url.origin, output: 'static', trailingSlash: 'always', build: { inlineStylesheets: 'never' } });
