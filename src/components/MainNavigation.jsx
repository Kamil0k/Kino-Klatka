import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Brand from './UI/Brand'
import Button from './UI/Button'
import { IconMenu2, IconX } from '@tabler/icons-react'

import './MainNavigation.css'

function MainNavigation() {
	const [isMenuVisible, setMenuVisible] = useState(false)

	const handleHamburgerMenu = () => {
		setMenuVisible(isMenuVisible => !isMenuVisible)
	}

	const handleLinks = () => {
		setMenuVisible(false)
	}

	return (
		<>
			<div className='nav-box'>
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
								<NavLink to='/signin'>
									<Button>Zaloguj się</Button>
								</NavLink>
								{/* <div className='login-mobile__user'>
									<i className='fa-solid fa-user'></i>
									<p className='login-mobile__user-name'>Kamil Porada</p>
								</div> */}
							</div>
							<li>
								<NavLink
									to='/'
									className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
									onClick={handleLinks}
									end>
									strona główna
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/pupa'
									className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
									onClick={handleLinks}>
									repertuar
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/prices'
									className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
									onClick={handleLinks}>
									cennik
								</NavLink>
							</li>
							<li>
								<NavLink
									to='/dupa'
									className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
									onClick={handleLinks}>
									promocje
								</NavLink>
							</li>
						</ul>
					</nav>
					<nav className='nav-desktop'>
						<ul className='nav-desktop__list'>
							<li>
								<NavLink to='/' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')} end>
									strona główna
								</NavLink>
							</li>
							<li>
								<NavLink to='/pupa' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
									repertuar
								</NavLink>
							</li>
							<li>
								<NavLink to='/prices' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
									cennik
								</NavLink>
							</li>
							<li>
								<NavLink to='/dupa' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
									promocje
								</NavLink>
							</li>
						</ul>
					</nav>
					<div className='login-desktop'>
						<NavLink to='/signin'>
							<Button>Zaloguj się</Button>
						</NavLink>
						{/* <div className='login-desktop__user'>
							<i className='fa-solid fa-user'></i>
							<p className='login-desktop__user-name'>Kamil Porada</p>
						</div> */}
					</div>
				</div>
			</div>
		</>
	)
}

export default MainNavigation
