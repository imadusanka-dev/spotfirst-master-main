import { motion } from 'framer-motion'
import { FC } from 'react'

const StepThree: FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex-grow"
    >
      <div className="flex w-12/12 space-x-3">
        <div className="flex space-x-5">
          <div className="min-w-[150px] text-right"></div>
          <button className="min-h-[66px] flex items-center justify-center shadow-none min-w-[300px] hover:bg-primary-green-dark text-md bg-primary-green rounded-full text-white mb-5">
            Payment Done Successfully!!!
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default StepThree
