import { useState } from 'react'

import SectionTitle from '../UI/SectionTitle'
import Button from '../UI/Button'
import NewFilm from './NewFilm'
import FilmsList from './FilmsList'

import './FilmNavigation.css'

const FilmNavigation = () => {
	const [isLists, setIsLists] = useState(true)
	const [selectedFilm, setSelectedFilm] = useState(null)

	const handleListsOfFilmButton = () => {
		setIsLists(true)
	}

	const handleNewFilmButton = () => {
		setIsLists(false)
		setSelectedFilm(null)
	}

	const handleSelectedFilm = film => {
		setSelectedFilm(film)
		if (film !== null) {
			setIsLists(false)
		}
	}

	return (
		<>
			<div className='film-navigation wrapper'>
				<SectionTitle title={isLists ? 'Lista filmów' : (selectedFilm ? 'Edytuj film' : 'Nowy film')} />
				<div className='film-navigation__buttons'>
					<Button onClick={handleListsOfFilmButton} disabled={isLists}>
						Lista filmów
					</Button>
					<Button onClick={handleNewFilmButton} disabled={!isLists}>
						Nowy film
					</Button>
				</div>
				{!isLists && <NewFilm onCancel={handleListsOfFilmButton} editedFilm={selectedFilm} />}
				{isLists && <FilmsList selectedFilm={handleSelectedFilm} />}
			</div>
		</>
	)
}

export default FilmNavigation
