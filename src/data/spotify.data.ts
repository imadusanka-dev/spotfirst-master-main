import axios, { AxiosError } from 'axios'
import { SPOTIFY_CREDENTIALS } from 'core/constants'

export interface AccessTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  error?: string
}

export default {
  getTrack: async (trackId: string, token: string, token_type: string) => {
    return axios
      .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `${token_type} ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
  },
  getAccessToken: async () => {
    // generate authorization string
    const authorization = Buffer.from(
      `${SPOTIFY_CREDENTIALS.CLIENT_ID ?? ''}:${
        SPOTIFY_CREDENTIALS.CLIENT_SECRET ?? ''
      }`
    ).toString('base64')

    const details = {
      grant_type: 'client_credentials',
    }

    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(details[key])
      )
      .join('&')

    return axios
      .post<AccessTokenResponse>(
        'https://accounts.spotify.com/api/token',
        formBody,
        {
          headers: {
            Authorization: `Basic ${authorization}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        const res = err as AxiosError<AccessTokenResponse>
        return res.response.data
      })
  },
}
