import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { staticFileDestination } from '~/config'

const ImageWrapper = styled.div<{ shouldShowBg: boolean; bgColor: string }>`
  width: 100%;
  height: 100%;
  background-color: rgba(217, 217, 217, 1);
  background-color: ${(props) =>
    props.shouldShowBg ? props.bgColor : 'transparent'};
`

const Image = styled.img<{ shouldShowBg: boolean; objectFit: string }>`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.objectFit};
  display: ${(props) => (props.shouldShowBg ? 'none' : 'block')};
`

type ImageLoaderProps = {
  imgSrc: string
  alt?: string
  loadingImage?: string
  defaultImage?: string
  bgColor?: string
  objectFit?: string
  className?: string
}
export default function ImageLoader({
  imgSrc = '',
  loadingImage = `${staticFileDestination}/icon/loading.gif`,
  defaultImage = '',
  bgColor = 'rgba(217, 217, 217, 1)',
  objectFit = 'cover',
  alt = '',
  className = '',
}: ImageLoaderProps): JSX.Element {
  const [imageSrc, setImageSrc] = useState<string | undefined>(loadingImage)
  const [hasError, setHasError] = useState(false)

  const handleImageLoad = () => {
    setImageSrc(imgSrc)
  }

  const handleError = () => {
    if (!hasError) {
      setImageSrc(defaultImage ?? undefined)
      setHasError(true)
    }
  }

  //沒有 default-image 而且 onError, bg 才會是白的
  const shouldShowBg = Boolean(hasError && !defaultImage)

  useEffect(() => {
    setImageSrc(imgSrc)
  }, [imgSrc])

  const imageRef = useRef(null)

  return (
    <ImageWrapper
      shouldShowBg={shouldShowBg}
      bgColor={bgColor}
      className={`custom-image ${className}`}
    >
      <Image
        src={imageSrc}
        alt={alt}
        ref={imageRef}
        onLoad={handleImageLoad}
        onError={handleError}
        shouldShowBg={shouldShowBg}
        rel="preload"
        objectFit={objectFit}
      />
    </ImageWrapper>
  )
}
