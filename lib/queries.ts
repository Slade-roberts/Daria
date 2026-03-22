import { client } from './sanity.client'
import type { SiteSettings, AboutPage, PortfolioItem, Publication, Testimonial, ContactSection } from '@/types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(`*[_type == "siteSettings"][0]`)
  } catch {
    return null
  }
}

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    return await client.fetch(`*[_type == "about"][0]`)
  } catch {
    return null
  }
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    return await client.fetch(`*[_type == "portfolioItem"] | order(_createdAt desc)`)
  } catch {
    return []
  }
}

export async function getFeaturedPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    return await client.fetch(`*[_type == "portfolioItem" && featured == true] | order(_createdAt desc)[0..2]`)
  } catch {
    return []
  }
}

export async function getPublications(): Promise<Publication[]> {
  try {
    return await client.fetch(`*[_type == "publication"] | order(publicationDate desc)`)
  } catch {
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await client.fetch(`*[_type == "testimonial"]`)
  } catch {
    return []
  }
}

export async function getContactSection(): Promise<ContactSection | null> {
  try {
    return await client.fetch(`*[_type == "contactSection"][0]`)
  } catch {
    return null
  }
}
