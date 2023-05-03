import './FilmsList.css'
import React, { useEffect, useState } from 'react'
import { database } from '../../firebase'
import FilmItem from './FilmItem'
import SearchInput from '../UI/SearchInput'
import { storage } from '../../firebase'
import { Link } from 'react-router-dom'

const FilmsList = props => {
	const [films, setFilms] = useState([])
	const [searchResults, setSearchResults] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

	const handleEditFilm = filmID => {
		const editedFilm = films.find(film => film.id === filmID)
		props.selectedFilm(editedFilm)
	}

	const handleDeleteFilm = async filmID => {
		try {
			// Pobierz informacje o filmie z bazy danych
			const filmRef = database.ref(`films/${filmID}`)
			const snapshot = await filmRef.once('value')
			const film = snapshot.val()

			// Usuń film z bazy danych
			await filmRef.remove()

			// Usuń obrazy filmu z Firebase Storage
			const thumbnailRef = storage.refFromURL(film.thumbnail)
			const heroImageRef = storage.refFromURL(film.heroImage)

			await thumbnailRef.delete()
			await heroImageRef.delete()
		} catch (error) {
			console.error('Błąd podczas usuwania filmu:', error)
		}
	}

	const handleSearch = searchTerm => {
		if (searchTerm === '') {
			setSearchResults(films)
		} else {
			const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm.toLowerCase()))
			setSearchResults(filteredFilms)
		}
	}

	useEffect(() => {
		const fetchFilms = async () => {
			try {
				const snapshot = await database.ref('films').once('value')
				const filmsData = snapshot.val()

				if (filmsData) {
					const filmsArray = Object.keys(filmsData).map(key => ({
						id: key,
						...filmsData[key],
					}))
					setFilms(filmsArray)
				}
			} catch (error) {
				console.error('Błąd podczas pobierania filmów:', error)
			}
		}

		fetchFilms()
	}, [])

	useEffect(() => {
		if (searchTerm === '') {
			setSearchResults(films)
		} else {
			const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm.toLowerCase()))
			setSearchResults(filteredFilms)
		}
	}, [films, searchTerm])

	return (
		<>
			<SearchInput handleSearch={handleSearch} />
			<div className='films__list'>
				{searchResults.length > 0 ? (
					searchResults.map(film => (
						<Link to={`${film.id}`} style={{ textDecoration: 'none' }} key={film.id}>
							<FilmItem film={film} onEdit={handleEditFilm} onDelete={handleDeleteFilm} />
						</Link>
					))
				) : (
					<p className='films__list-attention'>Nie znaleziono filmu</p>
				)}
			</div>
		</>
	)
}

export default FilmsList
