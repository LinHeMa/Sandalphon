import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

import { zIndex, breakpoint, color } from '~/styles/theme'
import MediaIcons from '~/components/sidebar/media-icons'
import { ToggleIcon } from '~/components/sidebar/toggle-icon'
import { sideBarBgColor, sideBarTextColor } from '~/config'
import { useNavLists } from '~/contexts/nav-list'

const SideMenuWrapper = styled.nav<{ show: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: ${sideBarBgColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  visibility: ${(prop) => (prop.show ? 'visible' : 'hidden')};
  transform: ${(prop) => (prop.show ? 'translateX(0px)' : 'translateX(375px)')};
  transition: 0.4s cubic-bezier(0.8, 0, 0.2, 1);
  z-index: ${zIndex.top};

  @media (min-width: 375px) {
    transform: ${(prop) =>
      prop.show ? 'translateX(0px)' : 'translateX(767px)'};
  }

  ${breakpoint.md} {
    display: none;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 88px 0px 80px;
  gap: 25px;
`

const MenuList = styled.li`
  color: ${sideBarTextColor};
  font-family: 'Noto Serif TC', serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: 1px;
  text-align: center;
  list-style: none;

  &:hover {
    color: ${color.sidebarTextHover};
    text-decoration-thickness: 1px;
    transition: all 0.2s ease;
  }
`

const ToggleButton = styled.div<{ show: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: fixed;
  top: 12px;
  right: 12px;
  background: ${color.sidebarToggleButton};
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: calc(${zIndex.top} + 10);

  svg {
    max-width: 28px;
    transform: ${(prop) => (prop.show ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition-duration: 0.3s;
  }

  .highlight {
    fill: none;
    stroke-width: 3;
    stroke: #491ec4;
  }

  ${breakpoint.md} {
    display: none;
  }
`

export default function SideMenu() {
  const navLists = useNavLists()

  const [show, setShow] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [href, setHref] = useState('')

  useEffect(() => {
    setHref(() => window.location.href)
  }, [])

  const sideMenuRef = useRef(null)

  useEffect(() => {
    if (sideMenuRef && sideMenuRef.current) {
      const lightBox = sideMenuRef.current
      if (show) {
        disableBodyScroll(lightBox)
      } else {
        enableBodyScroll(lightBox)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [show])

  const contentLists = navLists.map((item, index) => {
    if (!item.show) {
      return null
    }

    return (
      <Link
        key={index}
        href={item.href}
        scroll={false}
        onClick={() => {
          setShow(!show)
        }}
      >
        <MenuList>{item.title}</MenuList>
      </Link>
    )
  })

  return (
    <>
      <ToggleButton
        onClick={(e) => {
          e.preventDefault()
          setShow(!show)
        }}
        show={show}
      >
        <ToggleIcon pathColor={sideBarTextColor} />
      </ToggleButton>

      <SideMenuWrapper
        show={show}
        onClick={() => {
          setShow(!show)
        }}
      >
        <ContentWrapper ref={sideMenuRef}>{contentLists}</ContentWrapper>
        <MediaIcons />
      </SideMenuWrapper>
    </>
  )
}
