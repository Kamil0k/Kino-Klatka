import Brand from './UI/Brand'
import Button from './UI/Button'
import NavButton from './NavButton'
import { IconX, IconMenu2 } from '@tabler/icons-react'
import './EmployeeNavigation.css'

const EmployeeNavigation = () => {
	return (
		<>
        <div className="hamburger-menu">
            <IconMenu2 className='hamburger-menu__icon'/>
            <p className="hamburger-menu__text">menu</p>
        </div>
			<div className='nav'>
				<IconX className='nav__x' />
				<div className='nav__user'>
					<i className='fa-regular fa-user nav__user-icon'></i>
					<p className='nav__user-name'>Kamil Porada</p>
					<Button>Wyloguj się</Button>
				</div>
				<NavButton name='filmy' icon={<i className='fa-solid fa-film'></i>}></NavButton>
				<NavButton name='repertuar' icon={<i className='fa-regular fa-rectangle-list'></i>}></NavButton>
				<NavButton name='promocje' icon={<i className='fa-solid fa-tag'></i>}></NavButton>
				<NavButton name='bilety' icon={<i className='fa-solid fa-ticket'></i>}></NavButton>
				<Brand />
			</div>
		</>
	)
}

export default EmployeeNavigation
