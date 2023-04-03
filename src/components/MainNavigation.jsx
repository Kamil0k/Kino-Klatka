import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Brand from './Brand'
import Button from './UI/Button'
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
						<div className='login-mobile'>
							<Link>
								<Button>Wyloguj się</Button>
							</Link>
							<div className='login-mobile__user'>
								<i className='fa-solid fa-user'></i>
								<p className='login-mobile__user-name'>Kamil Porada</p>
							</div>
						</div>
						<li>
							<NavLink onClick={handleLinks} className='nav-item'>
								strona główna
							</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLinks} className='nav-item'>
								repertuar
							</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLinks} className='nav-item'>
								cennik
							</NavLink>
						</li>
						<li>
							<NavLink onClick={handleLinks} className='nav-item'>
								promocje
							</NavLink>
						</li>
					</ul>
				</nav>
				<nav className='nav-desktop'>
					<ul className='nav-desktop__list'>
						<li>
							<NavLink to='/' className='nav-item'>
								strona główna
							</NavLink>
						</li>
						<li>
							<NavLink className='nav-item'>repertuar</NavLink>
						</li>
						<li>
							<NavLink className='nav-item'>cennik</NavLink>
						</li>
						<li>
							<NavLink className='nav-item'>promocje</NavLink>
						</li>
					</ul>
				</nav>
				<div className='login-desktop'>
					<Link>
						<Button>Wyloguj się</Button>
					</Link>
					<div className='login-desktop__user'>
						<i className='fa-solid fa-user'></i>
						<p className='login-desktop__user-name'>Kamil Porada</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default HamburgerNavigation
