import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Input } from 'components/Input'
import { Switch } from '@headlessui/react'
import classNames from 'classnames'

import { ArrowRight } from 'react-feather'
import { setCompletedStep, setSongInfo, setStep } from 'redux/slices/submitSong'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import MultiSelect from 'components/Select/MultiSelect'
import toast from 'react-hot-toast'
import { types, genres_values, moods_values } from 'core/constants'

const StepTwo: FC = () => {
  const {
    title,
    artistName,
    type,
    genres,
    moods,
    artistAndVocalistsParticipate,
    englishLyrics,
    otherLanguage,
    message,
    otherArtistsParticipated,
  } = useAppSelector((state) => state.submitSongSlice.songInfo)

  const state = useAppSelector((state) => state.submitSongSlice)

  const dispatch = useAppDispatch()

  const handleNext = async () => {
    const stepTwoData = {
      title,
      artistName,
      type,
      genres,
      englishLyrics,
    }

    if (!title && !state.songInfo.title) {
      return toast.error('Title required in song info')
    }

    if (!artistName) {
      return toast.error('Artist name required in song info')
    }

    if (genres.length === 0) {
      return toast.error('Select at lease one genre')
    }

    if (otherArtistsParticipated) {
      if (
        !artistAndVocalistsParticipate ||
        artistAndVocalistsParticipate === ''
      ) {
        return toast.error('Artists/Vocalists required in song info')
      }
    }

    if (!englishLyrics) {
      // TODO add more validation
      if (!otherLanguage || otherLanguage === '') {
        return toast.error('Enter lyrics language in song info')
      }

      stepTwoData['otherLanguage'] = otherLanguage
    }

    if (message) {
      stepTwoData['message'] = message
    }

    dispatch(
      setCompletedStep({
        step: 2,
        completed: true,
      })
    )
    dispatch(setStep(3))
  }

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex-grow w-full"
    >
      <div className="w-full h-full px-5 py-5 rounded-lg shadow-light">
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-sm">Track Title</label>
            <Input
              defaultValue={(state.useLink && state.songInfo.title) || ''}
              value={title || state.songInfo.title}
              onChange={(event) => {
                dispatch(
                  setSongInfo({ field: 'title', value: event.target.value })
                )
              }}
              placeholder="Type in the song name only"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Artist Name</label>
            <Input
              value={artistName || state.songInfo.artistName}
              defaultValue={(state.useLink && state.songInfo.artistName) || ''}
              onChange={(event) => {
                dispatch(
                  setSongInfo({
                    field: 'artistName',
                    value: event.target.value,
                  })
                )
              }}
              placeholder="Type in the artist name"
            />
          </div>
          <div className="flex space-x-8">
            {types.map((_type) => {
              return (
                <div key={_type.value} className="flex items-center">
                  <input
                    checked={_type.value === type}
                    onChange={(event) => {
                      if (event.target.checked) {
                        dispatch(
                          setSongInfo({ field: 'type', value: _type.value })
                        )
                      }
                    }}
                    id={_type.value}
                    name={_type.value}
                    type="radio"
                    className="w-4 h-4 border-gray-100 focus:ring-primary-blue text-primary-blue"
                  />
                  <label
                    htmlFor={_type.value}
                    className="block ml-3 text-sm text-gray-700"
                  >
                    {_type.label}
                  </label>
                </div>
              )
            })}
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <label className="text-sm">
                Did other Artist/Vocalists participate?
              </label>
              <Switch
                checked={otherArtistsParticipated}
                onChange={(value) => {
                  dispatch(
                    setSongInfo({ field: 'otherArtistsParticipated', value })
                  )
                }}
                className={classNames(
                  otherArtistsParticipated ? 'bg-primary-blue' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    otherArtistsParticipated
                      ? 'translate-x-5'
                      : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </div>
            {otherArtistsParticipated && (
              <div className="mt-4">
                <Input
                  value={artistAndVocalistsParticipate}
                  onChange={(event) => {
                    dispatch(
                      setSongInfo({
                        field: 'artistAndVocalistsParticipate',
                        value: event.target.value,
                      })
                    )
                  }}
                  placeholder="Type in the artists/vocalists names"
                />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <label className="text-sm">
                Does this song have English lyrics?
              </label>
              <Switch
                checked={englishLyrics}
                onChange={(value) => {
                  dispatch(setSongInfo({ field: 'englishLyrics', value }))
                }}
                className={classNames(
                  englishLyrics ? 'bg-primary-blue' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    englishLyrics ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </div>
            {!englishLyrics && (
              <div className="mt-4">
                <Input
                  value={otherLanguage}
                  onChange={(event) => {
                    dispatch(
                      setSongInfo({
                        field: 'otherLanguage',
                        value: event.target.value,
                      })
                    )
                  }}
                  placeholder="Type in the language"
                />
              </div>
            )}
          </div>
          <div>
            <label className="text-sm">Select the Genre</label>
            <div className="mt-4">
              <MultiSelect
                defaultValue={genres.map((item) => ({
                  label: item.toUpperCase(),
                  value: item.toLowerCase(),
                }))}
                onChange={(value) => {
                  const _genres = value.map((item) => item['value'])
                  dispatch(setSongInfo({ field: 'genres', value: _genres }))
                }}
                options={genres_values}
              />
            </div>
          </div>
          <div>
            <label className="text-sm">Select the Mood</label>
            <div className="mt-4">
              <MultiSelect
                defaultValue={moods.map((item) => ({
                  label: item.toUpperCase(),
                  value: item.toLowerCase(),
                }))}
                onChange={(value) => {
                  const _moods = value.map((item) => item['value'])
                  dispatch(setSongInfo({ field: 'moods', value: _moods }))
                }}
                options={moods_values}
              />
            </div>
          </div>
          <div>
            <label className="text-sm">Message</label>
            <textarea
              value={message ?? ''}
              onChange={(event) => {
                dispatch(
                  setSongInfo({ field: 'message', value: event.target.value })
                )
              }}
              cols={30}
              rows={10}
              className="w-full bg-gray-50 mt-4 outline-none rounded-lg placeholder:font-light focus:outline-none focus:ring-1 focus:ring-blue-200 px-5 py-3.5 text-sm text-primary-blue-dark"
              placeholder="Do not be shy! Share all info that could help our curators promote your track!"
            ></textarea>
          </div>
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
      </div>
    </motion.section>
  )
}

export default StepTwo
