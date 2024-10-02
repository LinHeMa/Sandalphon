import React, { useEffect, useMemo } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styled, { css } from 'styled-components'
import { breakpoint } from '~/styles/theme'
import RowSpeakerLists from '~/components/schedule/row-speaker-lists'
import { parseSpeakersByType, checkHaveSpeakers } from '~/utils'
import type { ScheduleItem } from '~/types'

const oddStyle = css`
  margin-left: auto;
  padding: 20px;

  ${breakpoint.sm} {
    padding: 20px 40px 20px 0px;
  }
  ${breakpoint.xl} {
    padding: 30px 180px 30px 0px;
  }
`
const evenStyle = css`
  margin-right: auto;
  padding: 20px;

  ${breakpoint.sm} {
    padding: 20px 0px 20px 40px;
  }
  ${breakpoint.xl} {
    padding: 30px 0px 30px 150px;
  }
`

const CustomMotionDiv = styled(motion.div)<CustomMotionDivProps>`
  order: ${(props) => props.order};
  width: 90%;
  font-size: 16px;

  & + div {
    margin-top: 15px;
  }

  ${breakpoint.sm} {
    width: 80%;
  }

  ${breakpoint.md} {
    width: 65%;
  }
  ${breakpoint.xl} {
    width: 85%;

    & + div {
      margin-top: 20px;
    }
  }
`

const RowContent = styled.div<{ isOrderOdd: boolean }>`
  line-height: 1.5;
  letter-spacing: 1.4px;
  max-width: 300px;
  ${(props) => (props.isOrderOdd ? oddStyle : evenStyle)};

  ${breakpoint.xl} {
    width: 80%;
    display: flex;
    align-items: flex-start;
    justify-content: ${(props) =>
      props.isOrderOdd ? 'flex-end' : 'flex-start'};
    max-width: none;
    gap: 80px;
  }

  .time {
    font-weight: 700;
    word-break: break-all;

    ${breakpoint.xl} {
      max-width: 200px;
    }

    & + * {
      margin-top: 10px;

      ${breakpoint.xl} {
        margin-top: 0px;
      }
    }
  }

  .topic {
    font-family: 'Noto Serif TC', serif;
    word-break: break-all;

    ${breakpoint.xl} {
      max-width: 300px;
    }

    & + * {
      margin-top: 15px;

      ${breakpoint.xl} {
        margin-top: 0px;
      }
    }
  }
`

type CustomMotionDivProps = {
  order: string
  content: ScheduleItem
}
//FIXME: 目前 children 一定要傳，需改成不傳入也可以
export default function RowMotion({
  order,
  content = { topic: '', time: '', speakersInfo: '', instruction: '' },
}: CustomMotionDivProps): JSX.Element {
  const { topic, time, speakersInfo } = content
  const formattedSpeakers = parseSpeakersByType(speakersInfo)

  const isOrderOdd = Boolean(parseInt(order) % 2 === 1)

  const controls = useAnimation()
  const [ref, inView] = useInView()

  const variants = useMemo(
    () => ({
      left: { x: -100, opacity: 0 },
      right: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5, bounce: 0.1 } },
    }),
    []
  )

  const direction = isOrderOdd ? 'left' : 'right'

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.set(direction === 'left' ? variants.left : variants.right)
    }
  }, [controls, inView, direction, variants])

  //Error Handle
  const shouldShowTime = Boolean(typeof time !== 'string' || time.trim())
  const shouldShowTopic = Boolean(typeof topic !== 'string' || topic.trim())

  return (
    // FIXME: 目前 typescript 設定還有問題
    //@ts-ignore
    <CustomMotionDiv
      className="row-motion"
      ref={ref}
      order={order}
      initial={direction}
      animate={controls}
      variants={variants}
      whileHover={{ scale: 1.03 }}
    >
      <RowContent className="row-content" isOrderOdd={isOrderOdd}>
        {shouldShowTime && <p className="time">{time}</p>}

        {shouldShowTopic && <p className="topic">{topic}</p>}

        {checkHaveSpeakers(formattedSpeakers) && (
          <RowSpeakerLists speakerLists={formattedSpeakers} />
        )}
      </RowContent>
    </CustomMotionDiv>
  )
}
