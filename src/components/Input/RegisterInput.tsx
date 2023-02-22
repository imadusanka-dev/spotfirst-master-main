import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { MergeElementProps } from 'core/types/MergeElementProps'
import { forwardRef, Ref, useState } from 'react'
import { motion } from 'framer-motion'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
interface IRegisterInputProps {
  icon?: IconProp
  error?: boolean | string
  label?: string
  showPassword?: boolean
}

type RegisterInputProps = MergeElementProps<'input', IRegisterInputProps>

const RegisterInputBase = (
  {
    placeholder,
    type,
    error = false,
    label,
    className,
    showPassword = false,
    ...rest
  }: RegisterInputProps,
  ref: Ref<HTMLInputElement>
) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  function handleShowPassword() {
    setPasswordVisible(!isPasswordVisible)
  }

  return (
    <label
      className={classNames(className, 'flex flex-col text-sm text-gray-500')}
    >
      {label}
      <div
        className={classNames(
          error
            ? 'bg-red-50 dark:bg-red-900 dark:bg-opacity-20 '
            : 'bg-gray-50 dark:bg-blue-900 dark:bg-opacity-10',
          'relative flex items-center mt-2 rounded-lg '
        )}
      >
        <input
          ref={ref}
          {...rest}
          className={classNames(
            error
              ? 'ring-red-400 ring-1 text-red-500 '
              : 'focus:ring-blue-200 dark:focus:ring-primary-blue focus:ring-1 text-primary-blue-dark',
            'w-full rounded-lg placeholder:font-light px-5 py-3.5 text-sm bg-transparent outline-none '
          )}
          type={
            type === 'password'
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : type
          }
          placeholder={placeholder}
        />

        {type === 'password' && showPassword && (
          <span
            onClick={handleShowPassword}
            className="absolute w-5 h-5 cursor-pointer right-4"
          >
            {isPasswordVisible ? (
              <FontAwesomeIcon
                className="text-primary-blue"
                icon={faEyeSlash as IconProp}
              />
            ) : (
              <FontAwesomeIcon
                className="text-primary-blue"
                icon={faEye as IconProp}
              />
            )}
          </span>
        )}
      </div>
      <div>
        {error && (
          <motion.span
            transition={{
              duration: 0.3,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs text-red-400"
          >
            {error.toString()}
          </motion.span>
        )}
      </div>
    </label>
  )
}

export const RegisterInput = forwardRef(RegisterInputBase)
