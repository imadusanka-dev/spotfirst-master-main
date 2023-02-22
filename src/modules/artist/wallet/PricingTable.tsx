import { CheckIcon } from '@heroicons/react/outline'

const PricingTable = () => {
  return (
    <>
      <div className="flex w-10/12 space-x-3 opacity-60">
        <div className="relative min-h-[65vh] flex flex-col items-center w-5/12 px-4 py-8 text-center divide-y rounded-3xl shadow-normal">
          <div className="pb-8 text-center">
            <h3 className="text-4xl text-primary-blue">$20</h3>
            <span className="text-gray-500">per month</span>
          </div>
          <div className="pt-8">
            <ul className="space-y-8  w-[90%] text-center">
              <li>
                <span className="relative ml-5 text-center">
                  Up to 6 users
                  <CheckIcon className="absolute top-0 w-5 h-5 text-primary-green -left-6" />
                </span>
              </li>
              <li>
                <span className="relative ml-5 text-center">
                  24 hours trusted support
                  <CheckIcon className="absolute top-0 w-5 h-5 text-primary-green -left-6" />
                </span>
              </li>
              <li>
                <span className="relative ml-5 text-center">
                  Unlimited number of projects
                  <CheckIcon className="absolute top-0 w-5 h-5 text-primary-green -left-6" />
                </span>
              </li>
            </ul>
          </div>

          <div className="absolute bottom-10">
            <button
              className="w-full px-4 py-2 mt-4 text-white bg-primary-blue rounded-xl"
              disabled
            >
              Available Soon!
            </button>
          </div>
        </div>
        <div className="relative min-h-[65vh] flex flex-col items-center w-5/12 px-4 py-8 text-center divide-y rounded-3xl shadow-normal">
          <div className="pb-8 text-center">
            <h3 className="text-4xl text-primary-magenta">$60</h3>
            <span className="text-gray-500">per month</span>
          </div>
          <div className="pt-8">
            <ul className="space-y-8  w-[90%] text-center">
              <li>
                <span className="relative ml-5 text-center">
                  Up to 6 users
                  <CheckIcon className="absolute top-0 w-5 h-5 text-primary-green -left-6" />
                </span>
              </li>
              <li>
                <span className="relative ml-5 text-center">
                  24 hours trusted support
                  <CheckIcon className="absolute top-0 w-5 h-5 text-primary-green -left-6" />
                </span>
              </li>
              <li>
                <span className="relative ml-5 text-center">
                  Unlimited number of projects
                  <CheckIcon className="absolute top-0 w-5 h-5 text-primary-green -left-6" />
                </span>
              </li>
              <li>
                <span className="relative ml-5 text-center">
                  + All pro features
                  <CheckIcon className="absolute top-0 w-5 h-5 text-primary-green -left-6" />
                </span>
              </li>
            </ul>
          </div>

          <div className="absolute bottom-10">
            <button
              className="w-full px-4 py-2 mt-4 text-white bg-primary-magenta rounded-xl"
              disabled
            >
              Available Soon!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default PricingTable
