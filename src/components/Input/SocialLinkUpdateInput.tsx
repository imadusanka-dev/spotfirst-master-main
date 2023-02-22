import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useAppSelector } from 'core/hooks/useRedux'

import { MergeElementProps } from 'core/types/MergeElementProps'
import { COMMON_API } from 'data'

import { forwardRef, Ref, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SpinnerCircular } from 'spinners-react'

interface ISocialLinkUpdateInput {
  icon?: IconProp
  error?: boolean
  label?: string
  verified?: boolean | undefined
  initialValue?: string
}

type SocialLinkUpdateInputProps = MergeElementProps<
  'input',
  ISocialLinkUpdateInput
>

const SocialLinkUpdateInputBase = (
  { placeholder, icon, type, verified, ...rest }: SocialLinkUpdateInputProps,
  ref: Ref<HTMLInputElement>
) => {
  const [value, setValue] = useState(rest.defaultValue)
  const [hasChange, setHasChange] = useState(false)
  const [loading, setLoading] = useState(false)

  const socials = useAppSelector((state) => state.authReducer.me.social)

  useEffect(() => {
    if (value === rest.initialValue) {
      setHasChange(false)
    } else {
      setHasChange(true)
    }
  }, [value])

  const updateSocial = async () => {
    setLoading(true)

    const social_obj = {
      facebook: '',
      soundCloud: '',
      youtube: '',
      instagram: '',
      spotify: '',
      website: '',
      twitter: '',
    }

    socials.forEach((item) => {
      Object.assign(social_obj, {
        [item.type]: item.link,
      })
    })

    Object.assign(social_obj, {
      [rest.name]: value,
    })

    COMMON_API.updateSocialLinks(social_obj)
      .then(() => {
        setLoading(false)
        setHasChange(false)
        toast.success('Social Links Updated')
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
        toast.error('Something went wrong')
      })
  }

  return (
    <div
      className={classNames(
        typeof verified !== 'undefined'
          ? verified
            ? 'bg-green-50'
            : 'bg-orange-50 border !border-orange-200 '
          : 'bg-gray-50',
        'flex relative items-center px-3 rounded-lg  dark:bg-blue-900 dark:bg-opacity-10'
      )}
    >
      {icon && (
        <span className="relative ">
          <FontAwesomeIcon
            className="w-5 h-5 text-slate-400"
            size="1x"
            icon={icon}
          />
        </span>
      )}
      <div className="flex-grow">
        <input
          {...rest}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          value={value}
          ref={ref}
          className={classNames(
            typeof verified !== 'undefined'
              ? verified
                ? 'text-primary-blue'
                : 'text-orange-700'
              : 'text-primary-blue',
            'w-full  px-4 py-3 text-sm bg-transparent rounded-lg outline-none '
          )}
          type={type}
          placeholder={placeholder}
        />
      </div>

      <div className="flex-shrink-0 ml-4">
        {true &&
          (loading ? (
            <SpinnerCircular
              size={30}
              secondaryColor={'transparent'}
              color="#C93FC0"
            />
          ) : (
            <button
              onClick={updateSocial}
              type="button"
              className="font-medium text-sm  rounded-md text-primary-blue hover:text-blue-500 focus:outline-none "
            >
              Update
            </button>
          ))}
      </div>
      {typeof verified !== 'undefined' && !verified && (
        <div className="absolute  -top-2 -right-2">
          <span className="relative flex items-center  group cursor-pointer">
            <FontAwesomeIcon
              className="w-5 h-5 text-orange-400"
              size="1x"
              icon={faExclamationCircle as IconProp}
            />
            <span className="group-hover:block bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg whitespace-nowrap left-5  absolute text-xs hidden">
              Not verified
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

export const SocialLinkUpdateInput = forwardRef(SocialLinkUpdateInputBase)
