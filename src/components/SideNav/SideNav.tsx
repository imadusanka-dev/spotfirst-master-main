import React, { FC } from 'react'
import { motion } from 'framer-motion'
import {
  Archive,
  Check,
  DollarSign,
  HelpCircle,
  Home,
  Icon,
  MessageCircle,
  Settings,
  Star,
  Users,
  XOctagon,
  FileText,
} from 'react-feather'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PlusIcon } from '@heroicons/react/outline'
import { IoWalletOutline } from 'react-icons/io5'
import { IconType } from 'react-icons'
import { ROLE } from 'core/types'
import { roleNameToPath } from 'core/utils'
import TopTenTracks from './TopTenTracks'

type SideNavProps = {
  isVisible?: boolean
  sideNavToggleCallback?: () => void
  role: ROLE
}

const artistRoutes = [
  {
    route: '/artist',
    title: 'Home',
    icon: Home,
  },
  {
    route: '/artist/submit',
    title: 'Submit A Song',
    icon: Star,
  },
  {
    route: '/artist/previous-submissions',
    title: 'Previous Submissions',
    icon: Archive,
  },
  {
    route: '/artist/wallet',
    title: 'Wallet',
    iconElement: IoWalletOutline,
  },
  {
    route: '/chat',
    title: 'Chat',
    icon: MessageCircle,
  },
]

const adminRoutes = [
  {
    route: '/admin',
    title: 'Home',
    icon: Home,
  },
  {
    route: '/admin/users',
    title: 'Users',
    icon: Users,
  },
]

const labelRoutes = [
  {
    route: '/label',
    title: 'Home',
    icon: Home,
  },
  {
    route: '/label/new-submissions',
    title: 'New Submissions',
    icon: Star,
  },
  {
    route: '/label/approved',
    title: 'Approved',
    icon: Check,
  },
  {
    route: '/label/rejected',
    title: 'Rejected',
    icon: XOctagon,
  },
  {
    route: '/label/submit',
    title: 'Submit A Song',
    icon: Star,
  },
  {
    route: '/label/previous-submissions',
    title: 'Previous Submissions',
    icon: Archive,
  },
  {
    route: '/chat',
    title: 'Chat',
    icon: MessageCircle,
  },
]

