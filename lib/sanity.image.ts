import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './sanity.client'

export const urlForImage = (source: SanityImageSource) =>
  createImageUrlBuilder(client).image(source)
