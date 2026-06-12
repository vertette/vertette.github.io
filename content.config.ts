import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: 'page',
      source: 'post/*.md',
      schema: z.object({
        date: z.date(),
        author: z.string(),
        category: z.string(),
        thumbnail: z.string(),
      }),
    }),
  }
})
