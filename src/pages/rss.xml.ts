import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET = async (context) => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  posts.sort((a, b) => new Date(b.data.pubDate as any).getTime() - new Date(a.data.pubDate as any).getTime());

  return rss({
    title: 'Abba Unveiled Blog',
    description: 'New posts from WR Selvig at Abba Unveiled',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt || post.data.description || '',
      pubDate: post.data.pubDate as Date,
      link: `/blog/${post.slug}/`,
      customData: `<author>WR Selvig</author>`,
    })),
  });
};
