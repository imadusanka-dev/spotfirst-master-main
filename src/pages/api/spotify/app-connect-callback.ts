import Cookies from 'cookies'
import { SPOTIFY_CREDENTIALS } from 'core/constants'
import fetch from 'isomorphic-unfetch'

import { NextApiRequest, NextApiResponse } from 'next'

const stateKey = SPOTIFY_CREDENTIALS.STATE_KEY
const client_id = SPOTIFY_CREDENTIALS.CLIENT_ID // Your client id
const client_secret = SPOTIFY_CREDENTIALS.CLIENT_SECRET
const redirect_uri = SPOTIFY_CREDENTIALS.CONNECT_REDIRECT_URI

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)

  const code = req.query.code || null
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null

  if (state === null || state !== storedState) {
    res.redirect(
      '/label/settings#' +
        new URLSearchParams({
          error: 'state_mismatch',
        })
    )
  } else {
    cookies.set(stateKey, null)

    const buf = Buffer.from(`${client_id}:${client_secret}`)

    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },

      headers: {
        Authorization: 'Basic ' + buf.toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const params = new URLSearchParams()
    params.append('code', `${authOptions.form.code}`)
    params.append('redirect_uri', `${authOptions.form.redirect_uri}`)
    params.append('grant_type', `${authOptions.form.grant_type}`)

    const _res = await fetch(authOptions.url, {
      method: 'POST',
      body: params,
      headers: authOptions.headers,
    })

    if (_res.status === 200) {
      const _body = await _res.json()

      const access_token = _body['access_token'],
        refresh_token = _body['refresh_token']

      cookies.set('spotify_access_token', access_token, {
        //expires: 60 * 60,
      })
      cookies.set('spotify_refresh_token', refresh_token)
      // we can also pass the token to the browser to make requests from there
      res.redirect('/label/settings')
    } else {
      res.redirect(
        '/label/settings#' +
          new URLSearchParams({
            error: 'invalid_token',
          })
      )
    }
  }
}
