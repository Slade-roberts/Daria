import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Daria Shchukina — Translator & Literary Scholar',
  description: 'Portfolio of Daria Shchukina, translator and literary scholar specializing in Russian and Eastern European literature.',
  openGraph: {
    title: 'Daria Shchukina — Translator & Literary Scholar',
    description: 'Portfolio of Daria Shchukina, translator and literary scholar.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-cream text-charcoal antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
