import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import AppLayout from 'core/layouts/AppLayout'
import { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, MotionProps } from 'framer-motion'
import { ROLE } from 'core/types'
import SettingsProfilePic from 'components/Input/SettingProfilePic'
import SettingUpdatePassword from 'components/Input/SettingUpdatePassword'
import SettingInputText from 'components/Input/SettingInputText'
import SettingTextArea from 'components/Input/SettingTextArea'
import { fetchUser } from 'redux/slices/auth'
import { COMMON_API } from 'data'
import toast from 'react-hot-toast'
import { SocialSettings } from 'modules/common/SocialSettings'

const tabs = [{ name: 'General', href: 'general', current: true }]

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

interface SettingsPageProps {
  spotify: {
    user: {
      country: string
      display_name: string
      email: string
      explicit_content: { filter_enabled: boolean; filter_locked: boolean }
      external_urls: { spotify: string }
      followers: { href: string; total: number }
      href: string
      id: string
      images: {
        url: string
      }[]
      product: string
      type: string
      uri: string
      error?: any
    }
    error?: any
  }
}

const SettingsPage = ({}: SettingsPageProps) => {
  const profile = useAppSelector((state) => state.authReducer.me)
  const router = useRouter()
  const tabValue = router.query['tab']

  const isTabGeneral =
    tabValue === tabs[0].href || tabValue === null || tabValue === undefined
  // const isTabPayments = tabValue === tabs[1].href;

  // const handleLoginSpotify = async () => {
  //   window.location.href = `/api/spotify/login?redirect=${router.pathname}`
  // }

  const dispatch = useAppDispatch()

  async function updateName(name: string) {
    try {
      const res = await COMMON_API.updateName({
        name,
        description: profile.description,
        genres: [],
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
        genres: [],
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

  return (
    <div className="relative max-w-4xl mx-auto mb-20 md:px-8 xl:px-0">
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
              </div>
            </div>
          </div>

          {/*<div>*/}
          {/*  <div className="mt-10 divide-y divide-gray-200">*/}
          {/*    <div className="space-y-1">*/}
          {/*      <h3 className="text-lg font-medium leading-6 text-gray-900">*/}
          {/*        Account*/}
          {/*      </h3>*/}
          {/*      <p className="max-w-2xl text-sm text-gray-500">*/}
          {/*        Manage how information is displayed on your account.*/}
          {/*      </p>*/}
          {/*    </div>*/}
          {/*    <div className="mt-6">*/}
          {/*      <dl className="divide-y divide-gray-200">*/}
          {/*        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">*/}
          {/*          <dt className="text-sm font-medium text-gray-500">*/}
          {/*            Language*/}
          {/*          </dt>*/}
          {/*          <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">*/}
          {/*            <span className="flex-grow">English</span>*/}
          {/*            <span className="flex-shrink-0 ml-4">*/}
          {/*              <button*/}
          {/*                type="button"*/}
          {/*                className="font-medium text-purple-600 bg-white rounded-md hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"*/}
          {/*              >*/}
          {/*                Update*/}
          {/*              </button>*/}
          {/*            </span>*/}
          {/*          </dd>*/}
          {/*        </div>*/}
          {/*      </dl>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div>
            <SocialSettings />
          </div>
        </motion.section>
      )}
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   let spotifyUser = null

//   const response = await fetch(`${URLS.BASE_URL}/api/spotify/me`, {
//     method: 'GET',
//     headers: req.headers as any,
//   })

//   const data = await response.json()

//   spotifyUser = data

//   return {
//     props: {
//       spotify: {
//         user: !data['error'] ? data : null,
//         error: data['error'] ?? null,
//       },
//     },
//   }
// }

SettingsPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default SettingsPage
