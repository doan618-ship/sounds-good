import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const reviewsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    releaseYear: z.union([z.number(), z.string()]),
    rating: z.number(),
    coverImage: z.string(),
    spotifyId: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    summary: z.string(),
    // 6 spectrum ratings over 10:
    // [0] Melody & Harmony
    // [1] Production & Mixing
    // [2] Lyrical Depth
    // [3] Cohesiveness & Concept
    // [4] Originality
    // [5] Cultural Impact
    spectrumRating: z.tuple([
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
      z.number(),
    ]),
    accentColor: z.string().optional(),
    bgColors: z.tuple([z.string(), z.string()]).optional(),
  }),
});

export const collections = {
  reviews: reviewsCollection,
};
