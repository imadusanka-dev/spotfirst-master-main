import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/outline'
import classNames from 'classnames'

import AppLayout from 'core/layouts/AppLayout'
import { ReactElement } from 'react'
import SubmitSongSteps from 'modules/artist/submit_song/SubmitSongSteps'
import StepOne from 'modules/artist/submit_song/Steps/StepOne'
import StepTwo from 'modules/artist/submit_song/Steps/StepTwo'
import GenresFilter from 'modules/artist/submit_song/GenresFilter'
import RatingsFilter from 'modules/artist/submit_song/RatingsFilter'
import PriceFilter from 'modules/artist/submit_song/Tabs/PriceFilter'
import { useAppSelector } from 'core/hooks/useRedux'
import { ROLE } from 'core/types'
import StepThree from 'modules/artist/submit_song/Steps/StepThree'

const SubmitSongPage = () => {
  const step = useAppSelector((state) => state.submitSongSlice.step)

  return (
    <div>
      <div
        className={classNames(
          step !== 3 ? 'max-w-6xl' : 'w-full',
          'relative w-full transition-all  pb-20 mx-auto md:px-8 xl:px-0 '
        )}
      >
        <div className="pb-4">
          <h4 className="text-xl text-slate-800 dark:text-white">
            Submit a Song
          </h4>
        </div>
        <div className={classNames('flex  h-full space-x-5')}>
          <section
            className={classNames(
              step === 3
                ? 'h-full w-[300px] px-5 py-5 rounded-lg shadow-light'
                : '',
              'flex-initial'
            )}
          >
            {step === 3 && (
              <div className="mb-10">
                <Disclosure defaultOpen={true}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg bg-blue-50 text-primary-blue hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-primary-blue focus-visible:ring-opacity-75">
                        <span>Genre</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-primary-blue`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <GenresFilter />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                {/*<Disclosure as="div" className="mt-2">*/}
                {/*  {({ open }) => (*/}
                {/*    <>*/}
                {/*      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg bg-blue-50 text-primary-blue hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-prtext-primary-blue focus-visible:ring-opacity-75">*/}
                {/*        <span>Type</span>*/}
                {/*        <ChevronUpIcon*/}
                {/*          className={`${*/}
                {/*            open ? 'transform rotate-180' : ''*/}
                {/*          } w-5 h-5 text-primary-blue`}*/}
                {/*        />*/}
                {/*      </Disclosure.Button>*/}
                {/*      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500"></Disclosure.Panel>*/}
                {/*    </>*/}
                {/*  )}*/}
                {/*</Disclosure>*/}
                {/*<Disclosure as="div" className="mt-2">*/}
                {/*  {({ open }) => (*/}
                {/*    <>*/}
                {/*      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg bg-blue-50 text-primary-blue hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-prtext-primary-blue focus-visible:ring-opacity-75">*/}
                {/*        <span>Regions</span>*/}
                {/*        <ChevronUpIcon*/}
                {/*          className={`${*/}
                {/*            open ? 'transform rotate-180' : ''*/}
                {/*          } w-5 h-5 text-primary-blue`}*/}
                {/*        />*/}
                {/*      </Disclosure.Button>*/}
                {/*      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500"></Disclosure.Panel>*/}
                {/*    </>*/}
                {/*  )}*/}
                {/*</Disclosure>*/}
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg bg-blue-50 text-primary-blue hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-prtext-primary-blue focus-visible:ring-opacity-75">
                        <span>Price</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-primary-blue`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <PriceFilter />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left rounded-lg bg-blue-50 text-primary-blue hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-prtext-primary-blue focus-visible:ring-opacity-75">
                        <span>Ratings</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-primary-blue`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <RatingsFilter />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            )}
            <SubmitSongSteps />
          </section>
          {step === 1 && <StepOne />}

          {step === 2 && <StepTwo />}

          {step === 3 && <StepThree />}
        </div>
      </div>
    </div>
  )
}

SubmitSongPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default SubmitSongPage
