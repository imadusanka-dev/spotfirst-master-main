import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MergeElementProps } from 'core/types/MergeElementProps'
import { forwardRef, Ref } from 'react'

interface ISocialLinkInputProps {
  icon?: IconProp
  error?: boolean
  label?: string
}

type SocialLinkInputProps = MergeElementProps<'input', ISocialLinkInputProps>

const SocialLinkInputBase = (
  { placeholder, icon, type, ...rest }: SocialLinkInputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <div className="flex items-center px-3 rounded-lg bg-gray-50 dark:bg-blue-900 dark:bg-opacity-10">
      {icon && (
        <span className="relative ">
          <FontAwesomeIcon
            className="w-5 h-5 text-slate-400"
            size="1x"
            icon={icon}
          />
        </span>
      )}
      <input
        {...rest}
        ref={ref}
        className="w-full px-4 py-3 text-sm bg-transparent rounded-lg outline-none text-primary-blue"
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export const SocialLinkInput = forwardRef(SocialLinkInputBase)
