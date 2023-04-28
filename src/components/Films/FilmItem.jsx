import './FilmItem.css'
import Button from '../UI/Button'

const FilmItem = props => {

	return (
		<>
			<div className='film-item'>
				<img className='film-item__img' src={props.film.thumbnail} alt='Jest alt' />
				<h3 className='film-item__title'>{props.film.title}</h3>
				<p className='film-item__genre'>{props.film.genre}</p>
				<div className='film-item__box'>
					<div className='film-item__box-item'>
						<i className='fa-solid fa-clock'></i>
						<p className='film-item__box-item-value'>{props.film.duration} minut</p>
					</div>
					<div className='film-item__box-item'>
						<i className='fa-solid fa-triangle-exclamation'></i>
						<p className='film-item__box-item-value'>{props.film.ageRating} lat</p>
					</div>
				</div>
				<div className='film-item__box'>
					<div className='film-item__box-item'>
						<i className='fa-solid fa-calendar'></i>
						<p className='film-item__box-item-value'>{props.film.releaseDate}</p>
					</div>
					<div className='film-item__box-item'>
						<i className='fa-solid fa-globe'></i>
						<p className='film-item__box-item-value'>{props.film.country}</p>
					</div>
				</div>
				<div className='film-item__buttons'>
					<Button>Edytuj</Button>
					<Button>Usuń</Button>
				</div>
			</div>
		</>
	)
}

export default FilmItem
