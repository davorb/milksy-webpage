import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { publishedArticles } from '../data/articles';
export async function GET(context: APIContext) { return rss({ title: 'Milksy articles', description: 'Feature notes and practical articles from Milksy.', site: context.site!, items: (await publishedArticles()).map(post => ({ title: post.data.title, description: post.data.description, pubDate: post.data.publishedAt, link: `/blog/${post.id}/` })), customData: '<language>en</language>' }); }
