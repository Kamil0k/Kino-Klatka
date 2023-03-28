import { IconChevronsDown } from '@tabler/icons-react';

import './Header.css'

const Header = () => {
	return (
		<div className='header'>
			<div className='header__img'>
				<h1 className='header__img-text'>
					<span className="header__img-text-title">Witajcie w Kinie Klatka</span>
					<br />w miejscu, gdzie <span className="header__img-text-color">filmy</span> to nasza <span className="header__img-text-color">pasja</span>!
				</h1>
                <IconChevronsDown className='header__img-arrows'/>
				<div className='header__img-shadow'></div>
			</div>
		</div>
	)
}

export default Header
