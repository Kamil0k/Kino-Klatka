import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { IconMovie, IconStereoGlasses } from '@tabler/icons-react'

import './Brand.css'

function Brand() {
	return (
		<>
			<div className='brand'>
				<IconMovie className='brand__icon' />
				<h1 className='brand__title'>
					kino
					<br />
					klatka
				</h1>
			</div>
		</>
	)
}

export default Brand
