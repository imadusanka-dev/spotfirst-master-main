import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faSpotify,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import { SocialMediaAccounts } from './constants'

export const roleNameToPath = (role: string) => {
  return role.split('_')[1].toLowerCase()
}

export function validURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ) // fragment locator
  return !!pattern.test(str)
}

export const getSocialMediaByName = (name: string) => {
  switch (name) {
    case 'facebook':
      return {
        name: 'facebook',
        label: 'Facebook',
        icon: faFacebook,
      }
    case 'soundCloud':
      return {
        name: 'soundCloud',
        label: 'SoundCloud',
        icon: faSoundcloud,
      }
    case 'youtube':
      return {
        name: 'youtube',
        label: 'Youtube',
        icon: faYoutube,
      }
    case 'instagram':
      return {
        name: 'instagram',
        label: 'Instagram',
        icon: faInstagram,
      }
    case 'spotify':
      return {
        name: 'spotify',
        label: 'Spotify',
        icon: faSpotify,
      }
    case 'website':
      return {
        name: 'website',
        label: 'Website',
        icon: faGlobe,
      }
    case 'twitter':
      return {
        name: 'twitter',
        label: 'Twitter',
        icon: faTwitter,
      }
  }
}

export const getFormattedDateString = (
  date: string,
  format: 'MMM DD, YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY' = 'MMM DD, YYYY'
): string => {
  const _d = dayjs(date)

  if (!_d.isValid()) {
    return 'Invalid Date'
  }

  return _d.format(format)
}
