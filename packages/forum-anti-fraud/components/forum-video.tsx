import styled from 'styled-components'
import { useState } from 'react'
import { useEffect, useId, useRef } from 'react'
import { useYoutubePlayer } from '~/hook/use-youtube-player'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules'
import { defaultBlockStyle } from '~/styles/shared-style'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Wrapper = styled.div`
  ${defaultBlockStyle}
  padding: 30px 0px;
`

const SwiperWrapper = styled.div`
  .swipper-container {
    --swiper-navigation-size: 30px;
    margin: 0px;
  }
  .swiper-slide {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-bottom: 2rem;
  }
  .swiper-button-next {
    color: #3b82f6;
  }
  .swiper-button-prev {
    color: #3b82f6;
  }
  .swiper-pagination-bullet {
    background-color: #3b82f6;
    width: 10px;
    height: 10px;
  }
`

const PlayerWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  margin: auto;
`

type VideoProps = {
  videoSrc: string
}

const YouTubeVideo = ({
  videoId,
  isActive,
}: {
  videoId: string
  isActive: boolean
}) => {
  const { YoutubePlayer } = useYoutubePlayer()
  const playerRef = useRef<any>(null)
  const playerId = useId()

  useEffect(() => {
    if (!YoutubePlayer) return

    playerRef.current = new YoutubePlayer(playerId, {
      height: '100%',
      width: '100%',
      videoId: videoId,
    })

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [YoutubePlayer, playerId, videoId])

  useEffect(() => {
    // https://developers.google.com/youtube/iframe_api_reference#Playback_status
    const playerStatus = playerRef.current?.player?.getPlayerState() ?? -1
    if (isActive && playerStatus !== 1) {
      playerRef.current?.playVideo?.()
    } else if (!isActive && playerStatus !== 2) {
      playerRef.current?.pauseVideo?.()
    }
  }, [isActive])

  return <PlayerWrapper id={playerId} />
}

function extractVideoId(url: string) {
  try {
    const urlParams = new URLSearchParams(new URL(url).search)
    return urlParams.get('v')
  } catch {
    return null
  }
}

export default function ForumVideo({
  videoSrc = '',
}: VideoProps): JSX.Element | null {
  //Error Handle
  const videoUrls = videoSrc.split(',').filter((url) => url.trim() !== '')
  const videoIds = videoUrls.map(extractVideoId).filter((id) => id !== null)

  const [activeVideoId, setActiveVideoId] = useState(videoIds[0])

  if (!videoIds.length) {
    return null
  }

  return (
    <Wrapper id="video">
      <h1>活動影音</h1>
      <SwiperWrapper>
        <Swiper
          className="swipper-container"
          slidesPerView={1}
          modules={[Pagination, Navigation, Mousewheel, Keyboard]}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          keyboard={{
            enabled: true,
          }}
          onSlideChange={(e) => setActiveVideoId(videoIds[e.realIndex])}
        >
          {videoIds.map((videoId) => (
            <SwiperSlide key={videoId}>
              <YouTubeVideo
                key={videoId}
                videoId={videoId as string}
                isActive={videoId === activeVideoId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
    </Wrapper>
  )
}
