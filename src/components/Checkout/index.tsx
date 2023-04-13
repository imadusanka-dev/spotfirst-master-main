import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'
import { STRIPE_PAYMENT_API } from 'data'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { setCompletedStep, setStep } from 'redux/slices/submitWallet'

export default function CheckoutForm({ tokens }) {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState<boolean>(false)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const authState = useAppSelector((state) => state.authReducer)

  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useAppDispatch()

  const handleChange = async (event) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (ev) => {
    setLoading(true)
    setProcessing(true)
    ev.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)

    if (result.error) {
      setLoading(false)
      console.log(result.error.message)
      toast.error(`Something went wrong - ${result.error.message}`)
    } else {
      const data = {
        amount: tokens,
        currency: 'eur',
        tokens: authState?.me?.tokens,
        cardToken: result.token.id,
        userId: authState?.me?.uuid,
      }
      const res = await STRIPE_PAYMENT_API.makePayment(data)
      setProcessing(false)
      if (res.success) {
        setSucceeded(true)
        dispatch(
          setCompletedStep({
            step: 2,
            completed: true,
          })
        )
        setLoading(false)
      } else {
        toast.error('Something went wrong!')
        setLoading(false)
      }
    }
  }

  return (
    <div className="flex w-12/12 space-x-3">
      <div className="relative min-h-[20vh] flex flex-col items-center w-full px-4 py-8 text-center divide-y rounded-3xl shadow-normal">
        <CardElement id="card-element" onChange={handleChange} />
        <div className="content-center w-full mt-5">
          <button
            className="min-h-[40px] flex items-center justify-center shadow-none min-w-full hover:bg-primary-blue-dark text-md bg-primary-blue rounded-full text-white"
            onClick={handleSubmit}
          >
            {loading ? (
              <SpinnerCircular
                size={30}
                secondaryColor={'transparent'}
                color="#fff"
              />
            ) : (
              'Pay Now'
            )}
          </button>
        </div>

        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded. Refresh the page to pay again.
        </p>
      </div>
    </div>
  )
}
