import { IconChevronsDown } from '@tabler/icons-react'

import './Header.css'

const Header = () => {
	return (
		<div className='header'>
			<div className='header__img'>
				<h1 className='header__img-text'>
					<span className='header__img-text-title'>
						Otwórz się na emocje w <span className='header__img-text-color'>kinie Klatka </span>-{' '}
					</span>{' '}
					<br />
					najlepsze filmy czekają na Ciebie"
				</h1>
				<a href='#aboutus'>
					<IconChevronsDown className='header__img-arrows' />
				</a>
				<div className='header__img-shadow'></div>
			</div>
		</div>
	)
}

export default Header
