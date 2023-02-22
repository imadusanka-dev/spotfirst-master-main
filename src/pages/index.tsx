import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { SpinnerCircular } from 'spinners-react'

interface IndexProps {
  role: string
}

const Index: FC<IndexProps> = ({ role }) => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (role === 'ROLE_ARTIST') {
        router.replace('/artist')
      }
      if (role === 'ROLE_ADMIN') {
        router.replace('/admin')
      }

      if (role === 'ROLE_LABEL') {
        router.replace('/label')
      }
    }, 1000)
  }, [role, router])

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-3">
        <SpinnerCircular
          size={40}
          secondaryColor={'transparent'}
          color="#1980F5"
        />
        <span>Loading SpotFirst</span>
      </div>
    </div>
  )
}

export default Index
