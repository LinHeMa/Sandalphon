import { useEffect } from 'react'
import { GlobalStyles } from '../styles/global-style'
import type { AppProps } from 'next/app'
import TagManager from 'react-gtm-module'
import { GTM_ID } from '~/config'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_ID })
  }, [])

  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
