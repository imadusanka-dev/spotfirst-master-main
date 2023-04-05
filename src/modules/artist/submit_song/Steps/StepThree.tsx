import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Link from 'next/link'
import CuratorsTab from '../Tabs/CuratorsTabs'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import {
  editSong,
  reset,
  setCurators,
  setStep,
  setSubmitting,
  submitSong,
} from 'redux/slices/submitSong'
import { COMMON_API } from 'data'
import toast from 'react-hot-toast'

const sortings = [
  { id: 1, name: 'Ratings: High to Low' },
  { id: 2, name: 'Ratings: Low to High' },
]

const StepThree = ({ isEdit, submissionId }) => {
  const [selectedSorting, setSelectedSorting] = useState(sortings[0])

  const selectedCurators = useAppSelector(
    (state) => state.submitSongSlice.curators
  )

  const steps = useAppSelector((state) => state.submitSongSlice.steps)
  const state = useAppSelector((state) => state.submitSongSlice)
  const authState = useAppSelector((state) => state.authReducer)

  const router = useRouter()

  const dispatch = useAppDispatch()

  const step3Tabs = [{ name: 'Curators', href: 'curators', current: true }]

  async function onSubmit() {
    if (selectedCurators.length == 0) {
      return toast.error('Select at lease one curator')
    }
    dispatch(setSubmitting(true))

    const data = {
      parentId: state.parentId ?? undefined,
      songUrl: null,
      imageUrl: null,
      trackTitle: state.songInfo.title,
      artistName: state.songInfo.artistName,
      songType: state.songInfo.type,
      otherArtistsParticipated: state.songInfo.otherArtistsParticipated,
      artistAndVocalistsParticipate:
        state.songInfo.artistAndVocalistsParticipate,
      englishLyrics: state.songInfo.englishLyrics,
      genres: state.songInfo.genres,
      moods: state.songInfo.moods,
      message: state.songInfo.message,
      curators: state.curators,
      releasedDate: state.releasedDate,
      label: state.releasedLabelName,
      uri: state.songInfo.uri,
      duration: state.songInfo.songDuration,
      songPreview: {
        start: state.preview.start,
        end: state.preview.end,
      },
    }

    if (state.useLink) {
      data.imageUrl = state.songInfo.albumArt
      data.songUrl = state.songInfo.songUrl
      data.trackTitle = state.songInfo.title
    } else {
      try {
        data.imageUrl = await COMMON_API.uploadFile(state.albumArt)
      } catch (error) {
        return toast.error(error ?? 'Error occured when uploading')
      }
      try {
        data.songUrl = await COMMON_API.uploadFile(state.audio)
      } catch (error) {
        return toast.error(error ?? 'Error occured when uploading')
      }
    }

    if (!data.imageUrl) {
      dispatch(setSubmitting(false))
      return toast.error('Image URL must be required')
    }
    if (!data.songUrl) {
      dispatch(setSubmitting(false))
      return toast.error('Audio/URL must be required')
    }

    if (isEdit) {
      dispatch(editSong({ data, submissionId })).then(() => {
        dispatch(reset())
        if (authState.me.primaryRole === 'ROLE_ARTIST') {
          router.push('/artist/previous-submissions')
        }
        if (authState.me.primaryRole === 'ROLE_LABEL') {
          router.push('/label/previous-submissions')
        }
      })
    } else {
      dispatch(submitSong({ data })).then(() => {
        dispatch(reset())
        if (authState.me.primaryRole === 'ROLE_ARTIST') {
          router.push('/artist/previous-submissions')
        }
        if (authState.me.primaryRole === 'ROLE_LABEL') {
          router.push('/label/previous-submissions')
        }
      })
    }
  }

  const tabValue = router.query['tab']

  const isTabCurators =
    tabValue === step3Tabs[0].href ||
    tabValue === null ||
    tabValue === undefined
  // const isTabInfluencers = tabValue === step3Tabs[1].href
  // const isTabRecordLabels = tabValue === step3Tabs[2].href

  return (
    <Fragment>
      <motion.section
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex-grow w-full"
      >
        <div className="w-full h-full px-5 py-5 rounded-lg shadow-light">
          <div className="w-full">
            <div>
              <div className="">
                <nav className="flex -mb-px space-x-8">
                  {step3Tabs.map((tab, index) => {
                    const isActive =
                      tab.href === tabValue ||
                      (tabValue === undefined && tab.href === 'curators')
                    return (
                      <Link
                        key={index}
                        href={{ query: { tab: tab.href } }}
                        className={classNames(
                          isActive
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {tab.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>

          {isTabCurators && (
            <motion.section
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CuratorsTab
                selectedCurators={selectedCurators}
                onSelected={(add, curator) => {
                  if (add) {
                    const _curators = [...selectedCurators]
                    if (selectedCurators.some((item) => item === curator)) {
                      return
                    }
                    _curators.push(curator)
                    dispatch(setCurators(_curators))
                  } else {
                    const _curators = [...selectedCurators]
                    const index = _curators.findIndex(
                      (value) => value === curator
                    )

                    _curators.splice(index, 1)
                    dispatch(setCurators(_curators))
                  }
                }}
                onSelectAll={(curators) => {
                  dispatch(setCurators(curators))
                }}
                sortings={sortings}
                selectedSorting={selectedSorting}
                setSelectedSorting={setSelectedSorting}
                genreFilter={state.curatorGenresFilter}
                ratingFilter={state.curatorRatingsFilter}
                priceFilter={state.curatorPriceFilter}
              />
            </motion.section>
          )}
        </div>

        <div className="flex items-center justify-end w-full mt-8">
          <button
            onClick={() => {
              if (steps[1].completed) {
                dispatch(setStep(2))
              }
            }}
            className="px-6 select-none py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center space-x-1">
              <span>Back</span>
            </div>
          </button>
          <button
            disabled={state.isSubmitting}
            onClick={onSubmit}
            className="px-6 select-none py-2 text-sm font-medium text-white rounded-md bg-primary-blue"
          >
            <div className="flex items-center space-x-1">
              <span>{state.isSubmitting ? 'Submitting' : 'Submit'}</span>
            </div>
          </button>
        </div>
      </motion.section>
    </Fragment>
  )
}

export default StepThree
