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

type HeroImageProps = {
  heroImageSrc: FormattedHeroImage
}

export default function HeroImage({
  heroImageSrc = { mobile: '', tablet: '', desktop: '' },
}: HeroImageProps): JSX.Element {
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
  }, [windowDimensions, heroImageSrc])

  return (
    <ImageBlock>
      <Image
        images={{ original: selectedSrc }}
        alt="forum-hero-image"
        objectFit={'cover'}
        priority={true}
        defaultImage={`${imagePrefix}/images/default-hero-image-bg.svg`}
      />
    </ImageBlock>
  )
}
