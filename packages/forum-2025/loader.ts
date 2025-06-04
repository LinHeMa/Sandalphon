import { ImageLoaderProps } from 'next/image'
import { staticFileDestination } from './config'

function imageLoader(imageInfo: ImageLoaderProps) {
  console.log({ imageInfo })
  return `${staticFileDestination}${imageInfo.src}`
}

export { imageLoader }
