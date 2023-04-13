import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faSpotify,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { RegisterInput } from 'components/Input/RegisterInput'
import { SocialLinkInput } from 'components/Input/SocialLinkInput'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { SpinnerCircular } from 'spinners-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { AUTH_API } from 'data'
import { BaseResponse } from 'core/types/responses'
import { AxiosError } from 'axios'
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
}

const ArtistRegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FieldValues>()

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
      roles: ['ROLE_ARTIST'],
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
      className="relative p-8 bg-white dark:bg-slate-900 shadow-light rounded-xl"
    >
      <div className="pb-12">
        <h5 className="text-xl font-semibold dark:text-white text-slate-700">
          Register as an{' '}
          <span className="font-semibold text-primary-blue">Artist</span>
        </h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="w-full flex space-x-10">
            <RegisterInput
              {...register('name', {
                required: 'Name cannot be empty',
              })}
              error={errors.name && errors.name.message}
              label="Artist Name"
              placeholder="Type in the artist name"
              className="flex-grow"
            />
            <RegisterInput
              error={errors.email && errors.email.message}
              {...register('email', {
                required: 'Email cannot be empty',
                pattern: {
                  message: 'Invalid email address',
                  value:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                },
              })}
              type="email"
              label="Email Address"
              placeholder="Type in the email address"
              className="flex-grow"
            />
          </div>
          <div className="w-full mt-5 space-x-10 flex">
            <RegisterInput
              error={errors.password && errors.password.message}
              {...register('password', {
                required: 'Password cannot be empty',
              })}
              label="Password"
              showPassword
              type={'password'}
              placeholder="Enter a password"
              className="flex-grow"
            />
            <RegisterInput
              error={errors.cpassword && errors.cpassword.message}
              {...register('cpassword', {
                required: 'Confirm password cannot be empty',
              })}
              label="Confirm Password"
              type={'password'}
              className="flex-grow"
            />
          </div>
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
          <div className="flex flex-col items-start justify-between w-full lg:flex-row">
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  {...register('acceptTerms', {
                    required: 'Accept Terms & Conditions to Continue',
                  })}
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  required
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
            <button
              type="submit"
              className="px-20 flex justify-center items-center w-full lg:w-5/12 h-[50px] font-normal text-white transition-all duration-150 bg-left bg-[length:200%_200%]  bg-no-repeat rounded-xl bg-gradient-to-r from-primary-blue to-[#3f43c9] hover:bg-right  active:scale-[99%]"
            >
              <div className="absolute">
                {loading ? (
                  <SpinnerCircular
                    size={40}
                    secondaryColor={'transparent'}
                    color="#fff"
                  />
                ) : (
                  'Register'
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

export default ArtistRegisterForm
