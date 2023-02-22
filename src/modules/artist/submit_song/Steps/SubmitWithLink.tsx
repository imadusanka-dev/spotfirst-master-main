import { Switch } from '@headlessui/react'
import classNames from 'classnames'
import CustomDatePicker from 'components/DatePicker'
import { Input } from 'components/Input'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { validURL } from 'core/utils'
import { COMMON_API } from 'data'
import Image from 'next/legacy/image'
import { FC, useCallback, useEffect, useState, useRef } from 'react'
import { ArrowRight, Image as ImageIcon, X } from 'react-feather'
import toast from 'react-hot-toast'
import {
  resetErrors,
  continueWithLinkSubmit,
  setError,
  setStep,
  setUsingLink,
  setCompletedStep,
  resetLinkSubmitData,
  setReleasedTrackEnabled,
  setReleasedDate,
  setReleasedUnderLabelEnabled,
  setReleasedLabel,
  setAlbumArt,
} from 'redux/slices/submitSong'
import { SpinnerCircular } from 'spinners-react'

interface Props {
  url: string
  releasedTrackEnabled: boolean
  setUrl: (value) => void
}

export const SubmitWithLink: FC<Props> = (props: Props) => {
  const { url, setUrl, releasedTrackEnabled } = props

  const [loading, setLoading] = useState(false)
  // const [metadata, setMetadata] = useState(null)

  const hiddenInput = useRef<HTMLInputElement>()

  const { useLink, songInfo, albumArt, releasedUnderLabelEnabled } =
    useAppSelector((state) => state.submitSongSlice)

  const error = useAppSelector((state) =>
    state.submitSongSlice.errors?.find((item) => item.field === 'submit-link')
  )

  const dispatch = useAppDispatch()

  const onPasteLink = useCallback(() => {
    if (!validURL(url)) return
    setLoading(true)
    dispatch(resetErrors())
    COMMON_API.songMetadata(url)
      .then((res) => {
        setLoading(false)
        if (res['payload']['image']) {
          dispatch(setUsingLink(true))
          dispatch(
            continueWithLinkSubmit({
              albumArt: res['payload']['image'],
              songPreview: res.payload.previewUrl,
              songUrl: url,
              name: res['payload']['name'],
              artistName: res['payload']['artist'],
              songDuration: res['payload']['duration'],
              uri: res['payload']['uri'],
            })
          )
        } else {
          dispatch(resetLinkSubmitData())
          dispatch(
            setError({
              field: 'submit-link',
              message: "Couldn't fetch song metadata",
            })
          )
        }
      })
      .catch(() => {
        dispatch(resetLinkSubmitData())
        dispatch(
          setError({
            field: 'submit-link',
            message: "Couldn't fetch song metadata",
          })
        )
      })
  }, [url])

  useEffect(() => {
    onPasteLink()
  }, [url])

  useEffect(() => {
    // set to FALSE when switch between tabs
    dispatch(setReleasedTrackEnabled(false))
    dispatch(setReleasedUnderLabelEnabled(false))
    dispatch(setAlbumArt(null))

    return () => {
      // set to FALSE when switch between tabs
      dispatch(setReleasedTrackEnabled(false))
      dispatch(setReleasedUnderLabelEnabled(false))
      dispatch(setAlbumArt(null))
    }
  }, [])

  const handleNext = () => {
    if (error) {
      return toast.error(error.message)
    }

    // if (!albumArt) {
    //   return toast.error('Album art required!')
    // }

    if (
      !useLink ||
      !songInfo.title ||
      !songInfo.albumArt ||
      !songInfo.artistName
    ) {
      return toast.error('Need valid song metadata')
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
      <div className="mt-4">
        <div className="pb-2 text-sm">Add your link to the audio</div>
        <Input
          defaultValue={songInfo.songUrl}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Paste audio link here"
        />

        {error && (
          <div className="text-red-500 text-sm py-3 px-2">
            <span>{error.message}</span>
          </div>
        )}

        {loading && (
          <div className="mt-4">
            <SpinnerCircular
              size={40}
              secondaryColor={'transparent'}
              color="#1980F5"
            />
          </div>
        )}

        {useLink && url && (
          <div>
            <div className="flex items-center mt-4 space-x-3">
              {songInfo.albumArt && (
                <div className="w-[100px] min-w-[100px] h-[100px] rounded-lg overflow-hidden relative">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={songInfo.albumArt}
                    alt={songInfo.title}
                    placeholder="blur"
                    blurDataURL={songInfo.albumArt}
                  />
                </div>
              )}
              <div>
                <p className="font-medium"> {songInfo.title}</p>
                <span className="text-xs">{songInfo.artistName}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex mt-4 space-x-4">
          <p className="text-sm">Has this track been released already?</p>
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
                releasedTrackEnabled ? 'translate-x-5' : 'translate-x-0',
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
              releasedUnderLabelEnabled ? 'bg-primary-blue' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={classNames(
                releasedUnderLabelEnabled ? 'translate-x-5' : 'translate-x-0',
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

      <div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleNext}
            className="px-6 py-2 text-sm font-medium text-white rounded-md bg-primary-blue"
          >
            <div className="flex items-center space-x-1">
              <span>Next</span>
              <ArrowRight />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
