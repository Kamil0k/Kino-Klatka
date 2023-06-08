import React, { useEffect, useState } from 'react'
import { database } from '../../firebase'
import { storage } from '../../firebase'

import FilmItem from './FilmItem'
import SearchInput from '../UI/SearchInput'

import './FilmsList.css'

const FilmsList = props => {
	const [films, setFilms] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const handleEditFilm = filmID => {
		const editedFilm = films.find(film => film.id === filmID)
		props.selectedFilm(editedFilm)
	}

	const handleDeleteFilm = async filmID => {
		try {
			const filmRef = database.ref(`films/${filmID}`)
			const snapshot = await filmRef.once('value')
			const film = snapshot.val()

			await filmRef.remove()

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
						<FilmItem film={film} onEdit={handleEditFilm} onDelete={handleDeleteFilm} key={film.id} />
					))
				) : (
					<p className='films__list-attention'>Nie znaleziono filmu</p>
				)}
			</div>
		</>
	)
}

export default FilmsList
