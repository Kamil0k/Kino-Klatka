import './RepertoireItem.css'

import { NavLink } from 'react-router-dom'

const RepertoireItem = props => {
	const [endHour, endMinute] = calculateEndTime(props.startTime, props.selectedFilm.duration)

	function calculateEndTime(startTime, duration) {
		const [startHour, startMinute] = startTime.split(':').map(Number)
		const totalMinutes = startHour * 60 + startMinute + duration
		let endHour = Math.floor(totalMinutes / 60)
		const endMinute = (totalMinutes % 60).toString().padStart(2, '0')
		if (endHour === 24) {
			endHour = '00'
		} else {
			endHour = endHour.toString().padStart(2, '0')
		}
		return [endHour, endMinute]
	}

	return (
		<div className='repertoire-item'>
			<img src={props.selectedFilm.thumbnail} alt='alt' className='repertoire-item__img' />
			<div className='repertoire-item__data-box'>
				<p className='repertoire-item__data-box-title'>{props.selectedFilm.title}</p>
				<p className='repertoire-item__data-box-genre'>{props.selectedFilm.genre}</p>
				<p className='repertoire-item__data-box-duration'>Czas trwania: {props.selectedFilm.duration} minut</p>
				<p className='repertoire-item__data-box-age-rating'>Od lat: {props.selectedFilm.ageRating}</p>
				<p className='repertoire-item__data-box-country'>Produkcja: {props.selectedFilm.country}</p>
				<NavLink to={`../films/${props.selectedFilm.id}`} exact={false} className='repertoire-item__data-box-link'>
					<p>Zobacz więcej...</p>
				</NavLink>
				<div className='repertoire-item__data-box-time'>
					<i className='fa-solid fa-clock'></i>
					<p className='repertoire-item__data-box-time-value'>
						{props.startTime}-{endHour}:{endMinute}
					</p>
				</div>
			</div>
		</div>
	)
}

export default RepertoireItem
