import { defineType, defineField } from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the work you translated or project you worked on',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      description: 'Toggle this on to display this item on the homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'e.g. Novel, Short Story, Poetry, Academic Text',
      type: 'string',
      options: {
        list: [
          { title: 'Novel', value: 'novel' },
          { title: 'Short Story', value: 'short-story' },
          { title: 'Poetry', value: 'poetry' },
          { title: 'Academic Text', value: 'academic' },
          { title: 'Essay', value: 'essay' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'originalLanguage',
      title: 'Original Language',
      description: 'The language the original work was written in',
      type: 'string',
    }),
    defineField({
      name: 'translatedLanguage',
      title: 'Translated Language',
      description: 'The language you translated the work into',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      description: 'Year the translation was completed or published',
      type: 'number',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      description: 'A brief summary shown in the portfolio grid (1-2 sentences)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      description: 'A detailed description of the work and translation process',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Translation Excerpt',
      description: 'An optional excerpt from the translation to showcase your work',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link or PDF',
      description: 'Link to the published work, journal, or PDF',
      type: 'url',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'Cover image or illustration for this work',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Year, New to Old',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      category: 'category',
      media: 'featuredImage',
    },
    prepare({ title, year, category, media }: { title: string; year?: number; category?: string; media?: any }) {
      return {
        title,
        subtitle: [year, category].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
