/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: 'akamai',
    path: '',
    domains: [
      'i.scdn.co',
      'bugnod-spotfirst-qa.s3.amazonaws.com',
      'i1.sndcdn.com',
      'i.ytimg.com',
      'is5-ssl.mzstatic.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
