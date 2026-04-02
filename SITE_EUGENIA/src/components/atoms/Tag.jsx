import { classNames } from '../../utils/classNames'

export function Tag({ children, tone = 'default', className }) {
  return <span className={classNames('tag', `tag-${tone}`, className)}>{children}</span>
}
