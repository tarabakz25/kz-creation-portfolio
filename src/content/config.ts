import { defineCollection, z } from "astro:content";

const profile = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    headline: z.string(),
    awards: z.array(z.string()),
    socials: z.array(
      z.object({
        platform: z.enum(["x", "github", "website", "linkedin"]),
        label: z.string(),
        url: z.string().url(),
      }),
    ),
    toolCategories: z.array(
      z.object({
        name: z.string(),
        items: z.array(
          z.object({
            name: z.string(),
            score: z.number().int().min(0).max(100),
          }),
        ),
      }),
    ),
  }),
});

const activity = defineCollection({
  type: "data",
  schema: z.object({
    dateLabel: z.string(),
    sortDate: z.coerce.date(),
    title: z.string(),
    period: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const works = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    url: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  profile,
  activity,
  works,
};
