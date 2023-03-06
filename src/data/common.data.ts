import { api } from 'core/axios'
import { BaseResponse, ChatHistory, UsersResponse } from 'core/types/responses'

type SongMetadata = {
  image: string
  name: string
  previewUrl: string | null
  songDuration: string
  type: string
  artist: string
}

export default {
  updateName: (payload) =>
    api
      .put<BaseResponse<null>>('/profile/updateName', {
        name: payload.name,
        description: payload.description,
        genres: payload.genres,
        links: payload.links,
      })
      .then((res) => res.data),
  songMetadata: (url: string) => {
    const data = {
      url: url,
    }
    return api
      .post<BaseResponse<SongMetadata>>('/songMetaData/song', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res.data
      })
  },
  updateDisplayImage: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    return api.post<BaseResponse<string>>('/profile/displayImage', formData, {
      headers,
    })
  },
  removeDisplayImage: () => api.delete('/profile/displayImage'),
  uploadFile: (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    return api
      .post<BaseResponse>('/files/upload', formData, {
        headers,
      })
      .then((res) => res.data.payload)
  },
  updateSocialLinks: (socials: any) => api.put(`/socialmedia`, socials),
  getAllUsers: () =>
    api.get<UsersResponse>('/users/all').then((res) => res.data),
  getChatHistory: (userId) =>
    api.get<ChatHistory>(`/chat/user/${userId}`).then((res) => res.data),
}
