import styled from 'styled-components'
import { defaultBlockStyle } from '~/styles/shared-style'
import { breakpoint } from '~/styles/theme'
import type { GenericPartners } from '~/types'
import Image from '@readr-media/react-image'
import { imagePrefix } from '~/config'
import { removeEmptyLogo, checkAllImagesEmpty } from '~/utils'

const Wrapper = styled.div`
  ${defaultBlockStyle}
`
const LogosWrapper = styled.div`
  max-width: 425px;
  margin: auto;

  ${breakpoint.xl} {
    max-width: 720px;
  }
`

const LogoType = styled.h2`
  font-family: Noto Sans TC;
  font-size: 20px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  margin: 25px auto 15px;
`

const LogosImage = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  .readr-media-react-image {
    max-width: 192px;
    max-height: 60px;
    height: 60px;
    width: auto;
  }
`

type PartnersProps = {
  partners: GenericPartners
}
export default function Partners({
  partners = {
    主辦單位: [],
    指導單位: [],
    合作單位: [],
    贊助單位: [],
  },
}: PartnersProps): JSX.Element | null {
  // Error Handle：(1)檢查是否所有單位類型都是空陣列 (=Excel上無填寫任何單位），是的話返回null
  const isEmptyPartners = Object.values(partners).every(
    (partner) => !partner.length
  )
  // Error Handle：(2)檢查是否所有單位的 image 欄位值都是空字串（‘’），是的話返回 null
  const isAllImageEmpty = checkAllImagesEmpty(partners)

  if (isEmptyPartners || isAllImageEmpty) {
    return null
  }

  function renderLogoByType(type: string) {
    const logoList = removeEmptyLogo(partners[type])

    if (!logoList?.length) {
      return null
    }

    return (
      <>
        <LogoType>{type}</LogoType>
        <LogosImage>
          {logoList?.map((logo, index) => (
            <Image
              key={index}
              images={{ original: logo.image }}
              alt={`sponsor-logo ${index}`}
              objectFit={'contain'}
              priority={true}
              defaultImage={`${imagePrefix}/images/default-partner-bg.svg`}
            />
          ))}
        </LogosImage>
      </>
    )
  }

  return (
    <Wrapper id="partners">
      <h1>共同推動</h1>
      <LogosWrapper>
        {renderLogoByType('主辦單位')}
        {renderLogoByType('指導單位')}
        {renderLogoByType('合作單位')}
        {renderLogoByType('贊助單位')}
      </LogosWrapper>
    </Wrapper>
  )
}
