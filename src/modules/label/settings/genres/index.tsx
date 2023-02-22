import { genres_values } from 'core/constants'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'core/hooks/useRedux'
import { COMMON_API } from 'data'
import { fetchUser } from 'redux/slices/auth'
import toast from 'react-hot-toast'

const GenresTab = () => {
  const profile = useAppSelector((state) => state.authReducer.me)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      genres: profile.genres,
    },
  })

  const dispatch = useDispatch()

  async function updateGenres(genres: string[]) {
    try {
      const res = await COMMON_API.updateName({
        name: profile.name,
        description: profile.description,
        genres,
      })

      if (res.success) {
        dispatch(fetchUser())
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const onSubmit = ({ genres }) => {
    updateGenres(genres)
  }

  return (
    <div className="mt-10 mb-20 divide-y divide-gray-200">
      <div className="space-y-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Genres</h3>
        <p className="max-w-2xl text-sm text-gray-500">Your genres settings</p>
      </div>
      <div className="mt-10">
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap">
              {genres_values[0].options.map((genre) => (
                <>
                  <div
                    className="flex items-center mb-4 mr-4"
                    key={genre.value}
                  >
                    <input
                      id="genres"
                      type="checkbox"
                      value={genre.value}
                      {...register('genres')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {genre.label}
                    </label>
                  </div>
                </>
              ))}
            </div>

            <button
              type="submit"
              className="mt-4 px-6 select-none py-2 text-sm font-medium text-white rounded-md bg-primary-blue"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GenresTab
