import React from 'react'
import styled from 'styled-components'
import Image from '@readr-media/react-image'
import dayjs from 'dayjs'
import { breakpoint, color } from '~/styles/theme'
import type { GenericRelatedPost } from '~/types'
import { imagePrefix } from '~/config'

const SlideItem = styled.a`
  cursor: pointer;
  max-width: 200px;

  &:hover .post-title {
    text-decoration-line: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
  }

  ${breakpoint.md} {
    max-width: 216px;
  }
`

const PostImage = styled.div`
  width: 100%;
  height: 113px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${breakpoint.md} {
    height: 144px;
  }
`

const Content = styled.div`
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  padding: 18px 10px;
  background: ${color.primary};
  height: 144px;

  ${breakpoint.md} {
    background: none;
    padding: 15px 10px 40px 10px;
    height: 130px;
  }
`

const PostTitle = styled.div`
  max-height: 96px;
  font-size: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  & + .date {
    margin-top: 10px;
  }
`

const Date = styled.p`
  display: block;
  font-size: 14px;
`

type SlideItemProps = {
  post: GenericRelatedPost
}
export default function Slide({ post }: SlideItemProps): JSX.Element {
  const { url, heroImage, title, publishedDate } = post

  const formattedDate = dayjs(publishedDate).format('YYYY/MM/DD HH:mm')

  return (
    <SlideItem href={url} target="_blank" rel="noopener noreferrer nofollow">
      <PostImage>
        <Image
          images={heroImage?.resized}
          imagesWebP={heroImage?.resizedWebp}
          defaultImage={`${imagePrefix}/images/default-og-img.svg`}
          alt={title}
          objectFit={'cover'}
          priority={true}
        />
      </PostImage>
      <Content>
        <PostTitle className="post-title">
          <p>{title}</p>
        </PostTitle>
        <Date className="date">{formattedDate}</Date>
      </Content>
    </SlideItem>
  )
}
