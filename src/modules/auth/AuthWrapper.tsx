import { useLocalStorage } from 'core/hooks/useLocalStorage'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AuthStates, fetchUser } from 'redux/slices/auth'
import { setVolume } from 'redux/slices/player'
import { SpinnerCircular } from 'spinners-react'

type Props = {
  children?: any
  readonly customText?: React.ReactNode
}

export const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { loading, me } = useAppSelector((state) => state.authReducer)
  const { storedValue } = useLocalStorage('player_volume')

  const dispatch = useAppDispatch()
  const router = useRouter()

  async function fetchUserFunc() {
    await dispatch(fetchUser())
    dispatch(setVolume(Number.parseFloat(storedValue) || 0.5))
  }

  useEffect(() => {
    fetchUserFunc()
  }, [])

  useEffect(() => {
    if (loading === AuthStates.SUCCESS && !me) {
      router.push('/home')
    }
  }, [me, loading, router])

  // Without role allow all authorized users
  if (loading === AuthStates.SUCCESS && me) return <>{children}</>

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
