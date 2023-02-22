import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { SubmitSongStepInfo } from 'modules/common/SubmitSongStepInfo'
import { ReactElement } from 'react'

const ArtistHome = () => {
  return (
    <div>
      <SubmitSongStepInfo />
    </div>
  )
}

ArtistHome.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default ArtistHome
