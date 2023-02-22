import { COLORS } from 'core/constants'
import { useLocalStorage } from 'core/hooks/useLocalStorage'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { ROLE } from 'core/types'
import { useTheme } from 'next-themes'
import { FC, Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { Bell, Menu as MenuIcon, MessageCircle, Search } from 'react-feather'

import TokensDropdown from './TokensComponent'
import { LogoutIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { logout } from 'redux/slices/auth'
import Link from 'next/link'
import Image from 'next/legacy/image'

type HeaderProps = {
  role?: ROLE
  isVisible?: boolean
  sideNavToggleCallback?: () => void
}

const Header: FC<HeaderProps> = ({
  isVisible,
  sideNavToggleCallback,
  role,
}) => {
  const { theme, setTheme, systemTheme } = useTheme()
  const { storedValue } = useLocalStorage('system_theme', false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const me = useAppSelector((state) => state.authReducer.me)

  useEffect(() => {
    if (storedValue === true && systemTheme) {
      setTheme(systemTheme)
    }
  }, [theme, systemTheme])

  return (
    <header className="min-h-[60px] h-[60px] w-full px-3 flex items-center justify-between bg-slate-50 dark:bg-slate-900 dark:border-slate-800 border-b">
      <div className="flex items-center justify-between w-full lg:px-5">
        <div className="flex items-center">
          {!isVisible && (
            <div className="mr-4">
              <button
                onClick={sideNavToggleCallback}
                className="flex items-center justify-center"
              >
                <MenuIcon color={COLORS['primary-blue'].DEFAULT} />
              </button>
            </div>
          )}
          {/* COMMENTED DUE TO MIGRATE */}
          {/* <div className="hidden lg:flex">
            <span className="mr-3 text-primary-blue">
              <Search size={20} />
            </span>
            <input
              type="text"
              className="text-sm bg-transparent outline-none font-title"
              placeholder="Looking for something?"
            />
          </div> */}
        </div>

        <div className="flex items-center">
          <div className="mr-10">
            <TokensDropdown dropdown={role === 'ROLE_LABEL'} me={me} />
          </div>
          <div className="mr-1">
            <button className="p-2 transition-all duration-100 ease-in-out rounded-lg text-slate-500 dark:hover:text-slate-300 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-200 hover:bg-opacity-50">
              <Bell size={18} />
            </button>
          </div>
          <div className="mr-1">
            <Link passHref href={'/chat'}>
              <button className="p-2 transition-all relative duration-100 ease-in-out rounded-lg text-slate-500 dark:hover:text-slate-300 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-200 hover:bg-opacity-50">
                <MessageCircle size={18} />
                <span className="absolute w-2 h-2 top-2 right-2 rounded-full bg-red-500"></span>
              </button>
            </Link>
          </div>
          {/* <div className="mr-3">
            {!storedValue && (
              <div>
                {theme === "light" ? (
                  <button
                    onClick={() => {
                      setTheme("dark");
                    }}
                    className="p-2 transition-all duration-100 ease-in-out rounded-lg text-slate-500 dark:hover:text-slate-300 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-200 hover:bg-opacity-50"
                  >
                    <Moon size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setTheme("light");
                    }}
                    className="p-2 transition-all duration-100 ease-in-out rounded-lg text-slate-500 dark:hover:text-slate-300 hover:text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:bg-opacity-50"
                  >
                    <Sun size={18} />
                  </button>
                )}
              </div>
            )}
          </div> */}
          <Menu as="div">
            <Menu.Button>
              <div className="flex items-center hover:bg-primary-blue select-none cursor-pointer hover:bg-opacity-5 px-3 py-2 rounded-lg">
                <div className=" w-[35px] h-[35px] relative bg-primary-blue overflow-hidden rounded-full min-w-[35px] min-h-[35px] mr-2">
                  {me.profilePicture && (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={me.profilePicture}
                      alt="Profile picture"
                      className="w-full h-full"
                    />
                  )}
                </div>
                <div className="hidden capitalize text-sm md:block text-primary-blue font-title">
                  {me.name}
                </div>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute z-10 overflow-hidden right-0 mt-2 w-40 mr-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <button
                    onClick={() => {
                      dispatch(logout()).then(() => {
                        router.push('/home')
                      })
                    }}
                    className="inline-flex space-x-2 px-2 py-2 transition-all hover:bg-primary-blue hover:bg-opacity-5 w-full"
                  >
                    <LogoutIcon className="w-5 h-5 text-primary-blue" />
                    <span className="text-sm text-gray-600">Logout</span>
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  )
}

export default Header
