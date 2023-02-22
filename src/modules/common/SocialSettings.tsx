import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faSpotify,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { SocialLinkUpdateInput } from 'components/Input/SocialLinkUpdateInput'
import { useAppSelector } from 'core/hooks/useRedux'
import React from 'react'

export const SocialSettings = () => {
  const profile = useAppSelector((state) => state.authReducer.me)

  const socials = [
    {
      name: 'facebook',
      label: 'Facebook',
      placeholder: 'Enter your Facebook profile url',
      icon: faFacebook,
    },
    {
      name: 'soundCloud',
      label: 'SoundCloud',
      placeholder: 'Enter your SoundCloud url',
      icon: faSoundcloud,
    },
    {
      name: 'youtube',
      label: 'Youtube',
      placeholder: 'Enter your Youtube url',
      icon: faYoutube,
    },
    {
      name: 'instagram',
      label: 'Instagram',
      placeholder: 'Enter your Instagram profile url',
      icon: faInstagram,
    },
    {
      name: 'spotify',
      label: 'Spotify',
      placeholder: 'Enter your Spotify url',
      icon: faSpotify,
    },
    {
      name: 'website',
      label: 'Website',
      placeholder: 'Enter your Website url',
      icon: faGlobe,
    },
    {
      name: 'twitter',
      label: 'Twitter',
      placeholder: 'Enter your Twitter account url',
      icon: faTwitter,
    },
  ]

  return (
    <>
      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Links</h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Manage your social links
          </p>
        </div>
        <div className="mt-6">
          <dl className="mt-4 space-y-3 divide-gray-200">
            {socials.map((item) => {
              if (
                profile?.social?.find((scl) => scl.type === item.name)?.link
              ) {
                return (
                  <SocialLinkUpdateInput
                    key={item.name}
                    verified={
                      profile.social.find((scl) => scl.type === item.name)
                        .verified
                    }
                    icon={item.icon as IconProp}
                    placeholder={item.placeholder}
                    name={item.name}
                    label={item.label}
                    initialValue={
                      profile.social.find((scl) => scl.type === item.name).link
                    }
                    value={
                      profile.social.find((scl) => scl.type === item.name).link
                    }
                    defaultValue={
                      profile.social.find((scl) => scl.type === item.name).link
                    }
                  />
                )
              }
              return (
                <SocialLinkUpdateInput
                  key={item.name}
                  icon={item.icon as IconProp}
                  placeholder={item.placeholder}
                  name={item.name}
                  label={item.label}
                />
              )
            })}
          </dl>
        </div>
      </div>
    </>
  )
}
