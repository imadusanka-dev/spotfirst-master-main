import { api } from 'core/axios'
import { LoginResponse, MeResponse, BaseResponse } from 'core/types/responses'

export default {
  register: (data: any) =>
    api.post<BaseResponse>('/auth/signup', data).then((res) => res.data),
  login: (email: string, password: string) =>
    api
      .post<LoginResponse>('/auth/signin', {
        email,
        password,
      })
      .then((res) => res.data),
  me: (queryString: string) =>
    api
      .get<BaseResponse<MeResponse>>(`/profile/me?${queryString}`)
      .then((res) => {
        return res.data
      }),
  updatePassword: (password: string) =>
    api.put('/profile/updatePassword', {
      password: password,
    }),
}
