import { defineType, defineField } from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  // @ts-expect-error -- __experimental_actions is not in the public Sanity type definitions yet
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'The heading shown on the Contact page (e.g. "Get in Touch")',
      type: 'string',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      description: 'Introductory paragraph on the Contact page',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      description: 'The email address shown on the Contact page',
      type: 'string',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      description: 'Any other contact information or notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Section' }),
  },
})
