import { faSoundcloud, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Header from 'components/Headers/AuthHeader'
import { LoginInput } from 'components/Input/LoginInput'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { login } from 'redux/slices/auth'
import { useState } from 'react'
import { SpinnerCircular } from 'spinners-react'
import { AlertCircle } from 'react-feather'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface FieldValues {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>()

  const [loading, setLoading] = useState(false)

  const { error } = useAppSelector((state) => state.authReducer)
  const dispatch = useAppDispatch()

  async function signIn(email: string, password) {
    setLoading(true)
    await dispatch(login({ email: email, password: password }))
    setLoading(false)
  }

  async function onSubmit(data: FieldValues) {
    signIn(data.email, data.password)
  }

  return (
    <div className="bg-white login-bg dark:bg-slate-800">
      <div className="top-0 left-0 z-10 w-full lg:fixed">
        <Header />
      </div>
      <div className="relative flex flex-col items-center justify-center w-screen">
        <div className="py-8 mx-auto">
          <h3 className="text-2xl font-light">
            Welcome to{' '}
            <span className="font-medium text-primary-blue">SpotFirst</span>
          </h3>
        </div>
        <motion.div
          transition={{
            type: 'spring',
            stiffness: 60,
            duration: 0.3,
          }}
          initial={{ opacity: 0, scale: 0, y: 200 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-11/12 p-8 mx-auto mb-20 overflow-hidden bg-white dark:bg-slate-900 md:w-8/12 lg:w-3/12 rounded-xl shadow-light"
        >
          <div className="pb-4">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
              Login
            </h3>
            <p className="text-sm text-slate-400">
              You can login here with Email Address
            </p>
          </div>
          {error && (
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-5 py-3 mb-6 text-red-700 rounded-md dark:bg-red-900 dark:bg-opacity-20 bg-red-50"
            >
              <div className="flex items-center space-x-2 text-sm">
                <AlertCircle />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2"
            autoComplete="off"
          >
            <input autoComplete="off" type="hidden" value="something" />
            <div>
              <LoginInput
                {...register('email', {
                  required: 'Email cannot be empty',
                  pattern: {
                    message: 'Email must be valid',
                    value:
                      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  },
                })}
                error={errors.email && errors.email.message}
                placeholder="Email Address"
                type="text"
              />
            </div>

            <div className="mt-4">
              <LoginInput
                {...register('password', {
                  required: 'Password cannot be empty',
                })}
                error={errors.password && errors.password.message}
                placeholder="Password"
                type="password"
              />
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="w-full flex  justify-center items-center  px-5 h-[50px] mt-6 font-normal text-white transition-all duration-150 bg-left bg-[length:200%_200%]  bg-no-repeat rounded-xl bg-gradient-to-r from-primary-blue to-primary-magenta hover:bg-right  active:scale-[99%] "
              >
                <div className="absolute ">
                  {loading ? (
                    <SpinnerCircular
                      size={40}
                      secondaryColor={'transparent'}
                      color="#fff"
                    />
                  ) : (
                    'Login'
                  )}
                </div>
              </button>

              <div className="flex items-center justify-center w-full py-3 ">
                <a className="text-sm text-center cursor-pointer text-primary-blue">
                  Forgot Password?
                </a>
              </div>

              <div className="flex items-center my-6">
                <span className="w-full mx-3 h-0.5 bg-gray-200"></span>
                <span className="mx-3 text-sm text-gray-400">or</span>
                <span className="w-full mx-3 h-0.5 bg-gray-200"></span>
              </div>
            </div>

            <div>
              <button className="flex items-center justify-center w-full mb-5 px-5 py-2.5 mt-4 space-x-2 text-sm font-normal text-white transition-all duration-150 bg-black  rounded-lg ">
                <span className="w-6 h-6">
                  <FontAwesomeIcon
                    color="#fff"
                    size="2x"
                    icon={faSpotify as IconProp}
                  />
                </span>
                <span>Continue with Spotify</span>
              </button>
              <button className="flex items-center justify-center w-full mb-5 px-5 py-2.5 mt-4 space-x-2 text-sm font-normal text-white transition-all duration-150 bg-[#f50]  rounded-lg ">
                <span className="w-7">
                  <FontAwesomeIcon
                    color="#fff"
                    size="2x"
                    icon={faSoundcloud as IconProp}
                  />
                </span>
                <span>Continue with SoundCloud</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

LoginPage.public = true

export default LoginPage
