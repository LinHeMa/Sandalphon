import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Test = styled.img<{ objectFit: string }>`
  object-fit: ${(props) => props.objectFit};
`

type ImageProps = {
  imgSrc: string
  defaultImage: string
  alt?: string
  objectFit?: string
}
function Image({
  imgSrc,
  defaultImage,
  alt = '',
  objectFit = 'contain',
}: ImageProps) {
  const [src, setSrc] = useState(imgSrc)

  useEffect(() => {
    // 如果imgSrc为空或undefined，或加载失败，则将src设置为defaultImage
    if (!imgSrc) {
      setSrc(defaultImage)
    }
  }, [imgSrc, defaultImage])

  return <Test src={src} alt={alt} objectFit={objectFit} />
}

export default Image
