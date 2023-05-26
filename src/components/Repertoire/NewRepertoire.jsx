import React, { useState, useEffect } from 'react'
import Button from '../UI/Button'
import NewRepertoireItem from './NewRepertoireItem'
import { database } from '../../firebase'

import './NewRepertoire.css'

const NewRepertoire = props => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
		data: '',
		openingTime: '',
		breakTime: '',
	})

	const [isFormValid, setIsFormValid] = useState(false)
	const [isAddingFilm, setIsAddingFilm] = useState(false)

	const [repertoireItems, setRepertoireItems] = useState([])
	const [loadRepertoireDates, setLoadRepertoireDates] = useState([])
	const [selectedFilm, setSelectedFilm] = useState(null)
	const [disabledButton, setDisabledButton] = useState(false)

	const handleInputChange = event => {
		const { name, value } = event.target
		setFormData(prevData => ({ ...prevData, [name]: value }))
		console.log(loadRepertoireDates)
	}

	const validateForm = () => {
		const { data, openingTime, breakTime } = formData
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/
		const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
		const isDataValid = dateRegex.test(data)
		const isDataOrginal = checkIfDataOrginal(data)
		const isOpeningTimeValid = timeRegex.test(openingTime)
		const isBreakTimeValid = Number(breakTime) > 0
		const isBreakTimeFilled = breakTime !== ''

		if (!isDataOrginal) {
			setErrorMessage('W tym dniu repertuar został już zaplanowany!')
		} else {
			setErrorMessage(null)
		}

		const isFormValid = isDataValid && isDataOrginal && isOpeningTimeValid && isBreakTimeValid && isBreakTimeFilled
		setIsFormValid(isFormValid)
	}

	const checkIfDataOrginal = data => {
		for (let i = 0; i < loadRepertoireDates.length; i++) {
			if (loadRepertoireDates[i] === data) {
				return false
			}
		}
		return true
	}

	const handleAddFilm = event => {
		event.preventDefault()
		setIsAddingFilm(true)
		// Dodanie nowego elementu NewRepertoireItem do tablicy
		const { openingTime, breakTime } = formData
		const newFilmItem = {
			startTime: repertoireItems.length === 0 ? openingTime : calculateStartTime(breakTime, selectedFilm.duration),
			selectedFilm: null,
		}
		setRepertoireItems(prevItems => [...prevItems, newFilmItem])
		setDisabledButton(true)
	}

	const handleSelectedFilm = film => {
		setSelectedFilm(film)
		setDisabledButton(false)
		const randomNumber = Math.floor(Math.random() * 1000000) + 1 // Losowa liczba z zakresu 1-1000000
		const key = `${film.id}-${randomNumber}` // Klucz zawierający losową liczbę
		setRepertoireItems(prevItems => {
			const updatedItems = [...prevItems]
			updatedItems[repertoireItems.length - 1] = {
				...updatedItems[repertoireItems.length - 1],
				selectedFilm: film,
			}
			return updatedItems
		})
	}

	const calculateStartTime = (breakTime, prevFilmDuration) => {
		const lastItem = repertoireItems[repertoireItems.length - 1]
		const lastStartTime = lastItem.startTime

		const [lastHours, lastMinutes] = lastStartTime.split(':').map(Number)

		const lastStartTimeInMinutes = lastHours * 60 + lastMinutes + Number(breakTime) + Number(prevFilmDuration)

		const finalHours = Math.floor(lastStartTimeInMinutes / 60) % 24
		const finalMinutes = lastStartTimeInMinutes % 60

		return `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`
	}

	const saveRepertoire = async (event) => {
		event.preventDefault();
		try {
		  setIsSubmitting(true);
		  const { data } = formData;
	  
		  const cinemaPlanItems = {};
	  
		  // Tworzenie elementów CinemaPlan dla każdego elementu repertoireItems
		  repertoireItems.forEach((item, index) => {
			const cinemaPlanKey = `${data}-${index}`;
			const cinemaPlan = Array(200).fill(false);
			cinemaPlanItems[cinemaPlanKey] = cinemaPlan;
		  });
	  
		  // Zapisanie elementów CinemaPlan do Firebase
		  await database.ref(`CinemaPlan`).update(cinemaPlanItems);
	  
		  // Zapisanie danych repertuaru do Firebase
		  await database.ref(`repertoire/${data}`).push(repertoireItems);
	  
		  setIsSubmitting(false);
		  setErrorMessage("");
		  setFormData({ data: "", openingTime: "", breakTime: "" });
		  setRepertoireItems([]);
		  setSelectedFilm(null);
		  setDisabledButton(false);
		  props.onCancel();
		} catch (error) {
		  setIsSubmitting(false);
		  setErrorMessage("Wystąpił błąd podczas zapisywania repertuaru.");
		  console.error(error);
		}
	  };
	  

	const submittingContent = (
		<p className='new-repertoire__submitting'>
			Proszę czekać...
			<br />
			Trwa tworzenie repertuaru!
		</p>
	)

	useEffect(() => {
		const fetchRepertoireDates = async () => {
			try {
				const snapshot = await database.ref('repertoire').once('value')
				const repertoireData = snapshot.val()

				if (repertoireData) {
					const repertoireDates = Object.keys(repertoireData)
					setLoadRepertoireDates(repertoireDates)
				}
			} catch (error) {
				console.error('Błąd podczas pobierania dat:', error)
			}
		}

		fetchRepertoireDates()
	}, [])

	return (
		<>
			<form className='new-repertoire'>
				{errorMessage && <div className='new-repertoire__error'>{errorMessage}</div>}
				{isSubmitting && submittingContent}
				{!isSubmitting && (
					<>
						<div className='new-repertoire__fields'>
							<label className='new-repertoire__fields-label new-repertoire__fields-label--half'>
								Data:
								<input
									type='date'
									name='data'
									value={formData.data}
									onChange={handleInputChange}
									onBlur={validateForm}
									disabled={isAddingFilm}
								/>
							</label>
							<label className='new-repertoire__fields-label new-repertoire__fields-label--half'>
								Godzina otwarcia kina:
								<input
									type='time'
									name='openingTime'
									value={formData.openingTime}
									onChange={handleInputChange}
									onBlur={validateForm}
									disabled={isAddingFilm}
								/>
							</label>
							<label className='new-repertoire__fields-label new-repertoire__fields-label--half'>
								Przerwa między seansami:
								<input
									type='number'
									name='breakTime'
									placeholder='[min]'
									value={formData.breakTime}
									onChange={handleInputChange}
									onKeyUp={validateForm}
									disabled={isAddingFilm}
								/>
							</label>
						</div>
						<Button
							className='new-repertoire__button-add'
							disabled={repertoireItems.length === 0 ? !isFormValid : disabledButton}
							onClick={handleAddFilm}>
							Dodaj film
						</Button>
						<div className='new-repertoire__items'>
							{repertoireItems.map((item, index) => (
								<NewRepertoireItem key={index} startTime={item.startTime} selectedFilm={handleSelectedFilm} />
							))}
						</div>
						<div className='new-repertoire__buttons'>
							<Button onClick={props.onCancel}>Anuluj</Button>
							<Button disabled={repertoireItems.length === 0 ? true : disabledButton} onClick={saveRepertoire}>
								Zapisz
							</Button>
						</div>
					</>
				)}
			</form>
		</>
	)
}

export default NewRepertoire
