import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import RecentPayments from 'modules/artist/RecentPayments'
import PaymentStats from 'modules/label/settings/payments/PaymentStats'
import { ReactElement } from 'react'

const PaymentsPage = () => {
  return (
    <>
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div>
          <h4 className="text-xl text-slate-800 dark:text-white">Payments</h4>
          <p className="max-w-2xl text-sm text-gray-500">
            Your payments information
          </p>
        </div>
        <div className="mt-10 divide-y divide-gray-200">
          <div className="space-y-1">
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
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faPaypal as IconProp}
                  />
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
      </div>
    </>
  )
}

PaymentsPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default PaymentsPage
