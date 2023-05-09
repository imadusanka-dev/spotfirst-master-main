import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import { Input } from 'components/Input'
import { motion } from 'framer-motion'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Image as ImageIcon,
  Music,
  Pause,
  Play,
  Trash,
  X,
} from 'react-feather'

import SongDropZone from '../SongDropZone'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CustomDatePicker from 'components/DatePicker'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import {
  setActiveTab,
  setAlbumArt,
  setAlbumArtPreview,
  setAudio,
  setCompletedStep,
  setPlaying,
  setPreviewDuration,
  setReleasedDate,
  setReleasedLabel,
  setReleasedTrackEnabled,
  setReleasedUnderLabelEnabled,
  setStep,
} from 'redux/slices/submitSong'
import { SubmitWithLink } from './SubmitWithLink'
import toast from 'react-hot-toast'

const StepOne: FC = () => {
  const {
    audio,
    activeTab,
    albumArt,
    albumArtPreview,
    playing,
    preview,
    releasedDate,
    releasedTrackEnabled,
    releasedLabelName,
    releasedUnderLabelEnabled,
    tabs,
    songInfo,
  } = useAppSelector((state) => state.submitSongSlice)

  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null)
  const [url, setUrl] = useState(songInfo.songUrl || '')

  const dispatch = useAppDispatch()

  const hiddenInput = useRef<HTMLInputElement>()

  const router = useRouter()

  const onDropSong = (file: File) => {
    dispatch(setAudio(file))
  }

  const waveContainer = useRef<HTMLDivElement>(null)

  console.log('---------wave container', waveContainer)

  const onHashChangeStart = (event) => {
    const path: string = event
    const hash = path.split('#')[1]
    dispatch(setActiveTab(`#${hash}`))
  }

  useEffect(() => {
    router.events.on('hashChangeStart', onHashChangeStart)

    return () => {
      router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [router.events])

  useEffect(() => {
    const initWaveSurfer = async () => {
      console.log('--------wave surfer')
      const WaveSurfer = (await import('wavesurfer.js')).default
      const RegionPlugin = (
        await import('wavesurfer.js/dist/plugin/wavesurfer.regions.js')
      ).default

      const _wavesurfer = WaveSurfer?.create({
        container: '#wave-snippet',
        barWidth: 3,
        cursorWidth: 1,
        height: 100,
        barHeight: 0.8,
        progressColor: '#126ED8',
        responsive: true,
        waveColor: '#1980F5',
        cursorColor: '#000',
        barGap: 3,
        loopSelection: true,
        hideScrollbar: true,
        fillParent: true,
        plugins: [
          RegionPlugin.create({
            maxLength: 20,
            minLength: 20,
          }),
        ],
      })
      setWaveSurfer(_wavesurfer)
    }

    console.log(
      '--------',
      waveContainer.current,
      waveContainer.current?.children?.length
    )

    return () => {
      if (
        waveContainer.current &&
        waveContainer.current.children?.length === 0
      ) {
        initWaveSurfer()
      }
    }
  }, [waveContainer.current])

  useEffect(() => {
    if (audio && waveSurfer) {
      waveSurfer.loadBlob(audio)

      waveSurfer.on('ready', () => {
        if (waveSurfer.regions.list['1']) {
          waveSurfer.clearRegions()
        }
        waveSurfer.regions.add({
          id: '1',
          start: preview.start,
          end: preview.end,
          color: 'rgba(0, 0, 0, 0.05)',
          resize: false,
        })
      })

      waveSurfer.on('region-update-end', () => {
        dispatch(setPlaying(true))
        const start = waveSurfer.regions.list['1']['start'].toFixed(0)
        const end = waveSurfer.regions.list['1']['end'].toFixed(0)
        dispatch(
          setPreviewDuration({
            start: Number.parseInt(start),
            end: Number.parseInt(end),
          })
        )
        waveSurfer.regions.list['1'].play()
      })

      waveSurfer.on('pause', () => {
        pauseSelection()
      })

      waveSurfer.on('finish', () => {
        dispatch(setPlaying(false))
      })

      return () => waveSurfer.pause()
    }
  }, [audio, waveSurfer])

  const playSelection = () => {
    waveSurfer.regions.list['1'].play()
    dispatch(setPlaying(true))
  }

  const pauseSelection = () => {
    waveSurfer.pause()
    dispatch(setPlaying(false))
  }

  const clearAll = () => {
    dispatch(setAudio(null))
    waveSurfer.empty()
  }

  const onChangeAlbumArt = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const imageFile = files[0]

    if (imageFile) {
      dispatch(setAlbumArt(imageFile))
      const objectUrl = URL.createObjectURL(imageFile)
      dispatch(setAlbumArtPreview(objectUrl))
    }
  }

  const onRemoveAlbumArt = () => {
    dispatch(setAlbumArt(null))
    dispatch(setAlbumArtPreview(null))
  }

  const handleNext = async () => {
    const stepOneData = {
      audio,
      albumArt,
    }
    if (!audio) {
      return toast.error('Drop your audio to upload')
    }

    if (!url) {
      return toast.error('Drop your spotify link to upload')
    }

    if (releasedTrackEnabled) {
      if (!releasedDate) {
        return toast.error('Release data required!')
      }

      stepOneData['releasedDate'] = releasedDate
    }

    if (releasedUnderLabelEnabled) {
      if (!releasedLabelName) {
        return toast.error('Add Label name')
      }

      stepOneData['releasedLabelName'] = releasedDate
    }

    dispatch(
      setCompletedStep({
        step: 1,
        completed: true,
      })
    )
    dispatch(setStep(2))
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex-grow"
      >
        <div className="h-full px-5 py-5 bg-white rounded-lg shadow-light">
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full border-gray-300 rounded-md focus:ring-primary-blue focus:border-primary-blue ring-primary-blue"
                defaultValue={
                  tabs.find((tab) => tab.href === '#upload-song').name
                }
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.href
                  return (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        isActive
                          ? 'bg-slate-100 text-primary-blue'
                          : 'text-gray-500 hover:text-gray-700',
                        'px-3 py-2 font-medium text-sm rounded-md'
                      )}
                    >
                      {tab.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>

          {tabs[0].href === activeTab && (
            <SubmitWithLink
              url={url}
              setUrl={setUrl}
              releasedTrackEnabled={releasedTrackEnabled}
            />
          )}

          {tabs[1].href === activeTab && (
            <>
              {audio ? (
                <>
                  <div className="pt-6">
                    <div className="flex items-center justify-between px-4 py-2 rounded-md bg-gray-50">
                      <div className="inline-flex items-center space-x-3">
                        <Music className="text-primary-blue" />
                        <p className="text-sm">{audio.name}</p>
                      </div>
                      <button onClick={clearAll}>
                        <Trash className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <SongDropZone onDrop={onDropSong} />
              )}
              <div className="mt-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Select 20s preview of your song
                  </p>
                </div>
                <div
                  className={classNames(
                    audio ? 'flex' : 'hidden',
                    ' items-center w-full space-x-4'
                  )}
                >
                  <div>
                    {!playing ? (
                      <button
                        onClick={playSelection}
                        className="h-10 w-10 min-w-[40px] flex items-center justify-center text-white rounded-full bg-primary-blue"
                      >
                        <Play className="ml-1" />
                      </button>
                    ) : (
                      <button
                        onClick={pauseSelection}
                        className="h-10 w-10 min-w-[40px] flex items-center justify-center text-white rounded-full bg-primary-blue"
                      >
                        <Pause className="" />
                      </button>
                    )}
                  </div>
                  <div
                    ref={waveContainer}
                    className="flex-grow w-full py-4 "
                    id="wave-snippet"
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <div>
                  <p className="text-sm">Song Album Art</p>
                  {albumArt && albumArtPreview && (
                    <div className="mt-2">
                      <div className="overflow-hidden bg-black rounded-md w-[200px] h-[200px] relative">
                        <button
                          onClick={onRemoveAlbumArt}
                          className="absolute z-10 rounded-full bg-primary-blue hover:bg-primary-blue-dark top-2 right-2"
                        >
                          <X className="text-white" />
                        </button>
                        <Image
                          alt="Album Art Preview"
                          src={albumArtPreview}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </div>
                  )}
                  {!albumArt && !albumArtPreview && (
                    <>
                      <button
                        onClick={() => {
                          hiddenInput.current.click()
                        }}
                        className="flex items-center px-4 py-2 mt-3 space-x-2 text-gray-400 transition-all border rounded-md hover:text-gray-500 hover:bg-gray-100"
                      >
                        <ImageIcon className="w-5 h-5 " />
                        <span className="text-sm ">Select Album Art</span>
                      </button>
                      <input
                        accept="image/jpeg, image/png"
                        ref={hiddenInput}
                        onChange={onChangeAlbumArt}
                        hidden
                        type="file"
                      />
                    </>
                  )}
                </div>
              </div>
              <div>
                <div className="flex mt-4 space-x-4">
                  <p className="text-sm">
                    Has this track been released already?
                  </p>
                  <Switch
                    checked={releasedTrackEnabled}
                    onChange={(value) => {
                      dispatch(setReleasedTrackEnabled(value))
                    }}
                    className={classNames(
                      releasedTrackEnabled ? 'bg-primary-blue' : 'bg-gray-200',
                      'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        releasedTrackEnabled
                          ? 'translate-x-5'
                          : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                      )}
                    />
                  </Switch>
                </div>
                {releasedTrackEnabled && (
                  <div className="my-3">
                    <CustomDatePicker
                      showTimeSelect={false}
                      onChange={(date) => {
                        dispatch(setReleasedDate(date))
                      }}
                      value={releasedDate}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="flex mt-4 space-x-4">
                  <p className="text-sm">Was it released under a label?</p>
                  <Switch
                    checked={releasedUnderLabelEnabled}
                    onChange={(value) => {
                      dispatch(setReleasedUnderLabelEnabled(value))
                    }}
                    className={classNames(
                      releasedUnderLabelEnabled
                        ? 'bg-primary-blue'
                        : 'bg-gray-200',
                      'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        releasedUnderLabelEnabled
                          ? 'translate-x-5'
                          : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                      )}
                    />
                  </Switch>
                </div>

                {releasedUnderLabelEnabled && (
                  <div className="mt-3">
                    <Input
                      onChange={(event) => {
                        const labelName = event.target.value
                        dispatch(setReleasedLabel(labelName))
                      }}
                      placeholder="Type in the label name"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleNext}
                  className={classNames(
                    'px-6 py-2 text-sm font-medium text-white rounded-md bg-primary-blue'
                  )}
                >
                  <div className="flex items-center space-x-1">
                    <span>Next</span>
                    <ArrowRight />
                  </div>
                </button>
              </div>
            </>
          )}
        </div>
      </motion.section>
    </>
  )
}

export default StepOne
