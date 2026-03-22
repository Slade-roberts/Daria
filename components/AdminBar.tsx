import { draftMode } from 'next/headers'
import Link from 'next/link'

const editLinks = [
  { label: 'Site Settings', href: '/studio/intent/edit/id=siteSettings;type=siteSettings/' },
  { label: 'About Page', href: '/studio/intent/edit/id=about;type=about/' },
  { label: '+ Add Work', href: '/studio/intent/create/type=portfolioItem/' },
  { label: '+ Add Publication', href: '/studio/intent/create/type=publication/' },
  { label: 'Open Studio', href: '/studio' },
]

export default async function AdminBar() {
  const { isEnabled } = await draftMode()
  if (!isEnabled) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal text-cream shadow-lg">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center gap-1 overflow-x-auto">
        <span className="text-xs tracking-widest uppercase text-sage whitespace-nowrap mr-3 font-sans">
          Edit Mode
        </span>
        <div className="flex items-center gap-1 flex-1">
          {editLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('/studio') ? '_blank' : undefined}
              rel={href.startsWith('/studio') ? 'noopener noreferrer' : undefined}
              className="text-xs px-3 py-1.5 bg-cream/10 hover:bg-sage/30 text-cream whitespace-nowrap transition-colors font-sans rounded-sm"
            >
              {label}
            </a>
          ))}
        </div>
        <Link
          href="/login?logout=1"
          className="text-xs px-3 py-1.5 border border-cream/20 hover:border-sage text-cream/60 hover:text-sage whitespace-nowrap transition-colors font-sans rounded-sm ml-auto"
        >
          Sign Out
        </Link>
      </div>
    </div>
  )
}
