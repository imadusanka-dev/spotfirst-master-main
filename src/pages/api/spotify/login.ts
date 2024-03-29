import { SPOTIFY_CREDENTIALS } from 'core/constants'
import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next'

const client_id = SPOTIFY_CREDENTIALS.CLIENT_ID // Your client id
const redirect_uri = SPOTIFY_CREDENTIALS.REDIRECT_URI // Your redirect uri

const stateKey = SPOTIFY_CREDENTIALS.STATE_KEY

const generateRandomString = function (length) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const cookies = new Cookies(req, res)

      const state = generateRandomString(16)
      cookies.set(stateKey, state, {
        httpOnly: true,
      })

      // your application requests authorization
      const scope =
        'playlist-modify-public playlist-modify-public streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state'

      const params = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })

      res.json({ url: 'https://accounts.spotify.com/authorize?' + params })
    } catch (error) {
      console.log('----login', error)
      throw new Error(error.message)
    }
  }
}
