import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RecentPayments from 'modules/artist/RecentPayments'
import PaymentStats from './PaymentStats'

const PaymentsTab = () => {
  return (
    <>
      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Payments
          </h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Your payments information
          </p>
          <div className="mt-4">
            <PaymentStats />
          </div>
        </div>

        <div className="mt-10">
          <div className="mt-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Withdraw
              </h3>
              <p className="max-w-2xl text-sm text-gray-500">
                Withdraw your earnings
              </p>
            </div>
            <div className="mt-4 space-x-2 text-white">
              <button className="px-10 py-1.5 bg-gradient-to-r from-[#00457C] to-[#0079C1]  rounded-button">
                <FontAwesomeIcon className="mr-2" icon={faPaypal as IconProp} />
                PayPal
              </button>
              <button className="px-10 py-1.5 bg-slate-800 rounded-button">
                Bank Transfer
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <RecentPayments />
        </div>
      </div>
    </>
  )
}

export default PaymentsTab
