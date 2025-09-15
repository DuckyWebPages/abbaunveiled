import { z, defineCollection } from "astro:content";

// Reusable schema (keeps your flexible unions; adds hero/card images)
const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  excerpt: z.string().optional(),

  // Normalize dates whether string or Date; still optional
  pubDate: z.coerce.date().optional(),

  // Optional images used by your listing page
  heroImage: z.union([z.string(), z.object({ src: z.string() })]).optional(),
  cardImage: z.union([z.string(), z.object({ src: z.string() })]).optional(),

  // Your existing flexible fields
  tags: z.union([z.array(z.string()), z.string()]).optional(),
  categories: z.union([z.array(z.string()), z.string()]).optional(),
  seo: z.union([z.array(z.string()), z.string()]).optional(),

  draft: z.boolean().default(false),
});

// Theology/discussion posts
const blog = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!, // keep your last-segment slug
  schema
