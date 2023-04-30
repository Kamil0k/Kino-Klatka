import { useState } from 'react'
import './FilmItem.css'
import Button from '../UI/Button'

const FilmItem = props => {
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = () => {
		setIsDeleting(true)
	}

	const confirmDelete = () => {
		props.onDelete(props.film.id)
	}

	const cancelDelete = () => {
		setIsDeleting(false)
	}

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
					{!isDeleting && <Button onClick={() => props.onEdit(props.film.id)}>Edytuj</Button>}
					{isDeleting ? (
						<>
							<Button onClick={cancelDelete}>Anuluj</Button>
							<Button onClick={confirmDelete}>Potwierdź</Button>
						</>
					) : (
						<Button onClick={handleDelete}>Usuń</Button>
					)}
				</div>
			</div>
		</>
	)
}

export default FilmItem
