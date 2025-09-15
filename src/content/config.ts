import { z, defineCollection } from "astro:content";

// Reusable schema (keeps flexible unions; adds hero/card images)
const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  pubDate: z.coerce.date().optional(),
  heroImage: z.union([z.string(), z.object({ src: z.string() })]).optional(),
  cardImage: z.union([z.string(), z.object({ src: z.string() })]).optional(),
  tags: z.union([z.array(z.string()), z.string()]).optional(),
  categories: z.union([z.array(z.string()), z.string()]).optional(),
  seo: z.union([z.array(z.string()), z.string()]).optional(),
  draft: z.boolean().default(false),
});

// Theology/discussion posts
const blog = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!, // keep your last-segment slug
  schema: commonSchema,
});

// Heaven Encounters posts
const encounters = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!, // keep slugs consistent
  schema: commonSchema,
});

export const collections = { blog, encounters };
