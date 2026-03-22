import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-muted-gray/20 bg-cream mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-serif text-sm text-charcoal/60">
          © {new Date().getFullYear()} Daria Shchukina
        </p>
        <nav className="flex gap-6">
          <Link href="/about" className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-sage transition-colors">About</Link>
          <Link href="/portfolio" className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-sage transition-colors">Portfolio</Link>
          <Link href="/contact" className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-sage transition-colors">Contact</Link>
        </nav>
      </div>
    </footer>
  )
}
