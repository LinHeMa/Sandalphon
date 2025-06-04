import React from 'react'
import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import { ScheduleItem } from '~/types'
import { parseSpeakersByType } from '~/utils'

const ForumAgendaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
  border-radius: 10px;
  ${breakpoint.md} {
    padding: 30px 60px;
  }
  ${breakpoint.lg} {
    padding: 30px 60px;
  }
`
const AgendaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-width: 100%;
`
const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Bar = styled(Row)`
  width: 100%;
  height: 48px;
  background: #01678a;
  border-radius: 10px 10px 0 0;
`
const SectionTitle = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #01678a;
  background-color: #f2f2f2;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  line-height: 24px;
  ${breakpoint.lg} {
    font-family: Noto Sans TC;
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    text-align: center;
  }
`
const AgendaItem = styled(Row)`
  background: #3f5c85;
  opacity: 0.6;
  flex-direction: column;
  padding: 24px 22px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #d6d6d6;
  }
  &:last-of-type {
    border-radius: 0px 0px 10px 10px;
  }

  ${breakpoint.md} {
    flex-direction: row;
    padding: 28px 24px;
  }
`

const DateColumn = styled(Row)`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  justify-content: start;
  margin-bottom: 12px;
  color: #a1e5e7;
  ${breakpoint.md} {
    place-self: start;
    flex-direction: column;
    align-items: start;
    font-size: 18px;
    font-weight: 700;
    line-height: 27px;
  }
  ${breakpoint.lg} {
    flex-direction: row;
    font-family: Noto Sans TC;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    text-align: center;
  }
`
const TopicColumn = styled(Row)`
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  justify-content: start;
  color: #ffffff;
  ${breakpoint.md} {
    display: none;
  }
  ${breakpoint.lg} {
    display: flex;
    place-self: start;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    padding-right: 115px;
  }
`
const TopicColumnTablet = styled(TopicColumn)`
  display: none;
  ${breakpoint.md} {
    display: flex;
    padding-right: 78px;
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    margin-top: 8px;
  }
  ${breakpoint.lg} {
    display: none;
  }
`

const SpeakerInfoColumn = styled(Row)`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  color: #ffffff;
`
const SpeakerType = styled(Row)`
  font-family: Noto Sans TC;
  color: #a1e5e7;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  justify-content: start;
  ${breakpoint.md} {
    font-family: Noto Sans TC;
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    text-align: left;
    margin-bottom: 4px;
  }
`
const SpeakerBlock = styled(Row)`
  flex-direction: column;
  margin: 4px 0;
`

const SpeakerName = styled(Row)`
  font-family: Noto Sans TC;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  justify-content: start;
  color: #a1e5e7;
  ${breakpoint.md} {
    font-family: Noto Sans TC;
    font-size: 16px;
    font-weight: 900;
    line-height: 24px;
    text-align: left;
  }
`

const SpeakerTitle = styled(Row)`
  font-family: Noto Sans TC;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  justify-content: start;
  color: #a1e5e7;
  ${breakpoint.md} {
    font-family: Noto Sans TC;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    text-align: left;
  }
`

const ForumAgenda = ({ agendaData }: { agendaData: ScheduleItem[] }) => {
  return (
    <ForumAgendaWrapper>
      <AgendaWrapper>
        <Bar />
        {agendaData.map((item, idx) => {
          {
            if (item.time) {
              return (
                <AgendaItem key={idx}>
                  <DateColumn>
                    {item.time}
                    <TopicColumnTablet>{item.topic}</TopicColumnTablet>
                  </DateColumn>
                  <TopicColumn>{item.topic}</TopicColumn>
                  <SpeakerInfoColumn>
                    {parseSpeakersByType(item.speakersInfo).map((item) => (
                      <>
                        <SpeakerType>{item.type}</SpeakerType>
                        {item.speakers.map((man) => (
                          <SpeakerBlock key={man.name + man.title}>
                            {man.title.map((title) => (
                              <SpeakerName key={title}>{title}</SpeakerName>
                            ))}
                            <SpeakerTitle>{man.name}</SpeakerTitle>
                          </SpeakerBlock>
                        ))}
                      </>
                    ))}
                  </SpeakerInfoColumn>
                </AgendaItem>
              )
            } else {
              return <SectionTitle>{item.topic}</SectionTitle>
            }
          }
        })}
      </AgendaWrapper>
    </ForumAgendaWrapper>
  )
}

export default ForumAgenda
