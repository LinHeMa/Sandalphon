import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { zIndex, color, breakpoint } from '~/styles/theme'
import MirrorMediaIcon from '~/public/icon/mirror-media-icon.svg'
import Sidebar from '~/components/sidebar'
import NavLists from '~/components/layout/nav-lists'
import SocialIcon from '../sidebar/media-icons'

const HeaderWrapper = styled.div<{ isVisible: boolean }>`
  width: 100%;
  height: 53px;
  padding: 12px 12px 12px 20px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${color.background};
  z-index: ${zIndex.header};

  ${breakpoint.md} {
    transition: transform 0.2s ease-in-out;
    transform: translateY(${({ isVisible }) => (isVisible ? '0' : '-100%')});
  }

  ${breakpoint.xl} {
    padding: 0px 28px;
    height: 76px;
  }

  .mirror-media-icon {
    width: 68px;
    height: 29px;
    display: block;

    ${breakpoint.xl} {
      width: 107px;
      height: 46px;
    }
  }
`

const Aside = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const SocialIconWrapper = styled.div`
  display: none;

  ${breakpoint.md} {
    display: block;
    padding-top: 5px;
  }
`

export default function Header(): JSX.Element {
  const [isVisible, setIsVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])
  return (
    <HeaderWrapper isVisible={isVisible}>
      <Link
        href="https://www.mirrormedia.mg/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="mirror-media-icon"
      >
        <MirrorMediaIcon />
      </Link>

      <Aside>
        <NavLists />
        <Sidebar />
        <SocialIconWrapper>
          <SocialIcon />
        </SocialIconWrapper>
      </Aside>
    </HeaderWrapper>
  )
}
