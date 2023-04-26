import './NewFilm.css'
import React, { useState } from 'react'
import Button from '../UI/Button'

const NewFilm = () => {
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

	const [errorMessage, setErrorMessage] = useState('')

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

	const handleAddMovie = event => {
		event.preventDefault()
		// TODO: add movie to the database
	}

	return (
		<form className='new-film' onSubmit={handleAddMovie}>
			{errorMessage && <div className='new-film__error'>{errorMessage}</div>}
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
					<input type='number' name='duration'placeholder='[min]' value={movie.duration} onChange={handleInputChange} />
				</label>
				<label className='new-film__fields-label new-film__fields-label--half'>
					Bariera wiekowa:
					<input type='text' name='ageRating' value={movie.ageRating} onChange={handleInputChange} />
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
            <div className="new-film__buttons">
                <Button>Anuluj</Button>
                <Button>Dodaj</Button>
            </div>
		</form>
	)
}

export default NewFilm
