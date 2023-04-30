import './FilmsList.css'
import React, { useEffect, useState } from 'react'
import { database } from '../../firebase'
import FilmItem from './FilmItem'
import SearchInput from '../UI/SearchInput'

const FilmsList = (props) => {
	const [films, setFilms] = useState([])
	const [searchResults, setSearchResults] = useState([])

	const handleEditFilm = filmID => {
		const editedFilm = films.find(film => film.id === filmID)
        props.selectedFilm(editedFilm)
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
					setSearchResults(filmsArray)
				}
			} catch (error) {
				console.error('Błąd podczas pobierania filmów:', error)
			}
		}

		fetchFilms()
	}, [])

	const handleSearch = searchTerm => {
		if (searchTerm === '') {
			setSearchResults(films)
		} else {
			const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm.toLowerCase()))
			setSearchResults(filteredFilms)
		}
	}

	return (
		<>
			<SearchInput handleSearch={handleSearch} />
			<div className='films__list'>
				{searchResults.length > 0 ? (
					searchResults.map(film => <FilmItem key={film.id} film={film} onEdit={handleEditFilm} />)
				) : (
					<p className='films__list-attention'>Nie znaleziono filmu</p>
				)}
			</div>
		</>
	)
}

export default FilmsList
