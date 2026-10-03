import { getCollection } from 'astro:content';
export async function publishedArticles() { return (await getCollection('blog', ({ data }) => !data.draft && data.publishedAt <= new Date())).sort((a,b) => b.data.publishedAt.valueOf()-a.data.publishedAt.valueOf()); }
