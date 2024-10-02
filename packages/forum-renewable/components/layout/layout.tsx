import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import ScrollToTopButton from '../scroll-to-top-button'

type LayoutProps = {
  children: React.ReactNode
}
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ScrollToTopButton />
      <Footer />
    </>
  )
}
