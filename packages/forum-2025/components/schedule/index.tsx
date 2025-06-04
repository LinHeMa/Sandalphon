import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import type { ScheduleItem } from '~/types'
import ForumAgenda from './forum-agenda'

const Wrapper = styled.div`
  ${defaultBlockStyle}
  padding: 30px 0px;
  max-width: none;

  ${breakpoint.md} {
    padding: 30px 0px;
  }

  ${breakpoint.xl} {
    max-width: none;
  }
`

// const RowContainer = styled.div`
//   width: 100%;
//   padding: 20px 0px;
//   overflow: hidden;

//   .row-motion:nth-child(even) {
//     background: ${color.secondary};
//     border-radius: 20px 0px 0px 20px;
//     margin-left: auto;
//     border: 2px solid ${color.border};
//     border-right: none;
//   }

//   .row-motion:nth-child(odd) {
//     background: ${color.primary};
//     border-radius: 0px 20px 20px 0px;
//     margin-right: auto;
//     border: 2px solid ${color.border};
//     border-left: none;
//   }
// `

type ScheduleProps = {
  content: ScheduleItem[]
}
export default function Schedule({
  content = [],
}: ScheduleProps): React.JSX.Element | null {
  //Error Handle
  const shouldShowJSX = Boolean(Array.isArray(content) && content.length > 0)

  if (!shouldShowJSX) {
    return null
  }

  return (
    <Wrapper id="schedule">
      <h1>論壇議程</h1>
      <ForumAgenda agendaData={content} />
    </Wrapper>
  )
}
