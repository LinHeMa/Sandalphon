import React from 'react'
import styled from 'styled-components'

const SpeakerItem = styled.div`
  & + div {
    margin-top: 8px;
  }

  .speaker-name {
    font-weight: 900;
    font-size: 16px;
    font-family: 'Noto Serif TC', serif;
  }
  .speaker-title {
    font-size: 14px;
  }
`

type SpeakerItemProps = {
  name: string
  titles: string[]
}
export default function RowSpeakerItem({
  name,
  titles,
}: SpeakerItemProps): JSX.Element {
  const speakerTitles = titles?.map((title, index) => (
    <p className="speaker-title" key={index}>
      {title}
    </p>
  ))

  return (
    <SpeakerItem>
      <p className="speaker-name">{name}</p>
      {speakerTitles}
    </SpeakerItem>
  )
}
