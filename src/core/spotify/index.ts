import axios from 'axios'

const axiosApiInstance = axios.create({
  baseURL: '/api/spotify',
})

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async (config) => {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
)

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async function (error) {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        await refreshAccessToken()
        return axiosApiInstance(originalRequest)
      }
      return Promise.reject(error)
    }
)

const refreshAccessToken = async () => {
  return await axiosApiInstance.get('/refresh_token')
}

const getMyPlaylists = async () => {
  return await axiosApiInstance.get('/my-playlists')
}

const addTrackToPlaylist = async (payload) => {
  return await axiosApiInstance.post('/add-track', {
    uris: JSON.stringify(payload.uris),
    position: payload.position,
    playlistId: payload.playlistId,
  })
}

export { getMyPlaylists, addTrackToPlaylist, refreshAccessToken }
