import classNames from 'classnames'
import { useAppSelector } from 'core/hooks/useRedux'
import AppLayout from 'core/layouts/AppLayout'

import { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, MotionProps } from 'framer-motion'
import AvailabilityTab from 'modules/label/settings/availablility'
import GenresTab from 'modules/label/settings/genres'
import { ROLE } from 'core/types'

import SettingInputText from 'components/Input/SettingInputText'
import toast from 'react-hot-toast'
import { COMMON_API } from 'data'
import { useDispatch } from 'react-redux'
import { fetchUser } from 'redux/slices/auth'
import SettingsProfilePic from 'components/Input/SettingProfilePic'
import SettingUpdatePassword from 'components/Input/SettingUpdatePassword'
import SettingTextArea from 'components/Input/SettingTextArea'
import { SocialSettings } from 'modules/common/SocialSettings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Select from 'components/Select/Select'
import axios from 'axios'

const tabs = [
  { name: 'General', href: 'general', current: true },
  { name: 'Genres', href: 'genres', current: false },
  { name: 'Availability', href: 'availability', current: false },
]

const options = [
  { value: '1', label: '1 Token' },
  { value: '2', label: '2 Tokens' },
  { value: '3', label: '3 Tokens' },
]

const transitionProps: MotionProps = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
}

const SettingsPage = () => {
  const profile = useAppSelector((state) => state.authReducer.me)
  const router = useRouter()
  const tabValue = router.query['tab']

  const dispatch = useDispatch()

  const isTabGeneral =
    tabValue === tabs[0].href || tabValue === null || tabValue === undefined
  const isTabAvailability = tabValue === tabs[2].href
  const isTabGenres = tabValue === tabs[1].href

  async function updateName(name: string) {
    try {
      const res = await COMMON_API.updateName({
        name,
        description: profile.description,
        genres: profile.genres,
        links: profile.social,
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

  async function updateDescription(description: string) {
    try {
      const res = await COMMON_API.updateName({
        name: profile.name,
        description,
        genres: profile.genres,
        links: profile.social,
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

  const connectWithSpotify = async () => {
    try {
      const response = await axios.post('/api/spotify/login')
      window.location.assign(response.data?.url)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
      <div>
        <h4 className="text-xl text-slate-800 dark:text-white">Settings</h4>
      </div>
      <section>
        <div className="mt-3 sm:mt-4">
          <div className="">
            <nav className="flex -mb-px space-x-8">
              {tabs.map((tab, index) => {
                const isActive =
                  tab.href === tabValue ||
                  (tabValue === undefined && tab.href === 'general')
                return (
                  <Link
                    key={index}
                    href={{ query: { tab: tab.href } }}
                    className={classNames(
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                      'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
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
      </section>

      {/* General Settings */}
      {isTabGeneral && (
        <motion.section {...transitionProps}>
          <div>
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="max-w-2xl text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              <div className="mt-6">
                <dl className="divide-y divide-gray-200">
                  <SettingInputText
                    update={async (value) => {
                      updateName(value)
                    }}
                    placeholder="Enter your name"
                    name="name"
                    label="Name"
                    value={profile.name}
                  />
                  <SettingsProfilePic profile={profile} />
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">{profile.email}</span>
                      {/* <span className="flex-shrink-0 ml-4">
                        <button
                          type="button"
                          className="font-medium bg-white rounded-md text-primary-magenta hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update
                        </button>
                      </span> */}
                    </dd>
                  </div>
                  <SettingUpdatePassword />
                  <SettingTextArea
                    update={async (value) => {
                      updateDescription(value)
                    }}
                    placeholder="Enter description"
                    name="description"
                    label="Description"
                    value={profile.description}
                  />
                </dl>
                <button
                  onClick={connectWithSpotify}
                  className="flex items-center justify-center mb-5 px-5 py-2.5 mt-4 space-x-2 text-sm font-normal text-white transition-all duration-150 bg-black  rounded-lg "
                >
                  <span className="w-6 h-6">
                    <FontAwesomeIcon
                      color="#fff"
                      size="2x"
                      icon={faSpotify as IconProp}
                    />
                  </span>
                  <span>Connect with Spotify</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Account
                </h3>
                <p className="max-w-2xl text-sm text-gray-500">
                  Manage how information is displayed on your account.
                </p>
              </div>
              <div className="mt-6">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Language
                    </dt>
                    <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span className="flex-grow">English</span>
                      <span className="flex-shrink-0 ml-4">
                        <button
                          type="button"
                          className="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-10 divide-y divide-gray-200">
              <div className="space-y-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Pricing
                </h3>
                <p className="max-w-2xl text-sm text-gray-500">
                  Manage your pricing plan.
                </p>
              </div>
              <div className="mt-6">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 flex items-center">
                    <dt className="text-sm font-medium text-gray-500">
                      Pricing Plan
                    </dt>
                    <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 items-center">
                      <span className="flex-grow">
                        <div className="w-1/2">
                          <Select
                            options={options}
                            defaultValue={options[0]}
                            disabled={true}
                          />
                        </div>
                      </span>
                      <span className="flex-shrink-0 ml-4">
                        <button
                          type="button"
                          className="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div>
            <SocialSettings />
          </div>
        </motion.section>
      )}

      {isTabGenres && (
        <motion.section {...transitionProps}>
          <GenresTab />
        </motion.section>
      )}
      {/* Availability Settings  */}
      {isTabAvailability && (
        <motion.section {...transitionProps}>
          <AvailabilityTab />
        </motion.section>
      )}
    </div>
  )
}

SettingsPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default SettingsPage
