// src/content/config.ts
import { defineCollection, z } from "astro:content";

const strOrArr = z.union([z.string(), z.array(z.string())]);

// Accept prior patterns + normalize
const ImageField = z.union([
  z.string(),                 // e.g. "/images/encounters/foo.jpg" (public/)
  z.object({ src: z.string() }) // imported image objects from MD/MDX
]).optional();

// SUPER-permissive SEO to avoid breaking older posts
const SeoField = z.union([
  z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
  z.string(),
  z.array(z.string())
]).optional().transform((v) => {
  if (!v) return undefined;
  if (typeof v === "string") return { description: v };
  if (Array.isArray(v)) return { description: v.join(" ") };
  return v; // already an object
});

const commonSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  excerpt: z.string().optional(),
  pubDate: z.coerce.date().optional(),   // keeps old string dates working
  heroImage: ImageField,
  cardImage: ImageField,
  tags: strOrArr.optional().transform((v) =>
    v === undefined ? [] : Array.isArray(v) ? v : [v]
  ),
  categories: strOrArr.optional().transform((v) =>
    v === undefined ? [] : Array.isArray(v) ? v : [v]
  ),
  seo: SeoField,
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!,  // preserves your old slugs
  schema: commonSchema,
});

const encounters = defineCollection({
  type: "content",
  slug: ({ slug }) => slug.split("/").pop()!,
  schema: commonSchema,
});

export const collections = { blog, encounters };
