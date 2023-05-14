import { useState } from 'react'
import SectionTitle from '../UI/SectionTitle'
import Button from '../UI/Button'

import NewPromotion from './NewPromotion'
import ListOfPromotion from './ListsOfPromotion'

import './PromotionsNavigation.css'

const PromotionNavigation = () => {
	const [selectedFilm, setSelectedFilm] = useState(null)
	const [isLists, setIsLists] = useState(true)

	const handleListsOfPromotionsButton = () => {
		setIsLists(true)
	}

	const handleNewPromotionButton = () => {
		setIsLists(false)
		setSelectedFilm(null)
	}

	const handleSelectedPromotion = film => {
		setSelectedFilm(film)
		if (film !== null) {
			setIsLists(false)
		}
	}

	return (
		<>
			<div className='promotion-navigation wrapper'>
				<SectionTitle title={isLists ? 'Aktualne promocje' : 'Nowa promocja'} />
				<div className='promotion-navigation__buttons'>
					<Button onClick={handleListsOfPromotionsButton} disabled={isLists}>
						Promocje
					</Button>
					<Button onClick={handleNewPromotionButton} disabled={!isLists}>
						Nowa promocja
					</Button>
				</div>
				{!isLists && <NewPromotion onCancel={handleListsOfPromotionsButton}/>}
				{isLists && <ListOfPromotion />}
			</div>
		</>
	)
}

export default PromotionNavigation
