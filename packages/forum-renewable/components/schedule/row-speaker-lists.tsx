import React from 'react'
import styled from 'styled-components'
import SpeakerItem from '~/components/schedule/row-speaker-item'
import { breakpoint, color } from '~/styles/theme'
import type { FormattedSpeaker, RowSpeakerItem } from '~/types'

const SpeakersWrapper = styled.div`
  max-width: 300px;

  ${breakpoint.xl} {
    min-width: 120px;
    max-width: 230px;
  }
`

const TypeGroup = styled.div`
  & + * {
    margin-top: 20px;
  }
`
const SpeakerType = styled.div`
  color: ${color.gray};
  margin-bottom: 8px;
  font-size: 14px;
`

type SpeakersProps = {
  speakers: FormattedSpeaker[]
}
const Speakers: React.FC<SpeakersProps> = ({ speakers }) => {
  return (
    <>
      {speakers.map((item) => (
        <SpeakerItem name={item.name} titles={item.title} key={item.name} />
      ))}
    </>
  )
}

type RowSpeakerProps = {
  speakerLists: RowSpeakerItem[]
}
export default function RowSpeakerLists({
  speakerLists,
}: RowSpeakerProps): JSX.Element {
  return (
    <SpeakersWrapper>
      {speakerLists.map((item, index) => {
        return (
          <TypeGroup key={index}>
            {item.type && <SpeakerType>{item.type}</SpeakerType>}
            <Speakers speakers={item.speakers} />
          </TypeGroup>
        )
      })}
    </SpeakersWrapper>
  )
}
