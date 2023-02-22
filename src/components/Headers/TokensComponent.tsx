import { IoWalletOutline } from 'react-icons/io5'
import { Popover, Transition } from '@headlessui/react'
import { FC, Fragment } from 'react'
import classNames from 'classnames'

interface Props {
  dropdown: boolean
  me?: any
}

const TokensDropdown: FC<Props> = ({ dropdown, me }) => {
  return (
    <>
      {dropdown ? (
        <Popover className={'relative'}>
          {({ open }) => (
            <>
              <Popover.Button
                as="button"
                className={classNames(
                  open
                    ? 'bg-green-100 hover:bg-green-100'
                    : 'bg-green-50 hover:bg-green-100',
                  'px-5 py-1.5 text-xs  cursor-pointer  flex items-center space-x-2  md:text-sm border-[1.9px] select-none rounded-full font-title border-primary-green border-opacity-40  text-primary-green'
                )}
              >
                <div>
                  <IoWalletOutline size={18} />
                </div>
                <div>Tokens : 100</div>
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
                <Popover.Panel className="absolute z-10 px-4 transform -translate-x-1/2 left-1/2 sm:px-0 w-[200px]">
                  <div className="px-4 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-normal">
                    <span className="text-xs text-gray-400">Token Balance</span>
                    <p className="text-2xl font-medium text-primary-green">
                      100
                      <span className="ml-1 text-sm text-gray-500">
                        ($5.99)
                      </span>
                    </p>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ) : (
        <div
          className={classNames(
            'px-5 py-1.5 text-xs  bg-green-50 hover:bg-green-100 flex items-center space-x-2  md:text-sm border-[1.9px] select-none rounded-full font-title border-primary-green border-opacity-40  text-primary-green'
          )}
        >
          <div>
            <IoWalletOutline size={18} />
          </div>
          <div>Tokens : {me?.tokens}</div>
        </div>
      )}
    </>
  )
}

export default TokensDropdown
