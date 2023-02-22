import classNames from 'classnames'
import { MergeElementProps } from 'core/types/MergeElementProps'
import { motion } from 'framer-motion'
import { forwardRef, Ref } from 'react'

interface ILoginInputProps {
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element
  error?: boolean | string
  label?: string
}

type LoginInputProps = MergeElementProps<'input', ILoginInputProps>

const LoginInputBase = (
  { placeholder, type, error = false, className, ...rest }: LoginInputProps,
  ref: Ref<HTMLInputElement>
) => {
  return (
    <>
      <div
        className={classNames(
          error
            ? 'bg-red-50 dark:bg-red-900 dark:bg-opacity-20 '
            : 'bg-gray-50 dark:bg-blue-900 dark:bg-opacity-10',
          'rounded-lg transition-all duration-150 '
        )}
      >
        <input
          ref={ref}
          {...rest}
          className={classNames(
            className,
            error
              ? 'ring-red-400 ring-1 text-red-500 '
              : 'focus:ring-blue-200 dark:focus:ring-primary-blue focus:ring-1 text-primary-blue-dark',
            'w-full rounded-lg focus:outline-none placeholder:font-light  px-5 py-3.5 text-sm bg-transparent outline-none transition-all duration-150'
          )}
          type={type}
          placeholder={placeholder}
        />
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
    </>
  )
}

export const LoginInput = forwardRef(LoginInputBase)
