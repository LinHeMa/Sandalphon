import { css } from 'styled-components'
import { breakpoint, color } from '~/styles/theme'

export const defaultBlockStyle = css`
  font-family: 'Noto Sans TC';
  width: 100%;
  margin: auto;
  padding: 30px 20px;
  max-width: 960px;
  color: ${color.text.normal};

  ${breakpoint.md} {
    padding: 30px 60px;
  }
  ${breakpoint.xl} {
    padding: 30px 0px;
  }

  h1 {
    font-size: 32px;
    line-height: 1.8;
    font-weight: 900;
    text-align: center;
    margin: 20px auto 30px auto;
    font-family: 'Noto Serif TC', serif;
    font-weight: 900;
    color: ${color.text.title};

    ${breakpoint.md} {
      font-size: 30px;
    }

    ${breakpoint.xl} {
      margin: 40px auto;
    }
  }

  .shared-content-block {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
    text-align: justify;
    word-break: break-all;
    color: ${color.text.normal};

    ${breakpoint.md} {
      font-size: 20px;
    }
    ${breakpoint.xl} {
      font-size: 18px;
    }
  }
`
