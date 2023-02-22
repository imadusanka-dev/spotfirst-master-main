import { motion } from 'framer-motion'
import { FC } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from 'components/Checkout'
import { loadStripe } from '@stripe/stripe-js'

interface Props {
  tokens?: number
}

const StepTwo: FC = ({ tokens }: Props) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )
  return (
    <motion.section
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex-grow"
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm tokens={tokens} />
      </Elements>
    </motion.section>
  )
}

export default StepTwo
