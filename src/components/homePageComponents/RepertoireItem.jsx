import './RepertoireItem.css'
import Button from '../UI/Button'

const RepertoireItem = props => {
	return (
		<>
			<div className='item'>
				<img className='item__img' src={props.src} alt={props.alt} />
				<div className='item__shadow'>
					<Button>Zobacz więcej</Button>
				</div>
			</div>
			<p className='name'>{props.title}</p>
		</>
	)
}

export default RepertoireItem
