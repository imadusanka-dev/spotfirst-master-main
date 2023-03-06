import axios from 'axios'
import { SPOTIFY_CREDENTIALS } from '../constants'
import fetch from 'isomorphic-unfetch'
import { getCookie, setCookie } from '../hooks/useCookie'

// const axiosApiInstance = axios.create({
//   baseURL: '/api/spotify',
// })

const axiosApiInstance = axios.create()

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + getCookie('spotify_access_token'),
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
  //return await axiosApiInstance.get('/refresh_token')
  //remove this after fix
  const refresh_token =
    'AQDnUyGy8C9Sne8sribzYvOmNOYCfZIMzM2Twmqk3nAcFuPV2dMdDdquCvX8FEdQEDOc-IX8ldE4lr6FO63e9CaN00GIyJE44aIKdgrfG7LgKzHmwsWGb3U-rrLreXUlS8k'

  const buf = Buffer.from(
    SPOTIFY_CREDENTIALS.CLIENT_ID + ':' + SPOTIFY_CREDENTIALS.CLIENT_SECRET
  )

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + buf.toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
  }

  const params = new URLSearchParams()
  params.append('refresh_token', `${refresh_token}`)
  params.append('grant_type', 'refresh_token')

  const response = await fetch(authOptions.url, {
    method: 'POST',
    body: params,
    headers: authOptions.headers,
  })

  const data = await response.json()

  if (data['access_token']) {
    setCookie('spotify_access_token', data['access_token'], 1)
  }

  return data
}

const getMyPlaylists = async () => {
  // return await axiosApiInstance.get('/my-playlists')
  const options = {
    url: 'https://api.spotify.com/v1/me/playlists',
  }

  return await axiosApiInstance.get(options.url)
}

const addTrackToPlaylist = async (payload) => {
  // return await axiosApiInstance.post('/add-track', {
  //   uris: JSON.stringify(payload.uris),
  //   position: payload.position,
  //   playlistId: payload.playlistId,
  // })
  const options = {
    url: `https://api.spotify.com/v1/playlists/${payload.playlistId}/tracks`,
    body: JSON.stringify({
      uris: payload.uris,
      position: payload.position,
    }),
  }

  return await axiosApiInstance.post(options.url, options.body)
}

export { getMyPlaylists, addTrackToPlaylist, refreshAccessToken }
