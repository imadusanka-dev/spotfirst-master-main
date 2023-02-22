import { useRouter } from 'next/router'
import { useState } from 'react'
import { SpinnerCircular } from 'spinners-react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { URLS } from 'core/constants'
import { Check } from 'react-feather'
import toast from 'react-hot-toast'

const ConfirmationPage = () => {
  const [loading, setLoading] = useState(false)
  const [confirmSuccess, setConfirmSuccess] = useState(false)

  const router = useRouter()
  const confirmToken = router.query['confirmToken']

  async function handleConfirm() {
    setLoading(true)

    try {
      const response = await axios.get(
        `${URLS.API_URL}/auth/confirm/${confirmToken}`
      )

      if (response.data['body']['success']) {
        setConfirmSuccess(true)

        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setLoading(false)
        toast.error(response.data['message'] ?? 'Something went wrong!')
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Something went wrong!')
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen px-5">
      {!confirmSuccess ? (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-10 rounded-lg lg:px-14 py-14 lg:shadow-dark"
        >
          <h1 className="text-2xl text-primary-blue-dark">
            Confirm Your Email Address
          </h1>
          <p className="text-sm">
            Hi, Use the button below to confirm your email and start enjoying
            SpotFirst.
          </p>

          <button
            disabled={loading}
            onClick={handleConfirm}
            className="px-16 h-[55px] mt-6 text-white rounded-md bg-primary-blue-dark"
          >
            {loading ? (
              <SpinnerCircular
                size={40}
                secondaryColor={'transparent'}
                color="#fff"
              />
            ) : (
              'Confirm'
            )}
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center px-10 rounded-lg lg:px-14 py-14 lg:shadow-dark"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <span className="bg-green-400 min-h-[60px] min-w-[60px] rounded-full flex items-center justify-center">
            <Check size={30} className="text-white" />
          </span>
          <h1 className="mt-4 text-2xl text-center text-slate-600">
            Confirmation Successfull!
          </h1>
        </motion.div>
      )}
    </div>
  )
}

ConfirmationPage.public = true

export default ConfirmationPage
