import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from '~/components/shared/content-block'
import { color, breakpoint } from '~/styles/theme'
import Link from 'next/link'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
`
const ApplyButton = styled.div`
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  background-color: #e46868;
  color: ${color.white};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  padding: 12px;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid #000000;

  ${breakpoint.xl} {
    font-size: 20px;
    line-height: 30px;
  }
`

type RegistrationProps = {
  content: string
}
export default function Registration({
  content,
}: RegistrationProps): React.JSX.Element | null {
  //Error Handle
  const shouldShowJsx = Boolean(typeof content !== 'string' || content.trim())
  if (!shouldShowJsx) {
    return null
  }

  return (
    <Wrapper id="registration">
      <h1>報名資訊</h1>
      <ContentBlock content={content} />
      <ButtonWrapper>
        <Link
          href={'https://readr.oen.tw/events/2y7PRrsRFdVC4TRGJaE1A1AbtAG'}
          passHref
        >
          <ApplyButton>信用卡報名</ApplyButton>
        </Link>
        <Link
          href={
            'https://docs.google.com/forms/d/e/1FAIpQLSdn_Ni185Os7EbObEi1M0Kw8x7kLp0WCiH1CzxV7wO8gjRiyQ/viewform?usp=dialog'
          }
          passHref
        >
          <ApplyButton>匯款報名</ApplyButton>
        </Link>
      </ButtonWrapper>
    </Wrapper>
  )
}
