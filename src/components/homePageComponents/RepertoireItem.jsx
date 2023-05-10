import './RepertoireItem.css'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'

const RepertoireItem = props => {
	return (
		<>
			<div className='item'>
				<img className='item__img' src={props.src} alt={props.alt} />
				<div className='item__shadow'>
					<Link to={`films/${props.id}`}>
						<Button>Zobacz więcej</Button>
					</Link>
				</div>
			</div>
			<p className='name'>{props.title}</p>
		</>
	)
}

export default RepertoireItem
