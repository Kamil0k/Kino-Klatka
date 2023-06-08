import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IconMenu2, IconX } from '@tabler/icons-react'

import { useAuth } from '../contexts/AuthContext'
import Brand from './UI/Brand'
import Button from './UI/Button'
import DropDownMenu from './DropDownMenu'

import './MainNavigation.css'

function MainNavigation() {
	const [isMenuVisible, setMenuVisible] = useState(false)
	const { currentUser, signout, isEmployee } = useAuth()
	const navigate = useNavigate()

	const handleHamburgerMenu = () => {
		setMenuVisible(isMenuVisible => !isMenuVisible)
	}

	const handleLinks = () => {
		setMenuVisible(false)
	}

	const handleSignout = async () => {
		try {
			await signout()
		} catch {
			console.log('Błąd wylogowania')
		}
	}

	useEffect(() => {
		if (isEmployee && currentUser) {
			navigate('/employee')
		} else {
			navigate('/')
		}
	}, [isEmployee, currentUser])

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
								{currentUser ? (
									<DropDownMenu onSignOut={handleSignout} />
								) : (
									<NavLink to='/signin'>
										<Button onClick={handleLinks}>Zaloguj się</Button>
									</NavLink>
								)}
								{currentUser && (
									<div className='login-mobile__user'>
										<i className='fa-solid fa-user'></i>
										<p className='login-mobile__user-name'>{currentUser.displayName}</p>
									</div>
								)}
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
									to='/showrepertoire'
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
									to='/showpromotions'
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
								<NavLink to='/showrepertoire' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
									repertuar
								</NavLink>
							</li>
							<li>
								<NavLink to='/prices' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
									cennik
								</NavLink>
							</li>
							<li>
								<NavLink to='/showpromotions' className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
									promocje
								</NavLink>
							</li>
						</ul>
					</nav>
					<div className='login-desktop'>
						{currentUser ? (
							<DropDownMenu onSignOut={handleSignout} />
						) : (
							<NavLink to='/signin'>
								<Button>Zaloguj się</Button>
							</NavLink>
						)}

						{currentUser && (
							<div className='login-desktop__user'>
								<i className='fa-solid fa-user'></i>
								<p className='login-desktop__user-name'>{currentUser.displayName}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default MainNavigation
