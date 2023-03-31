import { useAppDispatch } from 'core/hooks/useRedux'
import { AUTH_API } from 'data'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { fetchUser } from 'redux/slices/auth'
import { SpinnerCircular } from 'spinners-react'

interface FieldValues {
  password: string
  cpassword: string
}

const SettingUpdatePassword: FC = () => {
  const [editable, setEditable] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>()

  const dispatch = useAppDispatch()

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)
    const is_equal = data.password === data.cpassword

    if (!is_equal) {
      setLoading(false)
      return toast.error('Password does not match!')
    }
    try {
      const response = await AUTH_API.updatePassword(data.password)

      if (response.status === 200) {
        toast.success('Password updated')
        dispatch(fetchUser())
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Something went wrong!')
    }
  }
  return (
    <>
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
        <dt className="text-sm font-medium text-gray-500">Password</dt>
        <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {editable ? (
            <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-grow">
                <input
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                  className="max-w-lg mb-3 py-2 block w-full outline-none  focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm "
                  placeholder="New Password"
                />
                <input
                  type="password"
                  {...register('cpassword', {
                    required: true,
                  })}
                  className="max-w-lg mb-3 py-2 block w-full outline-none  focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm "
                  placeholder="Confirm Password"
                />
              </div>
              {loading ? (
                <>
                  <div className="flex-shrink-0">
                    <SpinnerCircular
                      size={30}
                      secondaryColor={'transparent'}
                      color="#C93FC0"
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="flex-shrink-0 ml-4">
                    <button
                      type="submit"
                      className="font-medium bg-white rounded-md text-primary-magenta hover:text-purple-500 focus:outline-none"
                    >
                      Confirm
                    </button>
                  </span>
                  <span className="flex-shrink-0 ml-4">
                    <button
                      onClick={() => {
                        setEditable(false)
                      }}
                      type="button"
                      className="font-medium bg-white rounded-md text-gray-500 hover:text-gray-600 focus:outline-none "
                    >
                      Cancel
                    </button>
                  </span>
                </>
              )}
            </form>
          ) : (
            <>
              <span className="flex-grow">
                <input
                  type="password"
                  className="bg-transparent"
                  value={'*****************'}
                  disabled
                />
              </span>
              <span className="flex-shrink-0 ml-4">
                <button
                  onClick={() => {
                    setEditable(true)
                  }}
                  type="button"
                  className="font-medium bg-white rounded-md text-primary-magenta hover:text-purple-500 focus:outline-none "
                >
                  Update
                </button>
              </span>
            </>
          )}
        </dd>
      </div>
    </>
  )
}

export default SettingUpdatePassword
