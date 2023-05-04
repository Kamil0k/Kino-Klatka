import { useState } from 'react'
import Button from '../UI/Button'
import RepertoireList from './RepertoireList'

import './NewRepertoireItem.css'

const NewRepertoireItem = props => {
	const [showRepertoireList, setShowRepertoireList] = useState(false)
	const [selectedFilm, setSelectedFilm] = useState(null)

	const handleShowRepertoireList = event => {
		event.preventDefault()
		setShowRepertoireList(true)
	}

	const handleSelectedFilm = film => {
		setSelectedFilm(film)
		setShowRepertoireList(false)
	}


	return (
		<>
			<div className='new-repertoire-item'>
				<div className='new-repertoire-item__fields'>
					<p className='new-repertoire-item__fields-title'>Godzina rozpoczęcia seansu:</p>
					<input type='time' />
				</div>
				{!selectedFilm && <p className='new-repertoire-item__error'>Wybierz film</p>}
				{selectedFilm && <div className='new-repertoire-item__title'>{selectedFilm.title}</div>}
				<Button className='new-repertoire-item__button-add' onClick={handleShowRepertoireList}>
					+
				</Button>
			</div>
			{showRepertoireList && <RepertoireList selectedFilm={handleSelectedFilm} />}
		</>
	)
}

export default NewRepertoireItem
