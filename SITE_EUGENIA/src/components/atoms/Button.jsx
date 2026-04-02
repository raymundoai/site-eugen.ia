import { classNames } from '../../utils/classNames'

const variants = {
  primary: 'btn btn-primary',
  outline: 'btn btn-outline',
  ghost: 'btn btn-ghost',
  glass: 'btn btn-glass',
}

const sizes = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

export function Button({
  as,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const Component = as || 'button'

  return (
    <Component className={classNames(variants[variant], sizes[size], className)} {...props}>
      {children}
    </Component>
  )
}
