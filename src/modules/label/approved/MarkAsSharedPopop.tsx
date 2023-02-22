import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Button from 'components/Buttons/Button'

export const MarkAsSharedPopup = () => {
  return (
    <>
      <Popover className={'relative w-full'}>
        {({ open }) => (
          <>
            <Popover.Button>
              <Button size="sm">Mark as Shared</Button>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 px-4 transform sm:px-0 ">
                <div className="px-4 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-normal">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Paste shared link here"
                      className="px-2 min-w-[300px] py-1 text-sm rounded-md outline-none bg-gray-50"
                    />
                    <button className="px-2 py-1 ml-2 text-sm rounded-md text-primary-blue bg-opacity-10 bg-primary-blue">
                      Confirm
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}
