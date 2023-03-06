import { api } from 'core/axios'
import { Submission } from 'core/types'
import { BaseResponse } from 'core/types/responses'

export default {
  submitSong: (data: any) =>
    api.post<BaseResponse<null>>('/submit', data).then((res) => res.data),
  previousSubmissions: (page: number, pageSize: number) =>
    api
      .get<BaseResponse<Submission[]>>('/submissions', {
        params: {
          page,
          pageSize,
        },
      })
      .then((res) => res.data),
  previousSubmissionsOfSong: (
    parentId: number,
    page: number,
    pageSize: number
  ) => {
    const params = {
      page,
      pageSize,
    }
    return api
      .get<BaseResponse<Array<Submission>>>(
        `/submissions/previousSubmissionsOfSong`,
        {
          params,
        }
      )
      .then((res) => res.data)
  },
  previousSubmissionsByArtistId: (
    page: number,
    pageSize: number,
    artistId: string
  ) =>
    api
      .get<BaseResponse<Array<Submission>>>(`/submissions/${artistId}`, {
        params: {
          page,
          pageSize,
        },
      })
      .then((res) => res.data),
}
