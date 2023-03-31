import { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useAppSelector, useAppDispatch } from 'core/hooks/useRedux'
import { setIsPlaying } from 'redux/slices/player'
import { refreshAccessToken } from 'core/spotify'

const BottomSpotifyPlayer = () => {
  const [token, setToken] = useState<string>('')

  const state = useAppSelector((state) => state.playerSlice)
  const dispatch = useAppDispatch()

  const getAccessToken = () => {
    refreshAccessToken()
      .then((response) => {
        setToken(response.data?.access_token)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAccessToken()
    const interval = setInterval(() => {
      getAccessToken()
    }, 3600000)
    return () => clearInterval(interval)
  }, [])

  const handleStateChange = ({ isPlaying }) => {
    dispatch(setIsPlaying(isPlaying))
  }

  return (
    <div className="fixed h-[80px] flex justify-center items-center  bottom-0 left-0 z-50 w-full px-2 lg:px-5 py-3 bg-white dark:bg-slate-900 shadow-dark">
      {token ? (
        <SpotifyPlayer
          token={token}
          play={state.isPlaying}
          callback={handleStateChange}
          uris={[state.uri || '']}
          styles={{
            activeColor: '#fff',
            bgColor: '#fff',
            color: '#3180F5',
            loaderColor: '#fff',
            sliderColor: '#3180F5',
            trackArtistColor: '#ccc',
            trackNameColor: '#000',
            height: 70,
          }}
        />
      ) : (
        'Connect with spotify'
      )}
    </div>
  )
}

export default BottomSpotifyPlayer
