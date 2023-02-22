import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

interface ButtonProps {
  children?: any
  layout?: 'primary' | 'accent'
  href: string
}

const LinkButton: FC<ButtonProps> = ({
  children,
  layout = 'primary',
  href,
}) => {
  return (
    <Link
      href={href}
      className={classNames(
        `${
          layout === 'primary'
            ? ' text-white bg-primary-blue hover:bg-primary-blue-dark'
            : 'text-primary-blue bg-primary-blue bg-opacity-5 hover:bg-opacity-10'
        }`,
        'flex flex-row items-center justify-center px-4 text-sm font-medium transition-all duration-150 ease-in cursor-pointer select-none h-9 rounded-button '
      )}
    >
      {children}
    </Link>
  )
}

export default LinkButton
