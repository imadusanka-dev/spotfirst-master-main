import { useAppDispatch } from 'core/hooks/useRedux'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { logout } from 'redux/slices/auth'

const AdminDashboard = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  return (
    <div>
      <p className="text-sm">Index Page</p>
      <button
        onClick={() =>
          dispatch(logout()).then(() => {
            router.push('/login')
          })
        }
      >
        Logout
      </button>
    </div>
  )
}

AdminDashboard.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default AdminDashboard
