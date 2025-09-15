import { z, defineCollection } from "astro:content";

const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  pubDate: z.coerce.date().optional(),
  heroImage: z.union([z.string(), z.object({ src: z.string() })]).optional(),
  cardImage: z.union([z.string(), z.object({ src: z.string() })]).optional(),
  tags: z.union([z.array(z.string()), z.string()]).optional(),
  categories: z.union([z.array(z.string()), z.string()]).optional(),
  // allow string | string[] | object for SEO
  seo: z.union([
    z.string(),
    z.array(z.string()),
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }),
  ]).optional(),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!,
  schema: commonSchema,
});

const encounters = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!,
  schema: commonSchema,
});

export const collections = { blog, encounters };
