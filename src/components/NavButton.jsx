import { NavLink } from 'react-router-dom'

import './NavButton.css'

const NavButton = props => {
	return (
		<>
			<NavLink to={props.path} className='nav-button'>
				<div className='nav-button__icon'>{props.icon}</div>
				<p className='nav-button__name'>{props.name}</p>
			</NavLink>
		</>
	)
}

export default NavButton
