import './Button.css'

/**
 * variant: 'primary' | 'secondary' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({ children, variant = 'primary', size = 'md', href, ...props }) {
  const cls = `btn btn-${variant} btn-${size}`

  if (href) {
    return <a href={href} className={cls} {...props}>{children}</a>
  }

  return <button className={cls} {...props}>{children}</button>
}
