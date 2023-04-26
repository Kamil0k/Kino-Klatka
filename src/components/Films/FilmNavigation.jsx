import { useState } from 'react'
import SectionTitle from '../UI/SectionTitle'
import Button from '../UI/Button'
import NewFilm from './NewFilm'

import './FilmNavigation.css'

const FilmNavigation = () => {
	const [isLists, setIsLists] = useState(true)

	const handleListsOfFilmButton = () => {
		setIsLists(true)
	}

	const handleNewFilmButton = () => {
		setIsLists(false)
	}

	return (
		<>
			<div className='film-navigation wrapper'>
				<SectionTitle title={isLists ? 'Lista filmów' : 'Nowy film'} />
				<div className='film-navigation__buttons'>
					<Button onClick={handleListsOfFilmButton} disabled={isLists}>
						Lista filmów
					</Button>
					<Button onClick={handleNewFilmButton} disabled={!isLists}>
						Nowy film
					</Button>
				</div>
				{!isLists && <NewFilm/>}
			</div>
		</>
	)
}

export default FilmNavigation
