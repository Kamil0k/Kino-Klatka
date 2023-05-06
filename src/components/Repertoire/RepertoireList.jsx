import React, { useEffect, useState } from 'react'
import { database } from '../../firebase'
import Button from '../UI/Button'
import SearchInput from '../UI/SearchInput'
import SectionTitle from '../UI/SectionTitle'

import './RepertoireList.css'

const RepertoireList = props => {
	const [films, setFilms] = useState([])
	const [searchResults, setSearchResults] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = searchTerm => {
		setSearchTerm(searchTerm)
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
					setSearchResults(filmsArray) // Initialize searchResults with all films
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

	const handleSelectedFilm = film => {
		props.selectedFilm(film)
	}

	return (
		<>
			<SectionTitle title='Dostępne filmy' />
			<div className='repertoire-list'>
				<SearchInput handleSearch={handleSearch} />
				{searchResults.map(film => (
					<div className='repertoire-list__item' key={film.id}>
						<p className='repertoire-list__item-title'>{film.title}</p>
                        <p className='repertoire-list__item-time'>{film.duration} min.</p>
						<Button className='repertoire-list__item-button' onClick={() => handleSelectedFilm(film)}>
							Wybierz
						</Button>
					</div>
				))}
			</div>
		</>
	)
}

export default RepertoireList
