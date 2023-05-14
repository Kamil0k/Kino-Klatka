import './NewFilm.css'
import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'

import { storage, database } from '../../firebase'

const NewFilm = props => {
	const [movie, setMovie] = useState({
		title: '',
		genre: '',
		duration: '',
		ageRating: '',
		releaseDate: '',
		country: '',
		trailerLink: '',
		description: '',
		thumbnail: null,
		heroImage: null,
	})
	const [thumbnailURL, setThumbnailURL] = useState('')
	const [heroImageURL, setHeroImageURL] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const submittingContent = (
		<p className='new-film__submitting'>
			Proszę czekać...
			<br />
			Trwa {props.editedFilm ? 'edycja' : 'dodawanie'} filmu!
		</p>
	)

	const handleInputChange = event => {
		const { name, value } = event.target
		setMovie({
			...movie,
			[name]: value,
		})
	}

	const handleFileInputChange = event => {
		const { name, files } = event.target
		setMovie({
			...movie,
			[name]: files[0],
		})
	}

	const handleCancel = () => {
		props.onCancel()
	}

	const handleAddMovie = async event => {
		event.preventDefault()

		for (const key in movie) {
			if (movie.hasOwnProperty(key) && movie[key] === '') {
				setErrorMessage('Uzupełnij wszystkie pola!')
				return
			}
		}

		if (parseInt(movie.ageRating) < 0) {
			setErrorMessage('Pole Bariera wiekowa nie może być mniejsze od 0!')
			return
		}

		if (parseInt(movie.duration) < 0) {
			setErrorMessage('Pole Czas trwania nie może być mniejsze od 0!')
			return
		}

		if (!movie.thumbnail || !movie.heroImage) {
			setErrorMessage('Dodaj oba obrazki (ikona i obrazek tła)!')
			return
		}

		try {
			setIsSubmitting(true)
			if (props.editedFilm) {
				const movieData = {
					title: movie.title,
					genre: movie.genre,
					duration: parseInt(movie.duration),
					ageRating: parseInt(movie.ageRating),
					releaseDate: movie.releaseDate,
					country: movie.country,
					trailerLink: movie.trailerLink,
					description: movie.description,
				}

				const movieRef = database.ref(`films/${props.editedFilm.id}`)
				await movieRef.update(movieData)
			} else {
				const storageRef = storage.ref()

				// Dodawanie obrazków do Firebase Storage
				const thumbnailRef = storageRef.child(`thumbnails/${movie.thumbnail.name}`)
				await thumbnailRef.put(movie.thumbnail)

				const heroImageRef = storageRef.child(`heroImages/${movie.heroImage.name}`)
				await heroImageRef.put(movie.heroImage)

				// Pobieranie URL obrazków z Firebase Storage
				const thumbnailURL = await thumbnailRef.getDownloadURL()
				const heroImageURL = await heroImageRef.getDownloadURL()

				const movieData = {
					title: movie.title,
					genre: movie.genre,
					duration: parseInt(movie.duration),
					ageRating: parseInt(movie.ageRating),
					releaseDate: movie.releaseDate,
					country: movie.country,
					trailerLink: movie.trailerLink,
					description: movie.description,
					thumbnail: thumbnailURL,
					heroImage: heroImageURL,
				}

				// Dodawanie filmu do bazy danych
				await database.ref('films').push(movieData)
			}
			// Zresetowanie formularza i komunikatu o błędzie
			setMovie({
				title: '',
				genre: '',
				duration: '',
				ageRating: '',
				releaseDate: '',
				country: '',
				trailerLink: '',
				description: '',
				thumbnail: null,
				heroImage: null,
			})
			setIsSubmitting(false)
			setErrorMessage('')
		} catch (error) {
			console.error('Błąd podczas edycji/dodawania filmu:', error)
			setErrorMessage('Wystąpił błąd podczas edycji/dodawania filmu')
		}
		props.onCancel()
		setErrorMessage('')
	}

	useEffect(() => {
		if (props.editedFilm) {
			const { id, title, genre, duration, ageRating, releaseDate, country, trailerLink, description } = props.editedFilm

			setMovie(prevMovie => ({
				...prevMovie,
				id,
				title,
				genre,
				duration: duration.toString(),
				ageRating: ageRating.toString(),
				releaseDate,
				country,
				trailerLink,
				description,
			}))
		}
	}, [props.editedFilm])

	return (
		<form className='new-film' onSubmit={handleAddMovie}>
			{errorMessage && <div className='new-film__error'>{errorMessage}</div>}
			{isSubmitting && submittingContent}
			{!isSubmitting && (
				<>
					<div className='new-film__fields'>
						<label className='new-film__fields-label new-film__fields-label--half'>
							Tytuł:
							<input type='text' name='title' value={movie.title} onChange={handleInputChange} />
						</label>
						<label className='new-film__fields-label new-film__fields-label--half'>
							Gatunek:
							<input type='text' name='genre' value={movie.genre} onChange={handleInputChange} />
						</label>
						<label className='new-film__fields-label new-film__fields-label--half'>
							Czas trwania:
							<input
								type='number'
								name='duration'
								placeholder='[min]'
								value={movie.duration}
								onChange={handleInputChange}
							/>
						</label>
						<label className='new-film__fields-label new-film__fields-label--half'>
							Bariera wiekowa:
							<input type='number' name='ageRating' value={movie.ageRating} onChange={handleInputChange} />
						</label>
						<label className='new-film__fields-label new-film__fields-label--half'>
							Data premiery
							<input type='date' name='releaseDate' value={movie.releaseDate} onChange={handleInputChange} />
						</label>
						<label className='new-film__fields-label new-film__fields-label--half'>
							Produkcja:
							<input type='text' name='country' value={movie.country} onChange={handleInputChange} />
						</label>
						<label className='new-film__fields-label'>
							Link do zwiastunu:
							<input type='text' name='trailerLink' value={movie.trailerLink} onChange={handleInputChange} />
						</label>
						<label className='new-film__fields-label' htmlFor='description'>
							Opis:
						</label>
						<textarea id='description' name='description' value={movie.description} onChange={handleInputChange} />
						<label className='new-film__fields-label new-film__fields-label--half'>
							Zdjęcie na ikonkę:
							<input type='file' name='thumbnail' onChange={handleFileInputChange} />
						</label>
						<label className='new-film__fields-label new-film__fields-label--half'>
							Zdjęcie na tło:
							<input type='file' name='heroImage' onChange={handleFileInputChange} />
						</label>
					</div>

					<div className='new-film__buttons'>
						<Button onClick={handleCancel}>Anuluj</Button>
						<Button>{props.editedFilm ? 'Edytuj' : 'Dodaj'}</Button>
					</div>
				</>
			)}
		</form>
	)
}

export default NewFilm
