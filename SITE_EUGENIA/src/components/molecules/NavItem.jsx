import { NavLink } from 'react-router-dom'
import { classNames } from '../../utils/classNames'

export function NavItem({ item, onClick }) {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      data-cursor="action"
      className={({ isActive }) => classNames('nav-link', isActive && 'nav-link-active')}
    >
      <span>{item.label}</span>
    </NavLink>
  )
}
