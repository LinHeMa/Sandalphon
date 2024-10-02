import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ScrollTop from '~/public/icon/scroll-top-arrow.svg'
import { breakpoint, zIndex, color } from '~/styles/theme'

const Button = styled.button`
  border-radius: 50%;
  box-shadow: 1px 1px 3px 0px hsla(0, 0%, 0%, 0.15);
  width: 36px;
  height: 36px;
  background: ${color.scrollToTopBtnBg};
  position: fixed;
  top: calc(100vh - 100px);
  right: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex.coverContent};

  ${breakpoint.md} {
    right: 35px;
  }
  ${breakpoint.xl} {
    right: 48px;
  }
`

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const screenHeight = window.innerHeight

      if (scrollTop > screenHeight / 2) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button onClick={scrollToTop}>
          <ScrollTop />
        </Button>
      )}
    </>
  )
}
