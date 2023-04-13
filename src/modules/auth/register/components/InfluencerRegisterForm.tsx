import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RegisterInput } from 'components/Input/RegisterInput'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { SocialLinkInput } from 'components/Input/SocialLinkInput'
import Link from 'next/link'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const InfluencerRegisterForm = () => {
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
          Register as an{' '}
          <span className="text-primary-magenta">Influencer</span>
        </h5>
      </div>
      <form>
        <div className="flex flex-col lg:flex-row lg:space-x-10">
          <div className="flex-grow ">
            <RegisterInput
              type="text"
              label="Influencer Name"
              placeholder="Type in the influencer name"
            />

            <RegisterInput
              className="mt-5"
              type="email"
              label="Email Address"
              placeholder="Type in the email address"
            />
          </div>
          <div className="flex-grow">
            <RegisterInput
              label="Password"
              showPassword
              type={'password'}
              className="mt-5 lg:mt-0"
              placeholder="Enter a password"
            />
            <RegisterInput
              label="Confirm Password"
              type={'password'}
              placeholder="Re-Enter the password"
              className="mt-5"
            />
          </div>
        </div>
        <div className="py-8">
          <hr />
        </div>
        <div>
          <label className="text-sm text-gray-500">Other Socials</label>
          <div className="flex flex-col w-full lg:space-x-10 lg:flex-row">
            <div className="w-full mt-4 lg:w-1/2">
              <SocialLinkInput
                placeholder="TikTok"
                icon={faTiktok as IconProp}
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
            <button className="px-20 w-full lg:w-4/12 py-3 font-normal text-white transition-all duration-150 bg-left bg-[length:200%_200%]  bg-no-repeat rounded-xl bg-gradient-to-r from-[#8b12d8] to-[#c93fc0] hover:bg-right  active:scale-[99%]">
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

export default InfluencerRegisterForm
