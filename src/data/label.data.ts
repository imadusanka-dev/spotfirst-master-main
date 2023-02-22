import { api } from 'core/axios'
import { Submission } from 'core/types'
import { BaseResponse } from 'core/types/responses'

type ApproveRequest = {
  submissionId: string
  when: string
  date: string
}

export default {
  approveSubmission: ({ submissionId, when, date }: ApproveRequest) => {
    return api
      .patch<BaseResponse>('/submissions/approve', {
        submissionId,
        when,
        date,
      })
      .then((res) => res.data)
  },
  rejectSubmission: (submissionId: string, feedback: string) => {
    return api
      .patch<BaseResponse>('/submissions/reject', {
        submissionId,
        feedback,
      })
      .then((res) => res.data)
  },
  newSubmission: (page: number, pageSize: number) =>
    api
      .get<BaseResponse<Array<Submission>>>('/submissions/newSubmissions', {
        params: {
          page,
          pageSize,
        },
      })
      .then((res) => res.data),
  approvedSubmissions: (page: number, pageSize: number) =>
    api
      .get<BaseResponse<Array<Submission>>>(`/submissions/approved`, {
        params: {
          page,
          pageSize,
        },
      })
      .then((res) => res.data),
  declinedSubmissions: (page: number, pageSize: number) =>
    api
      .get<BaseResponse<Array<Submission>>>(`/submissions/rejected`, {
        params: {
          page,
          pageSize,
        },
      })
      .then((res) => res.data),
}
