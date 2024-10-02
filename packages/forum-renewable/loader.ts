import { ImageLoaderProps } from 'next/image'
import { staticFileDestination } from './config'

function imageLoader(imageInfo: ImageLoaderProps) {
  return `${staticFileDestination}${imageInfo.src}`
}

export { imageLoader }
