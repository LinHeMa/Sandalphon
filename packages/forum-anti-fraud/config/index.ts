// 這裡管理的是在 Build 階段就會寫死數值的環境變數。
// .env.local 中的變數，僅能在 sever-side 階段取用。但以 `NEXT_PUBLIC_` 開頭命名者，可在 client-side 階段取用。
const env: string = String(process.env.NEXT_PUBLIC_ENV)
const projectName: string = String(process.env.NEXT_PUBLIC_PROJECT_NAME)

// JSON 設定
const JSON_URL: string =
  process.env.NEXT_PUBLIC_DATA_JSON ||
  'https://v3-statics.mirrormedia.mg/json/forum2023.json'

// OpenGraph 設定
const OG_TITLE: string = process.env.NEXT_PUBLIC_OG_TITLE || ''
const OG_DESC: string = process.env.NEXT_PUBLIC_OG_DESC || ''
const OG_IMAGE_URL: string = process.env.NEXT_PUBLIC_OG_IMAGE_URL || ''

// Color 設定
const primaryColor: string = process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#E2FBFE'
const secondaryColor: string =
  process.env.NEXT_PUBLIC_SECONDARY_COLOR || '#E2FBFE'
const navListItemColor: string =
  process.env.NEXT_PUBLIC_NAV_LIST_ITEM_COLOR || '#ffffff'
const backgroundColor: string = process.env.NEXT_PUBLIC_BG_COLOR || '#BBD4DA'
const titleColor: string = process.env.NEXT_PUBLIC_TITLE_COLOR || '#000000'
const textColor: string = process.env.NEXT_PUBLIC_TEXT_COLOR || '#000000'
const borderColor: string = process.env.NEXT_PUBLIC_BORDER_COLOR || '#000000'
const sideBarBgColor: string =
  process.env.NEXT_PUBLIC_SIDEBAR_BG_COLOR || 'rgba(11, 25, 48, 0.8)'
const sideBarTextColor: string =
  process.env.NEXT_PUBLIC_SIDEBAR_TEXT_COLOR || 'rgba(182, 242, 255, 1)'
const sidebarToggleButton: string =
  process.env.NEXT_PUBLIC_SIDEBAR_TOGGLE_BTN_COLOR || 'rgba(182, 242, 255, 1)'
const sidebarTextHover: string =
  process.env.NEXT_PUBLIC_SIDEBAR_TEXT_HOVER_COLOR || 'rgba(182, 242, 255, 1)'
const scrollToTopBtnBg: string =
  process.env.NEXT_PUBLIC_SCROLL_TO_TOP_BTN_COLOR || 'rgba(182, 242, 255, 1)'

// Background Image 專題背景底圖設定
const bgImageURL: string = process.env.NEXT_PUBLIC_BG_IMAGE_URL || ''

let protocol = 'http'
let host = 'localhost'
let staticFileDestination: string
let imagePrefix: string
let GTM_ID = ''
let SITE_URL = ''

switch (env) {
  case 'dev':
    protocol = 'https'
    host = 'projects.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-PBNLSMX'
    SITE_URL = 'dev-next.mirrormedia.mg'

    break
  case 'staging':
    protocol = 'https'
    host = 'projects.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-KVDZ27K'
    SITE_URL = 'staging-next.mirrormedia.mg'

    break

  case 'prod': {
    protocol = 'https'
    host = 'projects.mirrormedia.mg'
    staticFileDestination = `${protocol}://${host}/projects/${projectName}`
    imagePrefix = `/projects/${projectName}`
    GTM_ID = 'GTM-NCH86SP'
    SITE_URL = 'www.mirrormedia.mg'

    break
  }
  default: {
    staticFileDestination = `${protocol}://${host}:3000`
    imagePrefix = ''
    GTM_ID = 'GTM-PBNLSMX'

    break
  }
}

export {
  staticFileDestination,
  imagePrefix,
  GTM_ID,
  SITE_URL,
  JSON_URL,
  primaryColor,
  navListItemColor,
  backgroundColor,
  titleColor,
  textColor,
  borderColor,
  sideBarBgColor,
  sideBarTextColor,
  OG_TITLE,
  OG_DESC,
  OG_IMAGE_URL,
  bgImageURL,
  secondaryColor,
  sidebarToggleButton,
  sidebarTextHover,
  scrollToTopBtnBg,
}
