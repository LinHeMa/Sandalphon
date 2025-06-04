import React, { createContext, useContext } from 'react'
import { NavItem } from '~/types'

const defaultValue: NavItem[] = []
const NavListsContext = createContext(defaultValue)

type NavListsProviderProps = {
  children: React.ReactNode
  navLists: NavItem[]
}

export const NavListsProvider = ({
  children,
  navLists,
}: NavListsProviderProps) => (
  <NavListsContext.Provider value={navLists}>
    {children}
  </NavListsContext.Provider>
)

export const useNavLists = () => useContext(NavListsContext)
