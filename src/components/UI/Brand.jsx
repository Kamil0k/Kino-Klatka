import { useNavigate } from 'react-router-dom'
import { IconMovie } from '@tabler/icons-react'

import './Brand.css'

function Brand() {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/')
	}
	return (
		<>
			<div className='brand' onClick={handleClick}>
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
