import './RepertoireItem.css'

import { IconEye } from '@tabler/icons-react'

const RepertoireItem = props => {
	return (
		<>
			<div className='item'>
				<img className='item__img' src={props.src} alt={props.alt} />
				<div className='item__shadow'>
					<IconEye className='item__shadow-icon' />
                    <p className="item__shadow-text">Zobacz więcej!</p>
				</div>
			</div>
		</>
	)
}

export default RepertoireItem
