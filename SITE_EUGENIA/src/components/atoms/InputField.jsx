import { classNames } from '../../utils/classNames'

export function InputField({ label, id, className, ...props }) {
  return (
    <label className="form-label" htmlFor={id}>
      <span>{label}</span>
      <input id={id} className={classNames('field-control', className)} {...props} />
    </label>
  )
}
