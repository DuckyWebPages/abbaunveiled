import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!, // normalize to last segment
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    pubDate: z.union([z.string(), z.date()]).optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional(),
    categories: z.union([z.array(z.string()), z.string()]).optional(),
    seo: z.union([z.array(z.string()), z.string()]).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
