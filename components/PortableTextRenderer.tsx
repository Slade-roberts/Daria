import { PortableText } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-charcoal/80">{children}</p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl mt-8 mb-4 text-charcoal">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-serif text-xl mt-6 mb-3 text-charcoal">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-sage pl-6 my-6 italic text-charcoal/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold text-charcoal">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sage underline underline-offset-2 hover:text-charcoal transition-colors"
      >
        {children}
      </a>
    ),
  },
}

interface PortableTextRendererProps {
  value: TypedObject | TypedObject[]
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />
}
