import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const link = z.object({ label: z.string(), href: z.string() })

const caseStudy = z.object({
  title: z.string(),
  description: z.string(),
  product: z.string(),
  kicker: z.string(),
  lede: z.string(),
  facts: z.string(),
  cta: z.object({
    heading: z.string(),
    lede: z.string(),
    primary: link,
    secondary: link.optional(),
  }),
  footnote: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: { include: 'en/**', prefix: '' },
      schema: caseStudy,
    }),
    content_da: defineCollection({
      type: 'page',
      source: { include: 'da/**', prefix: '/da' },
      schema: caseStudy,
    }),
  },
})
