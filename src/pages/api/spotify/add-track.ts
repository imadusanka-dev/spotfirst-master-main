import { NextApiRequest, NextApiResponse } from 'next'
import Cookies from 'cookies'
import fetch from 'isomorphic-unfetch'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)

  const { uris, position, playlistId } = req.body

  const access_token = cookies.get('spotify_access_token')

  try {
    const options = {
      url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      headers: {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: {
        uris: JSON.parse(uris),
        position,
      },
    }

    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify(options.body),
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
