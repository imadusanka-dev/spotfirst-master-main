import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'isomorphic-unfetch'
import Cookies from 'cookies'
// import { Simulate } from 'react-dom/test-utils'
// import error = Simulate.error

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)

  const access_token = cookies.get('spotify_access_token')

  try {
    const options = {
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const response = await fetch(options.url, {
      headers: options.headers,
    })

    const data = await response.json()

    if (data.error) {
      res.status(data.error?.status).json({
        success: false,
        message: data.error?.message,
      })
    } else {
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(res.statusCode).json({
      success: false,
      message: 'Something went wrong!',
    })
  }
}
