import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from 'core/hooks/useRedux'
import { MdStar, MdStarBorder } from 'react-icons/md'
import { setCuratorRatingsFilter } from 'redux/slices/submitSong'
import Rating from 'react-rating'

const ratingValues: number[] = [5, 4, 3, 2, 1]
const RatingsFilter = () => {
  const dispatch = useAppDispatch()

  const { register, watch } = useForm({
    defaultValues: {
      ratings: [],
    },
  })

  const ratings = watch('ratings')

  useEffect(() => {
    dispatch(setCuratorRatingsFilter(ratings.map(Number)))
  }, [ratings])

  return (
    <form>
      <div className="flex flex-wrap">
        {ratingValues.map((rating, index) => (
          <div className="flex items-center mb-4 mr-4" key={index}>
            <input
              id="ratings"
              type="checkbox"
              value={rating}
              {...register('ratings')}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm text-gray-900 "
            >
              <Rating
                readonly
                initialRating={rating}
                emptySymbol={<MdStarBorder className="text-yellow-500" />}
                fullSymbol={<MdStar className="text-yellow-500" />}
              />
            </label>
          </div>
        ))}
      </div>
    </form>
  )
}

export default RatingsFilter
