import { defineType, defineField } from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Title of the essay, article, or piece',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      options: { dateFormat: 'MMMM YYYY' },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'A short summary shown in the publications list',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Full Content',
      description: 'The full text of the piece (if you want to publish it on your site)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      description: 'Link to the publication if published elsewhere',
      type: 'url',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
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
  preview: {
    select: {
      title: 'title',
      date: 'publicationDate',
      media: 'featuredImage',
    },
    prepare({ title, date, media }: { title: string; date?: string; media?: any }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '',
        media,
      }
    },
  },
})