const SideNav: FC<SideNavProps> = ({ isVisible = true, role }) => {
  const router = useRouter()

  return (
    <motion.div
      animate={{
        // opacity: isVisible ? 1 : 0,
        width: isVisible ? 250 : 0,
      }}
      className="absolute pb-[80px] z-10 flex flex-col w-0 h-full overflow-auto bg-white border-r dark:border-slate-800 md:relative dark:bg-slate-900 lg:w-[250px]"
    >
      <div className="min-h-[60px] px-3 flex items-center justify-between bg-slate-50 dark:bg-slate-900 dark:border-slate-800 border-b">
        <div className="flex items-center">
          <span className="font-medium font-title">SpotFirst</span>
        </div>
        {/* <button
          onClick={() => sideNavToggleCallback()}
          className="cursor-pointer"
        >
          <X className="text-primary-blue" strokeWidth={2} size={25} />
        </button> */}
      </div>
      <motion.div
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        className="relative h-full overflow-hidden bg-white divide-y"
      >
        <div className="relative">
          <div className="flex left-0 top-0 w-[250px] flex-col">
            {role === 'ROLE_ADMIN' &&
              adminRoutes.map((item, index) => (
                <SideNavLink
                  key={index}
                  href={item.route}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            {role === 'ROLE_ARTIST' &&
              artistRoutes.map((item, index) => (
                <SideNavLink
                  iconElement={item.iconElement}
                  key={index}
                  href={item.route}
                  title={item.title}
                  icon={item.icon}
                />
              ))}

            {role === 'ROLE_LABEL' &&
              labelRoutes.map((item, index) => (
                <SideNavLink
                  key={index}
                  href={item.route}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
          </div>
        </div>
        {role === 'ROLE_ARTIST' && <TopTenTracks />}
        {/* {role === 'ROLE_LABEL' && (
          <div className="px-4 py-4">
            <div>
              <p className="text-sm text-gray-700">User Accounts</p>

              <ul className="mt-4 max-h-[300px] ">
                {[...Array(4)].map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center px-2 py-1 space-x-2 transition-all rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <div className="w-6  h-6 min-w-[30px] min-h-[30px] rounded-full bg-primary-blue"></div>
                      <p className="text-xs">Username {item}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <a className="block pt-3 text-gray-500 cursor-pointer hover:text-primary-blue">
                <div className="flex items-center space-x-2">
                  <PlusIcon className="w-5 h-5" />
                  <span className="text-xs">Add Account</span>
                </div>
              </a>
            </div>
          </div>
        )} */}

        <div className="w-full">
          <Link
            href={`/${roleNameToPath(role)}/settings`}
            className={classNames(
              `${
                router.pathname === `/${roleNameToPath(role)}/settings`
                  ? 'text-primary-blue bg-gray-50'
                  : ''
              }`,
              'px-5 py-3 w-full hover:bg-gray-50 block cursor-pointer transition-all duration-150'
            )}
          >
            <div className="flex items-center">
              <Settings
                size={18}
                className={classNames(
                  `${
                    router.pathname === `/${roleNameToPath(role)}}/settings`
                      ? 'text-primary-blue'
                      : 'text-primary-blue'
                  }`,
                  'mr-3 '
                )}
              />
              <span className="text-xs font-title">Settings</span>
            </div>
          </Link>
          {role === 'ROLE_LABEL' && (
            <Link
              href={`/${roleNameToPath(role)}/payments`}
              className={classNames(
                `${
                  router.pathname === `/${roleNameToPath(role)}/payments`
                    ? 'text-primary-blue bg-gray-50'
                    : ''
                }`,
                'px-5 py-3 w-full hover:bg-gray-50 block cursor-pointer transition-all duration-150'
              )}
            >
              <div className="flex items-center">
                <DollarSign
                  size={18}
                  className={classNames(
                    `${
                      router.pathname === `/${roleNameToPath(role)}}/payments`
                        ? 'text-primary-blue'
                        : 'text-primary-blue'
                    }`,
                    'mr-3 '
                  )}
                />
                <span className="text-xs font-title">Payments</span>
              </div>
            </Link>
          )}
          <Link
            href={`/${roleNameToPath(role)}}/help`}
            className={classNames(
              `${
                router.pathname === `/${roleNameToPath(role)}}/help`
                  ? 'text-primary-blue bg-gray-50'
                  : ''
              }`,
              'px-5 py-3 w-full hover:bg-gray-50 block cursor-pointer transition-all duration-150'
            )}
          >
            <div className="flex items-center">
              <HelpCircle
                size={18}
                className={classNames(
                  `${
                    router.pathname === `/${roleNameToPath(role)}}/settings`
                      ? 'text-primary-blue'
                      : 'text-primary-blue'
                  }`,
                  'mr-3 '
                )}
              />
              <span className="text-xs font-title">Help</span>
            </div>
          </Link>
          <Link
            href={`/about`}
            className={classNames(
              `${
                router.pathname === `/about`
                  ? 'text-primary-blue bg-gray-50'
                  : ''
              }`,
              'px-5 py-3 w-full hover:bg-gray-50 block cursor-pointer transition-all duration-150'
            )}
          >
            <div className="flex items-center">
              <FileText
                size={18}
                className={classNames(
                  `${
                    router.pathname === `/about`
                      ? 'text-primary-blue'
                      : 'text-primary-blue'
                  }`,
                  'mr-3 '
                )}
              />
              <span className="text-xs font-title">About</span>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

type SideNavLinkProps = {
  title: string
  icon: Icon
  iconElement?: IconType
  href?: string
}

const SideNavLink: FC<SideNavLinkProps> = ({
  icon,
  title,
  href,
  iconElement,
}) => {
  const router = useRouter()
  const isActive = router.pathname === href

  const Icon = icon
  const IconElement = iconElement

  return (
    <>
      <Link
        href={href ?? ''}
        className={classNames(
          `${
            isActive
              ? ' bg-gradient-to-r from-primary-blue to-primary-green  text-white'
              : 'hover:bg-slate-50 dark:hover:bg-slate-800'
          }`,
          'px-5 py-3 cursor-pointer transition-all duration-150'
        )}
      >
        <div className="flex items-center">
          {icon && (
            <Icon
              size={18}
              className={classNames(
                `${isActive ? 'text-white' : 'text-primary-blue'}`,
                'mr-3 '
              )}
            />
          )}

          {IconElement ? (
            <IconElement
              className={classNames(
                `${isActive ? 'text-white' : 'text-primary-blue'}`,
                'mr-3 '
              )}
              size={18}
            />
          ) : null}
          <span className="text-xs font-title">{title}</span>
        </div>
      </Link>
    </>
  )
}

export default SideNav
