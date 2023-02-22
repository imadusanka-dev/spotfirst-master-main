import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { SubmitSongStepInfo } from 'modules/common/SubmitSongStepInfo'
import { ReactElement, useState } from 'react'

const platforms = [
  {
    id: 1,
    name: 'Pending Shares',
  },
]

const LabelHome = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(0)
  return (
    <div className="w-full">
      <section className="flex items-center justify-between px-8 py-4 rounded-md shadow-normal">
        <h5 className="font-normal">New Submissions</h5>

        <div className="relative">
          <Listbox value={selectedPlatform} onChange={setSelectedPlatform}>
            <div className="flex items-center space-x-3">
              <Listbox.Button
                className={
                  'px-5 py-2 bg-primary-blue bg-opacity-5 space-x-2 rounded-button flex items-center justify-center text-sm text-primary-blue'
                }
              >
                <span>{platforms[selectedPlatform].name}</span>
                <span>
                  <ChevronDownIcon className="w-5 h-5" />
                </span>
              </Listbox.Button>
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
              <Listbox.Options className="absolute right-0 z-10 py-1 mt-1 overflow-auto text-sm bg-white border rounded-lg w-30 border-opacity-20 border-primary-blue shadow-light max-h-60 focus:outline-none sm:text-sm">
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
        </div>
      </section>
      <SubmitSongStepInfo />
    </div>
  )
}

LabelHome.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default LabelHome
