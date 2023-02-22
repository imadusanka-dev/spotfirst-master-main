import { SPOTIFY_CREDENTIALS } from 'core/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'isomorphic-unfetch'
import Cookies from 'cookies'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // requesting access token from refresh token

  const cookies = new Cookies(req, res)

  const refresh_token = cookies.get('spotify_refresh_token')

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
    cookies.set('spotify_access_token', data['access_token'])
  }

  res.status(200).json(data)
}
