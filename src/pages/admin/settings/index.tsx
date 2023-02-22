import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { ReactElement } from 'react'

const SettingsPage = () => {
  return (
    <div className="relative max-w-4xl mx-auto mb-20 md:px-8 xl:px-0">
      <div>
        <h4 className="text-xl text-slate-800 dark:text-white">Settings</h4>
      </div>
      <section></section>
    </div>
  )
}

SettingsPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default SettingsPage
