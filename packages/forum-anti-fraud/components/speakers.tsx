import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from '~/components/shared/content-block'
import Image from '@readr-media/react-image'
import { imagePrefix } from '~/config'
import type { GenericSpeaker } from '~/types'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const SpeakerLists = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 50px;
`

const SpeakerItem = styled.div`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
`

const HeadPhoto = styled.div`
  display: block;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
`

const Title = styled.h2`
  font-family: Noto Sans TC;
  font-size: 24px;
  font-weight: 700;
  line-height: 43.2px;
  text-align: center;
  margin: 40px auto;
  line-height: 1.6;
  letter-spacing: 3px;
`

const Description = styled(ContentBlock)`
  line-height: 1.8;
  text-align: left;
`

type SpeakersProps = {
  speakers: GenericSpeaker[]
}
export default function Speakers({
  speakers = [],
}: SpeakersProps): JSX.Element | null {
  const speakerLists = speakers.map((speaker: GenericSpeaker, index) => {
    const formattedImgUrl = {
      original: speaker.image,
    }

    return (
      <SpeakerItem key={index}>
        <HeadPhoto>
          <Image
            images={formattedImgUrl}
            defaultImage={`${imagePrefix}/images/default-head-shot.svg`}
            alt={speaker.name}
            objectFit={'cover'}
            priority={true}
          />
        </HeadPhoto>
        <Title>{speaker.name}</Title>

        <Description content={speaker.description} />
      </SpeakerItem>
    )
  })

  //Error Handle
  const shouldShowJSX = Boolean(Array.isArray(speakers) && speakers.length > 0)

  if (!shouldShowJSX) {
    return null
  }

  return (
    <Wrapper id="speakers">
      <h1>與會陣容</h1>
      <SpeakerLists>{speakerLists}</SpeakerLists>
    </Wrapper>
  )
}
