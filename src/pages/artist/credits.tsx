import Button from 'components/Buttons/Button'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { ReactElement } from 'react'

const CreditsPage = () => {
  return (
    <div>
      <div>
        <h4 className="text-xl text-slate-800 dark:text-white">
          Get more credits
        </h4>
      </div>
      <section className="flex flex-row flex-wrap mt-4">
        <div className="w-full 2xl:w-6/12">
          <div className="mt-10 lg:pr-10">
            <div className="flex flex-col justify-between lg:flex-row">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <input
                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    type="checkbox"
                  />
                  <p className="text-xl text-slate-800">
                    5 Credits{' '}
                    <span className="text-sm text-slate-400">($6)</span>
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    type="checkbox"
                  />
                  <div className="flex flex-col">
                    <p className="text-xl text-slate-800">
                      10 Credits{' '}
                      <span className="text-sm text-slate-400">($10)</span>
                    </p>
                    <p className="text-xs text-slate-400">17% discount</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    defaultChecked={true}
                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    type="checkbox"
                  />
                  <div className="flex flex-col">
                    <p className="text-xl text-slate-800">
                      30 Credits{' '}
                      <span className="text-sm text-slate-400">($27)</span>
                    </p>
                    <p className="text-xs text-slate-400">25% discount</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    type="checkbox"
                  />
                  <div className="flex flex-col">
                    <p className="text-xl text-slate-800">
                      100 Credits{' '}
                      <span className="text-sm text-slate-400">($80)</span>
                    </p>
                    <p className="text-xs text-slate-400">33% discount</p>
                  </div>
                </div>

                <div className="pt-5">
                  <Button>
                    <div className="flex items-center space-x-2">
                      <span>Apply Credits</span>
                      {/* <ChevronRight /> */}
                    </div>
                  </Button>
                </div>
              </div>

              <div className="w-full lg:w-8/12">
                <div className="w-full px-5 py-5 mt-6 bg-white rounded-md lg:mt-0 shadow-normal">
                  <div className="text-xl font-medium text-primary-blue">
                    Credits: 30
                  </div>
                  <div className="text-slate-800">Total USD $27.00</div>
                  <div className="mt-4">
                    <div className="flex flex-row items-center w-full lg:justify-between">
                      <input
                        placeholder="Enter Code"
                        className="outline-none mr-2 lg:w-7/12 w-8/12 rounded-md  text-primary-magenta placeholder:text-primary-magenta placeholder:text-opacity-60  bg-primary-magenta bg-opacity-5 py-1.5 px-4"
                        type="text"
                      />
                      <button className="px-2 text-sm lg:w-5/12 w-4/12 lg:px-10  text-primary-magenta bg-primary-magenta bg-opacity-10 py-1.5 rounded-md">
                        Add Coupon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-10 lg:mt-0 2xl:w-6/12">
          {/* <div className="flex flex-row flex-wrap h-full md:flex-nowrap">
            <div className="my-4 overflow-hidden bg-white rounded-md shadow-normal">
              <div className="flex flex-col items-center justify-center px-8 py-10 text-white bg-slate-800">
                <h4 className="text-3xl">LITE</h4>
                <p className="text-3xl">
                  $ 0 <span className="text-xl">USD</span>
                </p>
                <p className="text-sm">per month</p>
              </div>
              <div className="px-8 py-8 text-center bg-slate-700">
                <p className="text-sm text-white">
                  You currently have 5 credits
                </p>
                <p className="mt-4 text-sm text-slate-300 ">
                  If you spend all of your credits, we'll send you 5 credits on
                  2/21/2022.
                </p>
              </div>
              <div className="px-8 py-10 bg-white">
                <ul className="space-y-6 text-sm text-center">
                  <li className="font-medium">
                    Access to all Labels / Promoters
                  </li>
                  <li className="font-medium">
                    Real Time Notifications & Chat
                  </li>
                  <li className="">
                    <h4 className="font-medium">5 credits / month</h4>
                    <p className="text-xs text-gray-500">
                      If you use up your credits, we'll top you back up to 5
                      credits each and every month. Always
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center w-full px-8 pb-10">
                <div>
                  <button className="bg-slate-200 text-sm text-slate-600 mx-auto rounded-button px-10 h-[45px]">
                    Current Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-md shadow-normal">
              <div className="flex flex-col items-center justify-center px-8 py-10 text-white bg-gradient-to-r from-primary-blue to-primary-green ">
                <h4 className="text-3xl">PRO</h4>
                <p className="text-3xl">
                  $ 11.99 <span className="text-xl">USD</span>
                </p>
                <p className="text-sm">per month (billed annually)</p>
              </div>
              <div>
                <div className="px-8 py-10 bg-white ">
                  <ul className="space-y-6 text-sm text-center">
                    <li>
                      <h4 className="font-medium">🔥 Skip The Queue 🔥</h4>
                      <p className="text-xs text-slate-500">
                        Your tracks will always appear first for others,
                        enabling you to get those all important responses even
                        faster.
                      </p>
                    </li>

                    <li>
                      <h4 className="font-medium">Custom Profile Background</h4>
                      <p className="text-xs text-slate-500">
                        stand out win more personality on your profile! Upload
                        your own background image.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium">Profile Views</h4>
                      <p className="text-xs text-slate-500">
                        See which labels, promoters, artists and opportunity
                        holders are viewing your profile.
                      </p>
                    </li>
                    <li>
                      <h4 className="font-medium">+70 credits / month</h4>
                      <p className="text-xs text-slate-500">
                        Each month we'll add credits to your balance.
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-center w-full px-8 pb-10 justify-self-end">
                  <div>
                    <button className="register-type-box-gradient-2 text-sm text-white mx-auto rounded-button px-10 h-[45px]">
                      Become PRO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  )
}

CreditsPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default CreditsPage
