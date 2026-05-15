import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const classes = `btn btn-${variant} ${className}`.trim()
  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={18} />
    </>
  )

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <a className={classes} href={href || '#contato'} {...props}>
      {content}
    </a>
  )
}
