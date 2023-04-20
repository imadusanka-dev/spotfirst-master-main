import classNames from 'classnames'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { NewSubmissions } from 'modules/label/new_submissions'
import { ReactElement } from 'react'

const NewSubmissionsPage = () => {
  return (
    <div
      className={classNames(
        'relative w-full transition-all  pb-20 mx-auto md:px-8 xl:px-0 '
      )}
    >
      <div className="pb-4">
        <h4 className="text-xl text-slate-800 dark:text-white">
          New Submissions
        </h4>
      </div>

      <NewSubmissions />
    </div>
  )
}

NewSubmissionsPage.getLayout = function getLayout(
  page: ReactElement,
  role: ROLE
) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default NewSubmissionsPage
