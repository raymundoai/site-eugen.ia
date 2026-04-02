import { classNames } from '../../utils/classNames'

export function TextareaField({ label, id, className, ...props }) {
  return (
    <label className="form-label" htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} className={classNames('field-control textarea-control', className)} {...props} />
    </label>
  )
}
