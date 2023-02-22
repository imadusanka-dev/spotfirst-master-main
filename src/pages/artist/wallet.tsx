import { ChangeEvent, ReactElement, useState } from 'react'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import SubmitWalletSteps from 'modules/artist/wallet/submitWallet/SubmitWalletSteps'
import classNames from 'classnames'
import StepOne from 'modules/artist/wallet/submitWallet/Steps/StepOne'
import StepTwo from 'modules/artist/wallet/submitWallet/Steps/StepTwo'
import { useAppSelector } from 'core/hooks/useRedux'
import RecentPayments from 'modules/artist/RecentPayments'
import StepThree from 'modules/artist/wallet/submitWallet/Steps/StepThree'

const CreditsPage = () => {
  const [tokens, setTokens] = useState(1)
  const [total, setTotal] = useState(1)
  const [error, setError] = useState<{
    show: boolean
    message: string
  }>({
    show: false,
    message: '',
  })

  const step = useAppSelector((state) => state.submitWalletSlice.step)

  return (
    <div>
      <div>
        <h4 className="text-xl text-slate-800 dark:text-white">My Wallet</h4>
      </div>
      <section>
        <div className={classNames('flex  h-full space-x-5')}>
          <SubmitWalletSteps />
          {step === 1 && (
            <StepOne
              tokens={tokens}
              total={total}
              error={error}
              setTokens={setTokens}
              setTotal={setTotal}
              setError={setError}
            />
          )}
          {step === 2 && <StepTwo tokens={tokens} />}
          {step === 3 && <StepThree />}
        </div>
      </section>

      <section className="pb-20 mt-10 ">
        <div>
          <h4>Recent Payments</h4>
        </div>
        <RecentPayments />
      </section>
    </div>
  )
}

CreditsPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default CreditsPage
