import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { breakpoint, color } from '~/styles/theme'
import { useNavLists } from '~/contexts/nav-list'

const Wrapper = styled.div`
  display: none;

  ${breakpoint.md} {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-right: 25px;
  }

  ${breakpoint.xl} {
    gap: 10px;
    margin-right: 30px;
  }
`

const Item = styled.li<{ show: boolean }>`
  font-family: Noto Sans TC;
  font-size: 16px;
  font-weight: 700;
  line-height: 29px;
  text-align: center;
  list-style: none;
  color: ${color.white};
  background: ${color.navListItemColor};
  padding: 3.5px 8px;
  border-radius: 4px;
  cursor: pointer;
  display: ${({ show }) => (show ? 'block' : 'none')};

  ${breakpoint.xl} {
    font-size: 20px;
    line-height: 36px;
    padding: 0px 10px;
  }
`

export default function NavLists() {
  const navLists = useNavLists()

  return (
    <Wrapper>
      {navLists?.map((item, index) => {
        if (!item.show) {
          return null
        }

        return (
          <Link key={index} href={item.href} scroll={false}>
            <Item show={item.show}>{item.title}</Item>
          </Link>
        )
      })}
    </Wrapper>
  )
}
