import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Brand from './Brand'
import { IconMenu2, IconX } from '@tabler/icons-react'

import './MainNavigation.css'

function HamburgerNavigation() {
	const [isMenuVisible, setMenuVisible] = useState(false)

	const handleHamburgerMenu = () => {
		setMenuVisible(isMenuVisible => !isMenuVisible)
	}

	const handleLinks = () => {
		setMenuVisible(false)
	}

	return (
		<>
			<div className='nav'>
				<Brand />
				<nav className='nav-mobile'>
					{!isMenuVisible ? (
						<IconMenu2 onClick={handleHamburgerMenu} className='nav-mobile__icon' />
					) : (
						<IconX onClick={handleHamburgerMenu} className='nav-mobile__icon' />
					)}

					<ul className={`nav-mobile__list ` + `${isMenuVisible ? 'show' : 'hide'}`}>
						<li>
							<NavLink
								onClick={handleLinks}
								className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
								end>
								strona główna
							</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLinks} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
								repertuar
							</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLinks} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
								zaloguj się
							</NavLink>
						</li>
					</ul>
				</nav>
				<nav className='nav-desktop'>
					<ul className='nav-desktop__list'>
						<li>
							<NavLink to='/' className='nav-item' activeclassname='active' end>
								strona główna
							</NavLink>
						</li>
						<li>
							<NavLink className='nav-item' activeclassname='active'>
								repertuar
							</NavLink>
						</li>
						<li>
							<NavLink className='nav-item' activeclassname='active'>
								zaloguj się
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</>
	)
}

export default HamburgerNavigation
