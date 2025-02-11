import styled from 'styled-components'

import { breakpoint, color } from '~/styles/theme'

const Wrapper = styled.div`
  width: 100%;
  background: ${color.background};
  color: ${color.text.normal};
`
const TextGroup = styled.div`
  margin: auto;
  padding: 25px 20px 50px;
  max-width: 960px;
  text-align: center;
  line-height: 1.6;
  font-size: 10px;
  font-weight: 400;

  ${breakpoint.md} {
    padding: 25px 60px;
  }
  ${breakpoint.xl} {
    border-top: 4px solid ${color.border};
    padding: 10px 0px 35px;
  }
`

export default function Registration(): JSX.Element {
  return (
    <Wrapper>
      <TextGroup>
        <p>精鏡傳媒股份有限公司 版權所有</p>
        <p>
          Copyright © 2024 Mirror Media All rights reserved
          本網站圖文非經本社同意不得刊載
        </p>
      </TextGroup>
    </Wrapper>
  )
}
