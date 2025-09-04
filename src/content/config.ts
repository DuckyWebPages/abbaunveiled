import { defineCollection, z, image } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // allow either a processed image or a plain string path
    heroImage: z.union([image(), z.string()]).optional(),
    cardImage: z.union([image(), z.string()]).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
