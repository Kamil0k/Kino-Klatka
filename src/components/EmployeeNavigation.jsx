import Brand from './UI/Brand'
import Button from './UI/Button'
import NavButton from './NavButton'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IconX, IconMenu2 } from '@tabler/icons-react'
import DropDownMenu from './DropDownMenu'
import './EmployeeNavigation.css'

const EmployeeNavigation = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(true)
	const { currentUser, signout } = useAuth()
	const navigate = useNavigate()

	const handleSignOut = async () => {
		try {
			await signout()
			navigate('/')
		} catch {
			console.log('Błąd wylogowania')
		}
	}

	const handleMenuButton = () => {
		setIsMenuVisible(true)
	}

	const handleXButton = () => {
		setIsMenuVisible(false)
	}
	return (
		<>
			<div className='hamburger-menu' onClick={handleMenuButton}>
				<IconMenu2 className='hamburger-menu__icon' />
				<p className='hamburger-menu__text'>menu</p>
			</div>
			<nav className={isMenuVisible ? 'employee-nav show' : 'employee-nav hide'}>
				<IconX className='employee-nav__x' onClick={handleXButton} />
				<div className='employee-nav__user'>
					<i className='fa-regular fa-user employee-nav__user-icon'></i>
					{currentUser && <p className='employee-nav__user-name'>{currentUser.displayName}</p>}
					<DropDownMenu onSignOut={handleSignOut}/>
				</div>
				<NavButton path='/films' name='filmy' icon={<i className='fa-solid fa-film'></i>}></NavButton>
				<NavButton
					path='/repertoire'
					name='repertuar'
					icon={<i className='fa-regular fa-rectangle-list'></i>}></NavButton>
				<NavButton path='/promotions' name='promocje' icon={<i className='fa-solid fa-tag'></i>}></NavButton>
				<NavButton path='/tickets' name='bilety' icon={<i className='fa-solid fa-ticket'></i>}></NavButton>
				<Brand />
			</nav>
		</>
	)
}

export default EmployeeNavigation
