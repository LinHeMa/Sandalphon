import {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
  useContext,
} from 'react'

const initialValue: {
  YoutubePlayer?: typeof YT.Player
} = {}

const YoutubePlayerContext = createContext(initialValue)

export function YoutubePlayerProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<typeof initialValue>({
    YoutubePlayer:
      typeof window === 'undefined' ? undefined : window?.YT?.Player,
  })

  useEffect(() => {
    if (state.YoutubePlayer) return
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)

    //@ts-expect-error - no polyfill
    window.onYouTubeIframeAPIReady = () => {
      setState({ YoutubePlayer: window.YT.Player })
    }
  }, [state.YoutubePlayer])
  return (
    <YoutubePlayerContext.Provider value={state}>
      {children}
    </YoutubePlayerContext.Provider>
  )
}

export function useYoutubePlayer() {
  return useContext(YoutubePlayerContext)
}
