// FILE: src/content/config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(), // use string paths (e.g., /images/...)
    cardImage: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
