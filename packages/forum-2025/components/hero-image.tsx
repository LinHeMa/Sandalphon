import styled from 'styled-components'
import { useState, useEffect } from 'react'
import Image from '@readr-media/react-image'
import { breakpoint } from '~/styles/theme'
import { imagePrefix } from '~/config'
import type { FormattedHeroImage } from '~/types'
import useWindowDimensions from '~/hook/use-window-dimensions'

const ImageBlock = styled.div`
  width: 100%;
  height: calc(100vh - 53px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }

  ${breakpoint.md} {
    height: auto;
  }
`
const SkeletonLoading = styled.div`
  width: 100%;
  height: calc(100vh - 53px);
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

type HeroImageProps = {
  heroImageSrc: FormattedHeroImage
}

export default function HeroImage({
  heroImageSrc = { mobile: '', tablet: '', desktop: '' },
}: HeroImageProps): React.JSX.Element {
  const windowDimensions = useWindowDimensions()
  const [selectedSrc, setSelectedSrc] = useState('')

  useEffect(() => {
    if (windowDimensions?.width && windowDimensions?.width >= 1200) {
      setSelectedSrc(heroImageSrc.desktop)
    } else if (windowDimensions?.width && windowDimensions?.width >= 768) {
      setSelectedSrc(heroImageSrc.tablet)
    } else {
      setSelectedSrc(heroImageSrc.mobile)
    }
    console.log({ selectedSrc })
  }, [windowDimensions, heroImageSrc])

  if (!selectedSrc) return <SkeletonLoading />

  return (
    <ImageBlock>
      <Image
        images={{ original: selectedSrc }}
        alt="forum-hero-image"
        objectFit="cover"
        priority={true}
        defaultImage={`${imagePrefix}/images/default-hero-image-bg.svg`}
      />
    </ImageBlock>
  )
}
