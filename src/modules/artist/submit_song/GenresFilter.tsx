import { useEffect } from 'react'
import { genres_values } from 'core/constants'
import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from 'core/hooks/useRedux'
import { setCuratorGenresFilter } from 'redux/slices/submitSong'

const GenresFilter = () => {
  const dispatch = useAppDispatch()
  const { songInfo } = useAppSelector((state) => state.submitSongSlice)

  const { register, watch } = useForm({
    defaultValues: {
      genres: songInfo.genres,
    },
  })

  const genres = watch('genres')

  useEffect(() => {
    dispatch(setCuratorGenresFilter(genres))
  }, [genres])

  return (
    <form>
      <div className="flex flex-wrap">
        {genres_values[0].options.map((genre) => (
          <>
            <div className="flex items-center mb-4 mr-4" key={genre.value}>
              <input
                id="genres"
                type="checkbox"
                value={genre.value}
                {...register('genres')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm text-gray-900 "
              >
                {genre.label}
              </label>
            </div>
          </>
        ))}
      </div>
    </form>
  )
}

export default GenresFilter
