import { FC } from 'react'
import classNames from 'classnames'

interface ButtonProps {
  children?: any
  layout?: 'primary' | 'accent'
  size?: 'sm' | 'base' | 'lg'
  className?: string
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({
  children,
  layout = 'primary',
  className,
  onClick,
  size = 'base',
}) => {
  let sizeClassName = 'px-4 py-2'

  switch (size) {
    case 'sm':
      sizeClassName = 'px-4 py-1'
      break
    default:
      break
  }

  return (
    <button
      onClick={onClick}
      className={classNames(
        sizeClassName,
        className,
        `${
          layout === 'primary'
            ? ' text-white bg-primary-blue hover:bg-primary-blue-dark'
            : 'text-primary-blue bg-primary-blue bg-opacity-5 hover:bg-opacity-10'
        }`,
        'flex flex-row items-center justify-center  text-sm  transition-all duration-150 ease-in cursor-pointer select-none rounded-button '
      )}
    >
      {children}
    </button>
  )
}

export default Button
