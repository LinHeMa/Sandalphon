import type {
  RowSpeakerItem,
  FormattedSpeaker,
  LogoImage,
  GenericPartners,
} from '~/types'

/**
 * Check if the source is from YouTube. If it is, get the YouTube ID and transform it to https://www.youtube.com/embed/${youtubeId}?enablejsapi=1 in order to put it in <iframe>.
 * If the source is not from YouTube video, return the original source URL.
 *
 * Why we need to add parameter `enablejsapi` in youtube iframe attribute `src`?
 * Because we need to track gtm event when playing youtube video, the only way to achieve this is to add param.
 * see [Youtube API](https://developers.google.com/youtube/player_parameters?hl=zh-tw#enablejsapi) to get more info.
 *
 */
function getVideoSrc(url: string) {
  const youtubePattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]+)(?:&\S+)?$/
  const match = url.match(youtubePattern)

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1`
  }

  return url
}

function parseSpeakerWithTitle(str: string) {
  const speakersData = str.split('／') //使用「／」分割不同講者資料
  const speakers: FormattedSpeaker[] = []

  speakersData.forEach((speakerInfo) => {
    const [name, titles] = speakerInfo.split('：') //使用「：」分割出講者名稱＆職稱
    const titleArray = titles?.split('、') //使用「：」分割出不同職稱為一陣列
    speakers.push({
      name: name.trim(),
      title: titleArray?.map((title) => title.trim()) || [],
    })
  })

  return speakers
}

function parseSpeakersByType(str: string) {
  const lines = str.split('\n') //使用「\n」區分不同講者類別資料
  let formattedSpeakersData: RowSpeakerItem[] = []

  lines.forEach((line) => {
    const parts = line.split('＊') //使用「＊」分割「講者類別」＆「講者清單」

    let type: string = ''
    let speakerStr: string = ''

    if (parts.length === 3) {
      type = parts[1].trim() || '' //講者類別
      speakerStr = parts[2].trim() || '' //講者清單
    } else {
      type = '' //講者類別
      speakerStr = parts[0].trim() || '' //講者清單
    }

    const speakers = parseSpeakerWithTitle(speakerStr)

    const speakersByType = {
      type: type,
      speakers: speakers,
    }

    formattedSpeakersData.push(speakersByType)
  })

  return formattedSpeakersData
}

/**
 * Checks if the speakerArray is valid.
 */
function checkHaveSpeakers(speakerArray: RowSpeakerItem[]): boolean {
  if (!Array.isArray(speakerArray)) {
    return false
  }

  const firstSpeaker = speakerArray[0]

  if (
    speakerArray.length === 1 &&
    firstSpeaker.speakers.length === 1 &&
    firstSpeaker.speakers[0].name.trim() === ''
  ) {
    return false
  }

  return true
}

function removeEmptyLogo(logoList: LogoImage[]) {
  return logoList.filter((item) => item.image.trim() !== '')
}

/**
 * Check if all the 'image' values in types within partners are empty (''), and if they are, return true.
 */
const checkAllImagesEmpty = (partners: GenericPartners) => {
  for (const key in partners) {
    if (partners.hasOwnProperty(key)) {
      const items = partners[key]
      for (const item of items) {
        if (item.image !== '') {
          return false
        }
      }
    }
  }
  return true
}

export {
  getVideoSrc,
  parseSpeakerWithTitle,
  parseSpeakersByType,
  checkHaveSpeakers,
  removeEmptyLogo,
  checkAllImagesEmpty,
}
