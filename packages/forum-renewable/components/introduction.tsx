import styled from 'styled-components'
import { breakpoint } from '~/styles/theme'
import { defaultBlockStyle } from '~/styles/shared-style'
import ContentBlock from './shared/content-block'
import Image from '@readr-media/react-image'
import { imagePrefix } from '~/config'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`

const Content = styled.div`
  display: block;

  ${breakpoint.xl} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    gap: 60px;
  }
`

const QRCode = styled.div<{ shouldShowQRCode: boolean }>`
  display: ${({ shouldShowQRCode }) => (shouldShowQRCode ? 'block' : 'none')};
  width: 184px;
  height: 184px;
  min-width: 184px;
  margin: auto;

  & + .intro-text {
    margin-top: 30px;
  }

  ${breakpoint.md} {
    & + .intro-text {
      margin-top: 40px;
    }
  }

  ${breakpoint.xl} {
    & + .intro-text {
      margin: 0px;
    }
  }
`

const IntroText = styled.div<{ shouldShowText: boolean }>`
  display: ${({ shouldShowText }) => (shouldShowText ? 'block' : 'none')};
`

type IntroProps = {
  introText?: string
  qrCodeSrc?: string
}
export default function Introduction({
  introText = '',
  qrCodeSrc = '',
}: IntroProps): JSX.Element | null {
  // Error Handle
  const shouldShowText = Boolean(
    typeof introText !== 'string' || introText.trim()
  )
  const shouldShowQRCode = Boolean(
    typeof qrCodeSrc !== 'string' || qrCodeSrc.trim()
  )

  if (!shouldShowText && !shouldShowQRCode) {
    return null
  }

  return (
    <Wrapper id="introduction">
      <h1>論壇簡介</h1>
      <Content>
        <QRCode shouldShowQRCode={shouldShowQRCode}>
          <Image
            images={{ original: qrCodeSrc }}
            objectFit={'contain'}
            priority={true}
            defaultImage={`${imagePrefix}/images/default-qrcode-bg.svg`}
            alt="qr-code"
          />
        </QRCode>

        <IntroText shouldShowText={shouldShowText} className="intro-text">
          <ContentBlock content={introText} />
        </IntroText>
      </Content>
    </Wrapper>
  )
}
