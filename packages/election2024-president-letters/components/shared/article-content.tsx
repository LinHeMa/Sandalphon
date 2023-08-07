import ArticleImage from './article-image'
import { imagePrefix } from '../../config'
import styled, { css } from 'styled-components'
import { font, color, breakpoint } from '../../styles/theme'
const { background, text, border, candidates } = color
const { body, h3, h5 } = font
import ArticleMainText from '../article/article-main-text'
import ArticleImageParallaxScrolling from './article-image-parallax-scrolling'
import {
  ArticleContent as ArticleContentType,
  ArticleContentItem,
} from '../../types/index'
import { headerHeight } from '../../styles/shared-style'
const defaultPadding = css`
  padding-left: 20px;
  padding-right: 20px;
`
const defaultMargin = css`
  margin-bottom: 24px;
`

const bodyFont = css`
  font-size: ${body.size};
  line-height: ${body.lineHeight};
  font-weight: ${body.weight};
`
const MaxWidth = css`
  max-width: 640px; //todo: after implement like/dislike, should adjust this value
  margin-left: auto;
  margin-right: auto;
`

const Wrapper = styled.section`
  position: relative;
  background-color: ${background.gray};
  padding-top: calc(${headerHeight} + 20px);
  padding-bottom: 20px;
  *:last-child {
    margin-bottom: 0px;
  }
  overflow-x: hidden;
  //for scroll-snap
  scroll-snap-align: start;
  white-space: initial;
`

const Text = styled.p`
  ${bodyFont};
  ${defaultMargin};
  ${defaultPadding};
  ${MaxWidth}
`

const Intro = styled.section`
  ${defaultMargin};
  ${defaultPadding};

  padding-top: 8px;
  padding-bottom: 20px;
  margin-right: 20px;
  margin-left: 20px;

  @media (min-width: 640px) {
    max-width: 600px;
    margin: 0 auto;
  }
  background-color: white;
  border: 1px solid ${border};
  border-radius: 12px;
  font-size: ${h5.size};
  line-height: ${h5.lineHeight};
  font-weight: ${h5.weight};
  color: ${text.secondary};
  p {
    margin-top: 12px;
    background: linear-gradient(
      0deg,
      ${border} 1px,
      rgba(0, 0, 0, 0) 1px,
      rgba(0, 0, 0, 0) 100%
    );
    background-size: ${`100% calc(${h5.size} * ${h5.lineHeight})`};
  }
  ${breakpoint.md} {
    padding-top: 28px;
    padding-bottom: 40px;
    padding-left: 40px;
    padding-right: 40px;
    font-size: ${h3.size};
    line-height: ${h3.lineHeight};
    font-weight: ${h3.weight};
    p {
      background-size: ${`100% calc(${h3.size} * ${h3.lineHeight})`};
    }
  }
`

const SecondText = styled(Text)`
  color: ${text.secondary};
`
const Subtitle = styled.h2<{ candidateId: string }>`
  ${defaultPadding};
  ${MaxWidth}
  font-size: ${h3.size};
  line-height: ${h3.lineHeight};
  font-weight: ${h3.weight};
  margin-bottom: 20px;
  margin-top: 40px;
  color: ${(props) =>
    candidates[props.candidateId as keyof typeof candidates].text};
  span {
    display: block;
  }
`

const formatImagePath = (value: string): any => {
  const device = {
    mobile: 'mobile',
    tablet: 'tablet',
    desktop: 'desktop',
  }

  const arr = Object.entries(device)
  const arrWebP = Object.entries(device).map((item) => {
    item[0] = `${item[0]}WebP`
    return item
  })
  const arrayWithWebP = arr.concat(arrWebP)
  arrayWithWebP.map((item) => {
    const isWebP = item[0].includes('WebP')
    item[1] = `${imagePrefix}/images/article/${value}-${item[1]}.${
      isWebP ? 'webp' : 'jpeg'
    }`

    return item
  })

  const imageSrc = arrayWithWebP.reduce((item, [key, value]) => {
    item[key] = value
    return item
  }, {} as Record<string, string>)
  return imageSrc
}

const parseArticleContent = (
  content: ArticleContentType,
  name: string,
  id: string,
  shouldActiveParallaxScrolling: boolean
) => {
  const renderItem = (item: ArticleContentItem) => {
    switch (item.type) {
      case 'intro':
        return (
          <Intro>
            {item.value.map((i, index) => (
              <p key={index}>{i}</p>
            ))}
          </Intro>
        )
      case 'subtitle':
        return (
          <Subtitle candidateId={id}>
            {item.value.map((i, index) => (
              <span key={index}>{i}</span>
            ))}
          </Subtitle>
        )
      case 'text':
        return <ArticleMainText value={item.value}></ArticleMainText>
      case 'second-text':
        return <SecondText>{item.value}</SecondText>
      case 'image':
        const { value, imageOption } = item
        const imagesSrc = formatImagePath(value)
        const shouldParallaxScrolling =
          imageOption.isFullSizeImage &&
          !imageOption?.shouldRespectImageWightAndHeight
        return (
          <>
            {shouldParallaxScrolling ? (
              <ArticleImageParallaxScrolling
                imagesSrc={imagesSrc}
                imageCaption={imageOption?.imageCaption}
                shouldActiveParallaxScrolling={shouldActiveParallaxScrolling}
              ></ArticleImageParallaxScrolling>
            ) : (
              <ArticleImage
                name={name}
                type="content"
                imagesSrc={imagesSrc}
                imageCaption={imageOption?.imageCaption}
                isFullSizeImage={imageOption.isFullSizeImage}
                shouldRespectImageWightAndHeight={
                  imageOption?.shouldRespectImageWightAndHeight
                }
              ></ArticleImage>
            )}
          </>
        )
      // return (
      //   <ArticleImage
      //     name={name}
      //     type="content"
      //     imagesSrc={imagesSrc}
      //     imageCaption={item.imageOption?.imageCaption}
      //     isFullSizeImage={item.imageOption.isFullSizeImage}
      //     shouldRespectImageWightAndHeight={
      //       item.imageOption?.shouldRespectImageWightAndHeight
      //     }
      //   ></ArticleImage>
      // )
      default:
        return null
    }
  }
  return content.map((contentItem) => renderItem(contentItem))
}

type ArticleContentProps = {
  content: ArticleContentType
  name: string
  id: string
  shouldActiveParallaxScrolling?: boolean
  children: React.ReactNode
}

export default function ArticleContent({
  content,
  name = '',
  id,
  shouldActiveParallaxScrolling = false,
  children,
}: ArticleContentProps): JSX.Element {
  const contentJsx = parseArticleContent(
    content,
    name,
    id,
    shouldActiveParallaxScrolling
  )
  return (
    <Wrapper>
      {children}
      {contentJsx}
    </Wrapper>
  )
}
