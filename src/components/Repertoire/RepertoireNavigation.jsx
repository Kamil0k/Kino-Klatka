import { useState } from 'react'
import SectionTitle from '../UI/SectionTitle'
import Button from '../UI/Button'
import NewRepertoire from './NewRepertoire'
import RepertoireMenu from './RepertoireMenu'

import './RepertoireNavigation.css'

const FilmNavigation = () => {
	const [isLists, setIsLists] = useState(true)

	const handleListsOfRepertoireButton = () => {
		setIsLists(true)
	}

	const handleNewRepertoireButton = () => {
		setIsLists(false)
	}

	const handleCancel = () =>{
		setIsLists(true)
	}

	return (
		<>
			<div className='film-navigation wrapper'>
				<SectionTitle title={isLists ? 'Repertuar' : 'Twórz repertuar'} />
				<div className='film-navigation__buttons'>
					<Button onClick={handleListsOfRepertoireButton} disabled={isLists}>
						Repertuar
					</Button>
					<Button onClick={handleNewRepertoireButton} disabled={!isLists}>
						Twórz repertuar
					</Button>
				</div>
				{!isLists && <NewRepertoire onCancel={handleCancel}/>}
				{isLists && <RepertoireMenu/>}
			</div>
		</>
	)
}

export default FilmNavigation
