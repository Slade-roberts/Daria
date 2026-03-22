import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  // @ts-expect-error -- __experimental_actions is not in the public Sanity type definitions yet
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'biography',
      title: 'Biography',
      description: 'Your full biography. You can format it with paragraphs, bold text, etc.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      description: 'A professional photo of yourself',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Brief description of the image for accessibility',
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education & Credentials',
      description: 'List your degrees, certifications, or credentials',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'areasOfExpertise',
      title: 'Areas of Expertise',
      description: 'e.g. Literary Translation, Russian Literature, Contemporary Fiction',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      description: 'Languages you work with (e.g. Russian, English, French)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
