import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { NextPageWithLayout } from 'core/types/next'

import { ReactElement } from 'react'

const NotFound: NextPageWithLayout = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div>Not Found Page</div>
    </div>
  )
}

NotFound.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default NotFound
