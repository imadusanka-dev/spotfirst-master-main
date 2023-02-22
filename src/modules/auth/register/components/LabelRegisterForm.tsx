import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RegisterInput } from 'components/Input/RegisterInput'
import { SocialLinkInput } from 'components/Input/SocialLinkInput'
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faSpotify,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { BaseResponse } from 'core/types/responses'
import { AUTH_API } from 'data'
import { useRouter } from 'next/router'
import { SpinnerCircular } from 'spinners-react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface FieldValues {
  name: string
  email: string
  password: string
  cpassword: string
  facebook: string
  soundcloud: string
  youtube: string
  instagram: string
  spotify: string
  website: string
  twitter: string
  acceptTerms: boolean
  additionalInformation: string
}

const LabelRegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FieldValues>()

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function onSubmit(data: FieldValues) {
    if (data.password !== data.cpassword) {
      setError('cpassword', {
        type: 'validate',
        message: 'Passwords not matched!',
      })
      return
    }

    setLoading(true)

    const registerData = {
      email: data.email,
      name: data.name,
      password: data.password,
      roles: ['ROLE_LABEL'],
      links: {
        facebook: data['facebook'],
        soundCloud: data['soundcloud'],
        youtube: data['youtube'],
        instagram: data['instagram'],
        spotify: data['spotify'],
        website: data['website'],
        twitter: data['twitter'],
      },
    }

    if (data.additionalInformation) {
      registerData['additionalInformation'] = data.additionalInformation
    }

    try {
      const response = await AUTH_API.register(registerData)
      if (response.success) {
        toast.success(response['message'])
        reset()
        router.push('/login')
      } else {
        toast.error(response['message'] ?? 'Something went wrong!')
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      const err: AxiosError<BaseResponse> = error
      toast.error(err.response.data.message)
    }
  }
  return (
    <motion.div
      transition={{
        type: 'spring',
        stiffness: 60,
        duration: 0.3,
      }}
      initial={{ opacity: 0, scale: 0, y: 200 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative p-8 bg-white shadow-light rounded-xl"
    >
      <div className="pb-14">
        <h5 className="text-xl font-semibold text-slate-700">
          Register a <span className="text-primary-yellow">Label</span>
        </h5>
        <p className="text-sm text-slate-400 text-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="flex space-x-10">
            <RegisterInput
              {...register('name', {
                required: 'Name cannot be empty',
              })}
              error={errors.name && errors.name.message}
              type="text"
              label="Label Name"
              placeholder="Type in the record name"
              className="flex-grow"
            />
            <RegisterInput
              {...register('email', {
                required: 'Email cannot be empty',
                pattern: {
                  message: 'Invalid email address',
                  value:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                },
              })}
              className="flex-grow"
              label="Email Address"
              placeholder="Type in the email address"
              type="email"
            />
          </div>
          <div className="flex mt-5 space-x-10">
            <RegisterInput
              error={errors.password && errors.password.message}
              {...register('password', {
                required: 'Password cannot be empty',
              })}
              className="flex-grow"
              label="Password"
              showPassword
              placeholder="Enter a password"
              type="password"
            />
            <RegisterInput
              error={errors.cpassword && errors.cpassword.message}
              {...register('cpassword', {
                required: 'Confirm password cannot be empty',
              })}
              className="flex-grow"
              label="Confirm Password"
              placeholder="Re-Enter the password"
              type="password"
            />
          </div>
        </div>
        <div className="flex-grow w-full mt-5">
          <label className={'flex flex-col text-sm text-gray-500'}>
            Additional information
            <div className="relative flex items-center mt-2 rounded-lg bg-gray-50">
              <textarea
                {...register('additionalInformation')}
                cols={30}
                rows={10}
                className="w-full bg-transparent outline-none rounded-lg placeholder:font-light focus:outline-none focus:ring-1 focus:ring-blue-200 px-5 py-3.5 text-sm text-primary-blue-dark"
                placeholder="Do not be shy! Share all info that could help our curators promote your track!"
              ></textarea>
            </div>
          </label>
        </div>
        <div className="py-8">
          <hr />
        </div>
        <div>
          <label className="text-sm text-gray-500">Other Socials</label>
          <div className="flex flex-col w-full lg:flex-row lg:space-x-10">
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                {...register('facebook')}
                icon={faFacebook as IconProp}
                placeholder="Facebook"
              />
            </div>
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                {...register('soundcloud')}
                icon={faSoundcloud as IconProp}
                placeholder="SoundCloud"
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row lg:space-x-10">
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                {...register('youtube')}
                icon={faYoutube as IconProp}
                placeholder="YouTube"
              />
            </div>
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                {...register('instagram')}
                icon={faInstagram as IconProp}
                placeholder="Instagram"
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row lg:space-x-10">
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                {...register('spotify')}
                icon={faSpotify as IconProp}
                placeholder="Spotify"
              />
            </div>
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                {...register('website')}
                icon={faGlobe as IconProp}
                placeholder="Website"
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row lg:space-x-10">
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                {...register('twitter')}
                icon={faTwitter as IconProp}
                placeholder="Twitter"
              />
            </div>
            <div className="w-full mt-4 lg:w-1/2">
              {/* <SocialLinkInput icon={faTwitter} placeholder="Twitter" /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end w-full mt-14">
          <div className="flex flex-row items-start justify-between w-full">
            <div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('acceptTerms', {
                      required: 'Accept Terms & Conditions to Continue',
                    })}
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="text-slate-500 dark:text-gray-300"
                  >
                    I agree with the{' '}
                    <a
                      href="#"
                      className="text-primary-blue hover:underline dark:text-primary-blue"
                    >
                      terms and conditions
                    </a>{' '}
                    &{' '}
                    <a
                      href="#"
                      className="text-primary-blue hover:underline dark:text-primary-blue"
                    >
                      privacy policy
                    </a>
                  </label>
                </div>
              </div>

              {errors.acceptTerms && (
                <motion.span
                  transition={{
                    duration: 0.3,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs text-red-400"
                >
                  {errors.acceptTerms.message}
                </motion.span>
              )}
            </div>
            <button className="px-20 flex justify-center items-center w-full lg:w-5/12 h-[50px] font-normal text-white transition-all duration-150 bg-left bg-[length:200%_200%]  bg-no-repeat rounded-xl bg-gradient-to-r from-[#eeb739] to-[#c97a3f] hover:bg-right  active:scale-[99%]">
              <div className="absolute">
                {loading ? (
                  <SpinnerCircular
                    size={40}
                    secondaryColor={'transparent'}
                    color="#fff"
                  />
                ) : (
                  'Apply'
                )}
              </div>
            </button>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              href={'/login'}
              className="text-sm text-center cursor-pointer text-primary-blue"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  )
}

export default LabelRegisterForm
