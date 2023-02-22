import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { useEffect, useRef } from 'react'
import { FastForward, Pause, Play, Rewind } from 'react-feather'

import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setVolume,
} from 'redux/slices/player'
import PlayerSlider from './widgets/PlayerSlider'
import SongThumbnail from './widgets/SongThumbnail'
import VolumeSlider from './widgets/VolumeSlider'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import classNames from 'classnames'

dayjs.extend(duration)

const BottomPlayer = () => {
  const state = useAppSelector((state) => state.playerSlice)
  const dispatch = useAppDispatch()

  const player = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // state setters wrappers
    const setAudioData = () => {
      dispatch(setDuration(player?.current?.duration))
      dispatch(setCurrentTime(player?.current?.currentTime))
    }
    const setVolumeData = () => {
      dispatch(setVolume(player.current.volume))
    }

    const setPause = () => {
      dispatch(setIsPlaying(false))
    }

    const setAudioTime = () =>
      dispatch(setCurrentTime(player.current.currentTime))
    // DOM listeners: update React state on DOM events
    player.current.addEventListener('loadeddata', setAudioData)

    player.current.addEventListener('timeupdate', setAudioTime)

    // DOM listners: update volume state on volume change
    player.current.addEventListener('volumechange', setVolumeData)

    player.current.addEventListener('ended', setPause)

    // effect cleanup
    return () => {
      if (player.current) {
        player.current.removeEventListener('loadeddata', setAudioData)
        player.current.removeEventListener('timeupdate', setAudioTime)
        player.current.removeEventListener('volumechange', setVolumeData)
        player.current.removeEventListener('ended', setPause)
      }
    }
  })

  useEffect(() => {
    if (state.isPlaying) {
      player.current.play()
    } else {
      player.current.pause()
    }
  }, [state.isPlaying])

  return (
    <>
      {/* <iframe
        className="fixed bottom-0 left-0 z-50"
        width="100%"
        height="80"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/13814719&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
      ></iframe> */}

      <div className="fixed h-[80px] flex justify-center items-center  bottom-0 left-0 z-50 w-full px-2 lg:px-5 py-3 bg-white dark:bg-slate-900 shadow-dark">
        <div className="flex flex-row-reverse items-center w-full lg:flex-row">
          <div className="flex items-center space-x-3 lg:mx-3">
            <div className="hidden lg:block">
              <button className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-primary-blue ">
                <Rewind size={20} />
              </button>
            </div>
            <div
              className={classNames(
                state.isPlaying ? 'scale-110' : 'scale-100',
                'transition-all duration-300'
              )}
            >
              {!state.isPlaying ? (
                <button
                  onClick={() => dispatch(setIsPlaying(true))}
                  className="flex items-center justify-center w-12 h-12 text-white rounded-full cursor-pointer shadow-normal bg-primary-blue"
                >
                  <Play className="ml-1" size={30} />
                </button>
              ) : (
                <button
                  onClick={() => dispatch(setIsPlaying(false))}
                  className="flex items-center justify-center w-12 h-12 text-white rounded-full cursor-pointer shadow-normal bg-primary-blue"
                >
                  <Pause className="" size={30} />
                </button>
              )}
            </div>
            <div>
              <button className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-primary-blue ">
                <FastForward size={20} />
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <VolumeSlider
              onChangeVolume={(volume) => {
                if (player.current) {
                  player.current.volume = volume
                }
              }}
            />
          </div>
          <div className="flex-grow block w-full lg:hidden">
            <div className="flex items-center">
              <audio src={state.audioUrl} ref={player}></audio>
              <SongThumbnail albumArt={state.albumArt} />
              <div className="ml-3">
                <div className="text-xs font-title text-slate-700">
                  {state.title} - {state.artist}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow hidden w-full mx-3 lg:block">
            <div className="flex w-full">
              <SongThumbnail albumArt={state.albumArt} />
              <div className="w-full mx-3 my-2">
                <div className="flex flex-col justify-end h-full">
                  <div className="flex flex-row items-center justify-between mb-3">
                    <span className="text-xs font-light text-slate-500">
                      {dayjs
                        .duration(state.currentTime, 'seconds')
                        .format('mm:ss')}
                    </span>
                    <div className="flex flex-col items-center text-xs font-title text-slate-700">
                      <span>{state.title}</span>
                      <span className="text-gray-500">{state.artist}</span>
                    </div>
                    <span className="text-xs font-light text-slate-500">
                      {dayjs
                        .duration(state.duration, 'seconds')
                        .format('mm:ss')}
                    </span>
                  </div>
                  <div className="hidden lg:block">
                    <PlayerSlider
                      onChangeTime={(duration) => {
                        if (player) {
                          player.current.currentTime = duration
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomPlayer
