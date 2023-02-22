import { Popover } from '@headlessui/react'
import { motion } from 'framer-motion'
import { ChangeEvent, FC, useState } from 'react'
import { ChevronDown, DollarSign, Image as ImageIcon } from 'react-feather'

import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { setCompletedStep, setStep } from 'redux/slices/submitWallet'
import toast from 'react-hot-toast'
import { IoLogoPaypal, IoWalletOutline } from 'react-icons/io5'
import { BsCreditCardFill } from 'react-icons/bs'
import PricingTable from '../../PricingTable'

interface IErrorMsg {
  show: boolean
  message: string
}
interface Props {
  tokens?: number
  total?: number
  error?: IErrorMsg
  setTokens?: (val) => void
  setTotal?: (val) => void
  setError?: (val) => void
}

const StepOne: FC = ({
  tokens,
  total,
  error,
  setTokens,
  setTotal,
  setError,
}: Props) => {
  const authState = useAppSelector((state) => state.authReducer)

  const dispatch = useAppDispatch()

  const handleNext = async () => {
    dispatch(
      setCompletedStep({
        step: 1,
        completed: true,
      })
    )
    dispatch(setStep(2))
  }

  const onTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _tokens = event.target.value
    const _tokensNumber = Number.parseInt(_tokens)

    if (_tokensNumber == NaN) {
      setTokens(0)
      setTotal(0)
      return
    }

    setError({
      show: false,
      message: '',
    })
    setTokens(_tokensNumber)
    const _total = _tokensNumber
    setTotal(_total)
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex-grow"
      >
        <section className="flex flex-row flex-wrap">
          <div className="w-full 2xl:w-5/12">
            <div className="mt-4 lg:pr-10">
              <form className="space-y-8">
                <div className="flex items-center w-full space-x-5">
                  <div className="min-w-[150px] text-right">
                    <p className="text-sm font-medium ">Token balance</p>
                  </div>
                  <div className="flex-grow">
                    <Popover className="relative">
                      <Popover.Button className={'w-full'}>
                        <div className="flex items-center justify-between w-full min-h-[66px] pl-3 pr-6 space-x-3 bg-white rounded-full min-w-max shadow-normal">
                          <div className="flex items-center space-x-3">
                            <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full bg-green-50 text-primary-green">
                              <IoWalletOutline
                                className="text-primary-green"
                                size={30}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-xl">
                                {authState?.me?.tokens}
                              </span>
                              <span className="text-xs text-gray-500">
                                Tokens
                              </span>
                            </div>
                          </div>
                          {/* <div>
                          <ChevronDown />
                        </div> */}
                        </div>
                      </Popover.Button>
                    </Popover>
                  </div>
                </div>
                <div className="flex items-center w-full space-x-5">
                  <div className="min-w-[150px] text-right">
                    <p className="text-sm font-medium ">Choose Method</p>
                  </div>
                  <div className="flex-grow">
                    <Popover className="relative">
                      <Popover.Button className={'w-full'}>
                        <div className="flex select-none items-center justify-between w-full min-h-[66px] pl-3 pr-6 space-x-3 bg-white rounded-full min-w-max shadow-normal">
                          <div className="flex items-center space-x-3">
                            <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full bg-[#007ac131]">
                              <BsCreditCardFill
                                className="text-[#00457C]"
                                size={30}
                              />
                            </div>
                            <div className="flex flex-col items-start justify-start">
                              <span className="text-xl">Master/Visa Card</span>
                            </div>
                          </div>
                          <div>
                            <ChevronDown className="text-primary-blue" />
                          </div>
                        </div>
                      </Popover.Button>
                      <Popover.Panel className={'absolute w-full left-0 z-10'}>
                        <div className="px-3 py-4 mt-2 bg-white rounded-2xl shadow-normal">
                          <div className="flex items-center justify-between w-full min-h-[66px] pl-3 pr-6 space-x-3 bg-white hover:bg-gray-50 cursor-pointer select-none rounded-full min-w-max ">
                            <div className="flex items-center space-x-3">
                              <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full bg-[#007ac131]">
                                <BsCreditCardFill
                                  className="text-[#00457C]"
                                  size={30}
                                />
                              </div>
                              <div className="flex flex-col items-start justify-start">
                                <span className="text-xl">
                                  Master/Visa Card
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-4 mt-2 bg-white rounded-2xl shadow-normal pointer-events-none">
                          <div className="flex items-center justify-between w-full min-h-[66px] pl-3 pr-6 space-x-3 bg-white hover:bg-gray-50 cursor-pointer select-none rounded-full min-w-max ">
                            <div className="flex items-center space-x-3">
                              <div className="w-[50px] flex items-center justify-center h-[50px] rounded-full bg-[#007ac131]">
                                <IoLogoPaypal
                                  className="text-[#00457C]"
                                  size={30}
                                />
                              </div>
                              <div className="flex flex-col items-start justify-start">
                                <span className="text-xl">PayPal</span>
                                <span className="text-xs text-gray-500">
                                  from 3.99%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  </div>
                </div>

                <div>
                  <div className="flex items-center w-full space-x-5">
                    <div className="min-w-[150px] text-right">
                      <p className="text-sm font-medium ">Tokens</p>
                    </div>
                    <div className="flex flex-col flex-grow space-x-3 ">
                      <div className="min-h-[66px] w-1/2  flex items-center justify-center px-3 bg-white rounded-full shadow-normal">
                        <input
                          onChange={onTokenChange}
                          defaultValue={tokens}
                          type="number"
                          min="1"
                          className="text-xl bg-transparent w-[80%] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-5">
                    <div className="min-w-[150px] text-right"></div>
                    <span className="mt-3 text-sm text-red-500">
                      {error.show && error.message}
                    </span>
                  </div>
                </div>

                <div className="flex items-center w-full space-x-5">
                  <div className="min-w-[150px] text-right">
                    <p className="text-sm font-medium ">Total</p>
                  </div>
                  <div className="flex flex-grow space-x-3">
                    <div className="min-h-[66px] w-1/2 flex items-center justify-center px-3 bg-white rounded-full shadow-normal">
                      <DollarSign className="text-primary-magenta" />
                      <input
                        value={total.toFixed(2)}
                        readOnly
                        type="number"
                        className="text-xl bg-transparent w-[80%] outline-none"
                      />
                    </div>
                    <div className="min-h-[66px] w-4/12 flex items-center justify-center px-3 bg-white rounded-full shadow-normal">
                      <div className="flex items-center space-x-2">
                        <span>USD</span>
                        {/* <ChevronDown className="text-primary-blue" /> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-5">
                  <div className="min-w-[150px] text-right"></div>
                  <button
                    className="min-h-[66px] flex items-center justify-center shadow-none min-w-[150px] hover:bg-primary-blue-dark text-md bg-primary-blue rounded-full text-white mb-5"
                    onClick={handleNext}
                  >
                    Add Tokens
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center w-full mt-4 lg:mt-0 2xl:w-7/12">
            {/*<PricingTable />*/}
          </div>
        </section>
      </motion.section>
    </>
  )
}

export default StepOne
