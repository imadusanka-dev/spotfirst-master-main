import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faSpotify,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/outline'
import { RegisterInput } from 'components/Input/RegisterInput'
import { SocialLinkInput } from 'components/Input/SocialLinkInput'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface FieldValues {
  name: string
  email: string
  password: string
  cpassword: string
  information: string
  facebook: string
  soundcloud: string
  youtube: string
  instagram: string
  acceptTerms: string
}

const CuratorRegisterForm = () => {
  const platforms = [
    {
      id: 1,
      name: 'Spotify',
      color: '#1ed760',
      icon: faSpotify,
    },
    {
      id: 2,
      name: 'SoundCloud',
      color: '#f70',
      icon: faSoundcloud,
    },
  ]
  const [selectedPlatform, setSelectedPlatform] = useState(0)

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
          Register as a <span className="text-primary-green">Curator</span>
        </h5>
        <p className="text-sm text-slate-400 text-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </p>
      </div>
      <form>
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          <div className="flex-grow w-full lg:w-1/2">
            <RegisterInput
              placeholder="Type in the curator name"
              type="text"
              label="Curator Name"
            />
            <div>
              <label className="flex flex-col mt-5 text-sm text-gray-500">
                Where do you prefer to share
              </label>
              <Listbox value={selectedPlatform} onChange={setSelectedPlatform}>
                <div className="flex items-center mt-3 mb-1 space-x-3">
                  <Listbox.Button
                    className={
                      'px-5 py-1.5 bg-primary-blue bg-opacity-5 space-x-2 rounded-button flex items-center justify-center text-sm text-primary-blue'
                    }
                  >
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={platforms[selectedPlatform].icon as IconProp}
                        color={platforms[selectedPlatform].color}
                      />
                    </div>
                    <span>{platforms[selectedPlatform].name}</span>
                    <span>
                      <ChevronDownIcon className="w-5 h-5" />
                    </span>
                  </Listbox.Button>
                  <button className="flex items-center justify-center text-gray-600 h-9 w-9 bg-gray-50 rounded-button">
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                <Transition
                  as={'div'}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 translate-y-1 scale-90"
                  enterTo="opacity-100 translate-y-0 scale-100"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 translate-y-0 scale-100"
                  leaveTo="opacity-0 translate-y-1 scale-90"
                  className={'relative z-10'}
                >
                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-sm bg-white border rounded-lg lg:w-1/2 border-opacity-20 border-primary-blue shadow-light max-h-60 focus:outline-none sm:text-sm">
                    {platforms.map((platform, index) => {
                      return (
                        <Listbox.Option
                          key={platform.id}
                          className={({ active }) =>
                            `${
                              active
                                ? 'text-primary-blue bg-primary-blue bg-opacity-5'
                                : 'text-primary-blue'
                            }
                          cursor-pointer transition-all select-none relative py-2 pl-10 pr-4`
                          }
                          value={index}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? 'font-medium' : 'font-normal'
                                }  truncate space-x-2 flex items-center`}
                              >
                                <div className="relative">
                                  <FontAwesomeIcon
                                    className="w-4 h-4"
                                    icon={platform.icon as IconProp}
                                    color={platform.color}
                                  />
                                </div>
                                <span>{platform.name}</span>
                              </span>
                              {selected ? (
                                <span
                                  className={`${
                                    active
                                      ? 'text-primary-blue'
                                      : 'text-primary-blue'
                                  }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      )
                    })}
                  </Listbox.Options>
                </Transition>
              </Listbox>
              <RegisterInput
                placeholder="Paste your spotify account url..."
                type="text"
              />
            </div>
          </div>
          <div className="flex-grow w-full lg:w-1/2">
            <RegisterInput
              className="mt-5 lg:mt-0"
              label="Email Address"
              placeholder="Type in the email address"
              type="email"
            />
            <RegisterInput
              className="mt-5"
              label="Password"
              showPassword
              placeholder="Enter a password"
              type="password"
            />
            <RegisterInput
              className="mt-5"
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
                cols={30}
                rows={10}
                className="w-full bg-transparent outline-none rounded-lg placeholder:font-light focus:outline-none focus:ring-1 focus:ring-blue-200 px-5 py-3.5 text-sm text-primary-blue-dark"
                placeholder="Tell us more about your company and your story"
              ></textarea>
            </div>
          </label>
        </div>
        <div className="py-8">
          <hr />
        </div>
        <div>
          <label className="text-sm text-gray-500">Other Socials</label>
          <div className="flex flex-col w-full lg:space-x-10 lg:flex-row">
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                placeholder="Facebook"
                icon={faFacebook as IconProp}
              />
            </div>
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                placeholder="SoundCloud"
                icon={faSoundcloud as IconProp}
              />
            </div>
          </div>
          <div className="flex flex-col w-full lg:flex-row lg:space-x-10">
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                placeholder="YouTube"
                icon={faYoutube as IconProp}
              />
            </div>
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                placeholder="Instagram"
                icon={faInstagram as IconProp}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-end w-full mt-14">
          <div className="flex flex-col items-start justify-between w-full lg:flex-row">
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
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
            <button className="px-20 w-full lg:w-4/12 py-3 font-normal text-white transition-all duration-150 bg-left bg-[length:200%_200%]  bg-no-repeat rounded-xl bg-gradient-to-r from-primary-blue to-[#08a881] hover:bg-right  active:scale-[99%]">
              Apply
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

export default CuratorRegisterForm
