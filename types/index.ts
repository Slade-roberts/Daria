export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SiteSettings {
  _type: 'siteSettings'
  title: string
  subtitle?: string
  shortIntro?: string
  contactEmail?: string
  socialLinks?: {
    platform: string
    url: string
  }[]
  heroImage?: SanityImage
}

export interface AboutPage {
  _type: 'about'
  biography?: any[]
  profileImage?: SanityImage
  education?: string[]
  areasOfExpertise?: string[]
  languages?: string[]
}

export interface PortfolioItem {
  _id: string
  _type: 'portfolioItem'
  title: string
  category?: string
  originalLanguage?: string
  translatedLanguage?: string
  year?: number
  shortDescription?: string
  fullDescription?: any[]
  excerpt?: string
  externalLink?: string
  featuredImage?: SanityImage
  featured?: boolean
}

export interface Publication {
  _id: string
  _type: 'publication'
  title: string
  publicationDate?: string
  summary?: string
  body?: any[]
  externalLink?: string
  featuredImage?: SanityImage
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  quote: string
  author: string
  role?: string
}

export interface ContactSection {
  _type: 'contactSection'
  heading?: string
  introText?: string
  email?: string
  additionalInfo?: any[]
}
