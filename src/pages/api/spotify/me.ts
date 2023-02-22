import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'isomorphic-unfetch'
import Cookies from 'cookies'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = new Cookies(req, res)

  const access_token = cookies.get('spotify_access_token')

  try {
    const options = {
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: 'Bearer ' + access_token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const response = await fetch(options.url, {
      headers: options.headers,
    })

    const data = await response.json()

    res.status(200).json(data)
  } catch (error) {
    res.status(res.statusCode).json({
      success: false,
      message: 'Something went wrong!',
    })
  }
}
