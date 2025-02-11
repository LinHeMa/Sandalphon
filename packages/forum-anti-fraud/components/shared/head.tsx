import Head from 'next/head'
import { staticFileDestination } from '~/config'
import { useRouter } from 'next/router'

const SITE_TITLE = '鏡週刊 Mirror Media'
const FB_APP_ID = '175313259598308'
const FB_PAGE_ID = '1855418728011324'

type OGProperties = {
  url: string
  title: string
  type: string
  description: string
  site_name: string
  image: {
    type: string
    url: string
    width: string
    height: string
  }
  card: string
  fbAppId: string
  fbPageId: string
}

const OpenGraph = ({ properties }: { properties: OGProperties }) => {
  const {
    url,
    site_name,
    title,
    description,
    image,
    card = 'summary_large_image',
    fbAppId,
    fbPageId,
  } = properties

  return (
    <>
      <meta property="og:locale" content="zh_TW" key="og:locale" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" key="og:type" />
      <meta
        property="og:description"
        content={description || ''}
        key="og:description"
      />
      <meta property="og:site_name" content={site_name} key="og:site_name" />
      {image && (
        <>
          <meta property="og:image" content={image.url} key="og:image" />
          <meta
            property="og:image:secure_url"
            content={image.url.replace('http://', 'https://')}
            key="og:image:secure_url"
          />
          <meta
            property="og:image:width"
            content={image.width}
            key="og:image:width"
          />
          <meta
            property="og:image:height"
            content={image.height}
            key="og:image:height"
          />
          <meta
            property="og:image:type"
            content={image.type}
            key="og:image:type"
          />
          <meta name="twitter:image" content={image.url} key="twitter:image" />
        </>
      )}
      <meta property="fb:app_id" content={fbAppId} />
      <meta property="fb:pages" content={fbPageId} />
      <meta name="twitter:card" content={card} key="twitter:card" />
      <meta name="twitter:url" content={url} key="twitter:url" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description || ''}
        key="twitter:description"
      />
    </>
  )
}

type CustomHeadProps = {
  title: string
  description: string
  imageUrl: string
}
export default function CustomHead(props: CustomHeadProps) {
  const router = useRouter()
  const currentPath = router.asPath
  const url = `${staticFileDestination}${
    currentPath === '/' ? '' : currentPath
  }`

  const siteInformation = {
    title: props.title ? `${props.title} - ${SITE_TITLE}` : SITE_TITLE,
    description: props.description ?? '',
    site_name: SITE_TITLE,
    url: url,
    type: 'website',
    image: {
      width: '1200',
      height: '630',
      type: 'images/jpeg',
      url: `${staticFileDestination}${props.imageUrl}`,
    },
    card: 'summary_large_image',
    fbAppId: FB_APP_ID,
    fbPageId: FB_PAGE_ID,
  }

  return (
    <Head>
      <title key="title">{siteInformation.title}</title>
      <meta
        name="description"
        content={siteInformation.description}
        key="description"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${staticFileDestination}/apple-touch-icon.png`}
      />

      <link
        rel="icon"
        type="image/x-icon"
        href={`${staticFileDestination}/favicon.ico`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${staticFileDestination}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${staticFileDestination}/favicon-16x16.png`}
      />
      <link
        rel="mask-icon"
        href={`${staticFileDestination}/safari-pinned-tab.svg`}
        color="#5bbad5"
      />

      <OpenGraph properties={siteInformation} />

      <meta name="application-name" content={siteInformation.title} />
    </Head>
  )
}
