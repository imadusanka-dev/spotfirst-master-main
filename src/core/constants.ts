import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faSpotify,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'

const NEXT_PUBLIC_BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL
const NEXT_PUBLIC_SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
const NEXT_PUBLIC_WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

export const COLORS = {
  'primary-blue': {
    DEFAULT: '#1980F5',
    dark: '#126ED8',
  },
  'primary-green': {
    DEFAULT: '#08A881',
  },
  'primary-yellow': {
    DEFAULT: '#EEB739',
  },
  'primary-magenta': {
    DEFAULT: '#C93FC0',
  },
}

export const URLS = {
  API_URL: NEXT_PUBLIC_BASE_API_URL,
}

export const SPOTIFY_CREDENTIALS = {
  STATE_KEY: 'spotify_auth_state',
  CLIENT_ID: NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  CLIENT_SECRET: NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI: `${NEXT_PUBLIC_WEBSITE_URL}/api/spotify/callback`,
  CONNECT_REDIRECT_URI: `${NEXT_PUBLIC_WEBSITE_URL}/api/spotify/app-connect-callback`,
}

export enum SocialMediaAccounts {
  FACEBOOK = 'facebook',
  SOUNDCLOUD = 'soundCloud',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  SPOTIFY = 'spotify',
  WEBSITE = 'website',
  TWITTER = 'twitter',
}

export const genres_values = [
  {
    label: 'Genres',
    options: [
      {
        value: 'edm',
        label: 'EDM',
      },
      {
        value: 'rock',
        label: 'Rock',
      },
      {
        value: 'alternative / indie',
        label: 'Alternative / Indie',
      },
      {
        value: 'blogwave',
        label: 'Blogwave',
      },
      {
        value: 'classic',
        label: 'Classic',
      },
      {
        value: 'classical / jazz',
        label: 'Classical / Jazz',
      },
      {
        value: 'electronica / breaks',
        label: 'Electronica / Breaks',
      },
      {
        value: 'folk',
        label: 'Folk',
      },
      {
        value: 'hip-hop / rap',
        label: 'Hip-hop / Rap',
      },
      {
        value: 'house / techno',
        label: 'House / Techno',
      },
      {
        value: 'idm / downtempo',
        label: 'IDM / Downtempo',
      },
      {
        value: 'metal / hard rock',
        label: 'Metal / Hard Rock',
      },
      {
        value: 'pop',
        label: 'Pop',
      },
      {
        value: 'punk / ska',
        label: 'Punk / Ska',
      },
      {
        value: 'rnb / funk / soul',
        label: 'RnB / Funk / Soul',
      },
      {
        value: 'world music',
        label: 'World Music',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },
]

export const types = [
  {
    label: 'Remix',
    value: 'remix',
  },
  {
    label: 'Cover',
    value: 'cover',
  },
  {
    label: 'Original',
    value: 'original',
  },
]

export const moods_values = [
  {
    label: 'Mood',
    options: [
      {
        value: 'sexy',
        label: 'Sexy',
      },
      {
        value: 'energetic',
        label: 'Energetic',
      },
      {
        value: 'sad',
        label: 'Sad',
      },
      {
        value: 'chill',
        label: 'Chill',
      },
      {
        value: 'romantic',
        label: 'Romantic',
      },
    ],
  },
]
