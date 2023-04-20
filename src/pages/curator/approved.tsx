import classNames from 'classnames'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { ApprovedSubmissions } from 'modules/label/approved'

import { ReactElement } from 'react'

const ApprovedLabelsPage = () => {
  return (
    <>
      <div
        className={classNames(
          'max-w-6xl',
          'relative w-full transition-all  pb-20 mx-auto md:px-8 xl:px-0 '
        )}
      >
        <div className="pb-4">
          <h4 className="text-xl text-slate-800 dark:text-white">
            Approved Submissions
          </h4>
        </div>

        <div>
          <ApprovedSubmissions />
        </div>
      </div>
    </>
  )
}

ApprovedLabelsPage.getLayout = function getLayout(
  page: ReactElement,
  role: ROLE
) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default ApprovedLabelsPage
