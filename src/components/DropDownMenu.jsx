import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from './UI/Button'
import './DropDownMenu.css'

const DropDownMenu = props => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)
	const { currentUser, isEmployee } = useAuth()

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const handleClickOutside = event => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='menu-container' ref={menuRef}>
			<Button onClick={toggleMenu}>Moje konto</Button>
			<div className={`menu-container__dropdown ${isOpen ? 'open' : ''}`}>
				<ul>
					{currentUser && !isEmployee && (
						<Link to='/' className='menu-container__link'>
							<li className='menu-container__dropdown-item'>
								<i className='fa-solid fa-ticket'></i> Bilety
							</li>
						</Link>
					)}

					<Link to='/' className='menu-container__link'>
						<li className='menu-container__dropdown-item'>
							<i className='fa-solid fa-gear'></i> Ustawienia
						</li>
					</Link>
					<Link to='/' className='menu-container__link' onClick={props.onSignOut}>
						<li className='menu-container__dropdown-item'>
							<i className='fa-solid fa-arrow-right-from-bracket'></i> Wyloguj się
						</li>
					</Link>
				</ul>
			</div>
		</div>
	)
}

export default DropDownMenu
