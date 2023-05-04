import React, { useState } from 'react'
import Button from '../UI/Button'
import NewRepertoireItem from './NewRepertoireItem'
import RepertoireList from './RepertoireList'

import './NewRepertoire.css'

const NewRepertoire = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
		data: '',
		time: '',
	})
	const [isFormValid, setIsFormValid] = useState(false)

	const handleInputChange = event => {
		const { name, value } = event.target
		setFormData(prevData => ({ ...prevData, [name]: value }))
	}


	const validateForm = () => {
		const { data, time } = formData
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/
		const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
		const isDataValid = dateRegex.test(data)
		const isTimeValid = timeRegex.test(time)
		setIsFormValid(isDataValid && isTimeValid)
		if (!isDataValid || !isTimeValid) {
			setErrorMessage('Niepoprawny format daty lub godziny')
		} else {
			setErrorMessage('')
		}
	}

	const submittingContent = (
		<p className='new-repertoire__submitting'>
			Proszę czekać...
			<br />
			Trwa tworzenie repertuaru!
		</p>
	)

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
								/>
							</label>
							<label className='new-repertoire__fields-label new-repertoire__fields-label--half'>
								Godzina otwarcia kina:
								<input
									type='time'
									name='time'
									value={formData.time}
									onChange={handleInputChange}
									onBlur={validateForm}
								/>
							</label>
						</div>
						<Button className='new-repertoire__button-add' disabled={!isFormValid}>
							Dodaj film
						</Button>
						<div className='new-repertoire__items'>
							
						</div>
						<div className='new-repertoire__buttons'>
							<Button>Anuluj</Button>
							<Button>Zapisz</Button>
						</div>
					</>
				)}
			</form>
		</>
	)
}

export default NewRepertoire
