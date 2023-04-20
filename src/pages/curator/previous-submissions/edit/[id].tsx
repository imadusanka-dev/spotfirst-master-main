import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { ROLE } from 'core/types'
import AppLayout from 'core/layouts/AppLayout'
import FormContainer from 'modules/artist/submit_song/FormContainer'

const EditSubmission = () => {
  const { query } = useRouter()

  return (
    <div>
      <FormContainer
        title={'Edit Song'}
        isEdit={true}
        submissionId={query.id}
      />
    </div>
  )
}

EditSubmission.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}
export default EditSubmission
