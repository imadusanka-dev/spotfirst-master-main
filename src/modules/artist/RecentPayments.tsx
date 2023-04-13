import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { CashIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { STRIPE_PAYMENT_API } from 'data'
import { useAppSelector } from 'core/hooks/useRedux'

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800',
}

const RecentPayments = () => {
  const [transactions, setTransactions] = useState([])

  const { me } = useAppSelector((state) => state.authReducer)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const res = await STRIPE_PAYMENT_API.recentTransactions(me?.uuid)
      if (res.success) {
        setTransactions(res.payload)
      }
    } catch (error) {
      console.log('recent transactions fetch error: ', error)
    }
  }

  return (
    <>
      {transactions.length > 0 ? (
        <div className="mt-4">
          <div className="hidden sm:block">
            <div className="">
              <div className="flex flex-col mt-2">
                <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50">
                          Transaction Charged ID
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50">
                          Amount
                        </th>
                        <th className="hidden px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 md:block">
                          Token Count
                        </th>
                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase bg-gray-50">
                          Transaction Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction._id} className="bg-white">
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-0 whitespace-nowrap">
                            <div className="flex">
                              <a
                                href={transaction.href}
                                className="inline-flex space-x-2 text-sm truncate group"
                              >
                                <CashIcon
                                  className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <p className="text-gray-500 truncate group-hover:text-gray-900">
                                  {transaction.chargedId}
                                </p>
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
                            <span className="font-medium text-gray-900">
                              $ {transaction.amount}{' '}
                            </span>
                            {transaction.currency}
                          </td>
                          <td className="hidden px-6 py-4 text-sm text-gray-500 whitespace-nowrap md:block">
                            <span
                              className={classNames(
                                statusStyles[transaction.status],
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                              )}
                            >
                              {transaction.tokenCount} Tokens
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap">
                            <time>
                              {dayjs(transaction.createdAt).format(
                                'YYYY-MM-DD  HH:mm:ss A'
                              )}
                            </time>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default RecentPayments
