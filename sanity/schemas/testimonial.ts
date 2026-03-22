import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      description: 'The endorsement or testimonial text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      description: 'Name of the person giving the testimonial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role or Affiliation',
      description: 'e.g. "Editor, Penguin Books" or "Professor, Columbia University"',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'role' },
  },
})
