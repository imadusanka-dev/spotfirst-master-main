import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { ARTIST_API } from 'data'
import { Submission } from 'core/types'
import { motion } from 'framer-motion'
import { Fragment, useEffect, useState } from 'react'
import { Search } from 'react-feather'

import { SpinnerCircular } from 'spinners-react'
import { PreviousSubmissionItem } from './PreviousSubmissionItem'
import Image from 'next/legacy/image'

const sortings = [
  { id: 1, name: 'Submissions: High to Low' },
  { id: 2, name: 'Submissions: Low to High' },
  { id: 3, name: 'Responses: Low to High' },
  { id: 4, name: 'Responses: Low to High' },
]

export const PreviousSubmissions = () => {
  const [selectedSorting, setSelectedSorting] = useState(sortings[0])
  const [submissions, setSubmissions] = useState<{
    data: Submission[]
    isFetching: boolean
  }>({
    data: [],
    isFetching: true,
  })

  useEffect(() => {
    ARTIST_API.previousSubmissions(1, 30)
      .then((res) => {
        setSubmissions({
          data: res.payload,
          isFetching: false,
        })
      })
      .catch(console.log)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center justify-between py-3 border-t border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="flex items-center px-4 py-1.5 border rounded-full">
            <Search size={20} className="mr-2 text-primary-blue" />
            <input
              className="outline-none select-none placeholder:text-sm"
              placeholder="Search by name"
              type="text"
            />
          </div>
        </div>
        <Listbox value={selectedSorting} onChange={setSelectedSorting}>
          {({ open }) => (
            <div className="flex items-center">
              <Listbox.Label className="block text-sm font-medium text-slate-700">
                Sort by:
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white cursor-pointer focus:outline-none sm:text-sm">
                  <span className="block truncate">{selectedSorting.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-slate-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {sortings.map((sort) => (
                      <Listbox.Option
                        key={sort.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? 'text-white bg-primary-blue'
                              : 'text-slate-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={sort}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'block truncate'
                              )}
                            >
                              {sort.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-primary-blue',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
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
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>
      </div>

      {submissions.isFetching && (
        <div className="flex w-full justify-center items-center h-[100px]">
          <div className="flex space-x-4 items-center">
            <SpinnerCircular
              size={40}
              secondaryColor={'transparent'}
              color="#1980F5"
            />
            <span className="text-primary-blue">Loading...</span>
          </div>
        </div>
      )}

      {!submissions.isFetching && submissions.data.length == 0 && (
        <div className="flex w-full justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col min-h-[300px] justify-center  space-x-4 items-center"
          >
            <div className="relative">
              <Image
                src={'/images/no-items.png'}
                layout="fixed"
                alt="No Items"
                quality={100}
                width={120}
                height={120}
              />
            </div>
            <p className="text-slate-500">No previous submissions</p>
          </motion.div>
        </div>
      )}

      <ul role="list" className="divide-y divide-slate-200">
        {!submissions.isFetching &&
          submissions.data.map((sub, index) => (
            <PreviousSubmissionItem key={index} submission={sub} />
          ))}
      </ul>
    </motion.section>
  )
}
