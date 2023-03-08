import classNames from 'classnames'

const stats = [
  { name: 'Net Income', stat: '$5.6', color: 'register-type-box-gradient-1' },
  {
    name: 'Withdrawn',
    stat: '$0',
    color: 'register-type-box-gradient-2',
  },
  {
    name: 'Pending Clearance',
    stat: '$5.6',
    color: 'register-type-box-gradient-3 ',
  },
  { name: 'Available', stat: '$5.6', color: 'register-type-box-gradient-4' },
]

const PaymentStats = () => {
  return (
    <>
      <div>
        <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.name}
              className={classNames(
                item.color,
                'px- py-5  overflow-hidden bg-white rounded-lg shadow sm:p-6'
              )}
            >
              <dt className="text-sm font-medium text-white truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-white">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

export default PaymentStats
