import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Brand from './Brand'
import { IconMenu2 } from '@tabler/icons-react'

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
			<header className='header'>
				<Brand />
				<nav className='nav-mobile'>
					<IconMenu2 onClick={handleHamburgerMenu} className='nav-mobile__icon' />
					<ul className={`nav-mobile__list ` + `${isMenuVisible ? 'show' : 'hide'}`}>
						<li>
							<NavLink onClick={handleLinks} className='nav-mobile__list-item'>
								strona główna
							</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLinks} className='nav-mobile__list-item'>
								repertuar
							</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLinks} className='nav-mobile__list-item'>
								zaloguj się
							</NavLink>
						</li>
					</ul>
				</nav>
				<nav className='nav-desktop'>
					<ul className='nav-desktop__list'>
						<li>
							<NavLink className='nav-desktop__list-item'>strona główna</NavLink>
						</li>
						<li>
							<NavLink className='nav-desktop__list-item'>repertuar</NavLink>
						</li>
						<li>
							<NavLink className='nav-desktop__list-item'>zaloguj się</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		</>
	)
}

export default HamburgerNavigation
