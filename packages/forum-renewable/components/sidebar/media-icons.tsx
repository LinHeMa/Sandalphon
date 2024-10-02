import React from 'react' // eslint-disable-line
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import CopyAlert from './copy-alert'

import FbIcon from '~/public/icon/fb.svg'
import LineIcon from '~/public/icon/line.svg'
import LinkIcon from '~/public/icon/link.svg'

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a,
  button {
    margin: 0px 4px;
  }
`

export default function SocialIcon() {
  const [href, setHref] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(href)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 2000)
  }

  useEffect(() => {
    setHref(() => window.location.href)
  }, [])

  return (
    <IconWrapper>
      <a
        href={`https://www.facebook.com/share.php?u=${href}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="點擊後分享此網站連結至Facebook"
      >
        <FbIcon />
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${href}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="點擊後分享此網站連結至Line"
      >
        <LineIcon />
      </a>
      <button
        disabled={showAlert}
        onClick={handleCopy}
        aria-label="點擊後複製此網站連結至剪貼簿"
      >
        <LinkIcon />
      </button>
      <CopyAlert showAlert={showAlert} />
    </IconWrapper>
  )
}
