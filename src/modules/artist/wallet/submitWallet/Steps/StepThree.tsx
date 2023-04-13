import { useAppDispatch } from 'core/hooks/useRedux'
import { motion } from 'framer-motion'
import { FC } from 'react'

import { setStep } from 'redux/slices/submitWallet'

const StepThree: FC = () => {
  const dispatch = useAppDispatch()

  const handleRefresh = () => {
    dispatch(setStep(1))
  }
  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex-grow"
    >
      <div className="flex w-full">
        <button className="min-h-[50px] flex items-center justify-center shadow-none min-w-full hover:bg-primary-green-dark text-md bg-primary-green rounded-full text-white my-5">
          Payment Done Successfully
        </button>
      </div>

      <div className="flex items-center justify-center" onClick={handleRefresh}>
        Click to Refresh
      </div>
    </motion.section>
  )
}

export default StepThree
