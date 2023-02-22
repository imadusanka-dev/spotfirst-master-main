import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AuthStates, fetchUser } from 'redux/slices/auth'
import { SpinnerCircular } from 'spinners-react'

type Props = {
  children?: any
  readonly role?: 'ROLE_ADMIN'
  readonly customText?: React.ReactNode
}

export const PublicWrapper: React.FC<Props> = ({ children }) => {
  const { loading, me } = useAppSelector((state) => state.authReducer)

  const dispatch = useAppDispatch()
  const router = useRouter()

  async function fetchUserFunc() {
    await dispatch(fetchUser())
  }

  useEffect(() => {
    fetchUserFunc()
  }, [])

  useEffect(() => {
    if (loading === AuthStates.SUCCESS && me) {
      router.push('/')
    }
  }, [me, loading])

  // Without role allow all authorized users
  if (loading === AuthStates.SUCCESS && !me) {
    return <>{children}</>
  }

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen min-h-screen bg-white dark:bg-slate-800">
        <div>
          <SpinnerCircular
            size={100}
            secondaryColor={'transparent'}
            color="#1980F5"
          />
        </div>
      </div>
    </>
  )
}
