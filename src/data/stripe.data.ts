import { api } from 'core/axios'
import { BaseResponse } from 'core/types/responses'

export default {
  makePayment: (data: any) =>
    api
      .post<BaseResponse<null>>('/tokens/card/charge', data)
      .then((res) => res.data),
  recentTransactions: (uuid: string) =>
    api
      .get<BaseResponse<null>>(`/tokens/purchased/history/${uuid}`)
      .then((res) => res.data),
}
