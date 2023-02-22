import classNames from 'classnames'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { PreviousSubmissions } from 'modules/artist/previous_submissions'
import { ReactElement } from 'react'

const PreviousSubmissionsPage = () => {
  return (
    <div
      className={classNames(
        'max-w-6xl',
        'relative w-full transition-all  pb-20 mx-auto md:px-8 xl:px-0 '
      )}
    >
      <div className="pb-4">
        <h4 className="text-xl text-slate-800 dark:text-white">
          Previous Submissions
        </h4>
      </div>

      <div>
        <PreviousSubmissions />
      </div>
    </div>
  )
}

PreviousSubmissionsPage.getLayout = function getLayout(
  page: ReactElement,
  role: ROLE
) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default PreviousSubmissionsPage
