import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // @ts-expect-error -- __experimental_actions is not in the public Sanity type definitions yet
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      description: 'The main title of your website (e.g. "Daria Shchukina")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'A short tagline shown under your name (e.g. "Translator & Literary Scholar")',
      type: 'string',
    }),
    defineField({
      name: 'shortIntro',
      title: 'Short Introduction',
      description: 'A brief intro paragraph shown on the homepage hero section',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      description: 'Your primary contact email address',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      description: 'Links to your social profiles or professional pages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              description: 'e.g. LinkedIn, Twitter, Academia.edu',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Background or accent image for the homepage hero section',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle' },
  },
})
