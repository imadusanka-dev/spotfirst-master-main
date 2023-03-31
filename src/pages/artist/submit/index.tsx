import AppLayout from 'core/layouts/AppLayout'
import { ReactElement } from 'react'
import { ROLE } from 'core/types'
import FormContainer from 'modules/artist/submit_song/FormContainer'

const SubmitSongPage = () => {
  return (
    <div>
      <FormContainer title={'Submit a Song'} isEdit={false} />
    </div>
  )
}

SubmitSongPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default SubmitSongPage
