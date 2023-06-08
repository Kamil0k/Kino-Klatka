import { useState } from 'react'
import { storage, database } from '../../firebase'

import Button from '../UI/Button'

import './NewPromotion.css'

const NewPromotion = props => {
	const [promotion, setPromotion] = useState({
		title: '',
		heroImage: null,
		description: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const submittingContent = (
		<p className='new-promotion__submitting'>
			Proszę czekać...
			<br />
			Trwa dodawanie promocji!
		</p>
	)

	const handleCancel = () => {
		props.onCancel()
	}

	const handleInputChange = event => {
		const { name, value } = event.target
		setPromotion({
			...promotion,
			[name]: value,
		})
	}

	const handleFileInputChange = event => {
		const { name, files } = event.target
		setPromotion({
			...promotion,
			[name]: files[0],
		})
	}

	const handleSubmit = async event => {
		event.preventDefault()

		if (!promotion.title || !promotion.description) {
			setErrorMessage('Podaj tytuł oraz opis promocji')
			return
		}

		if (!promotion.heroImage) {
			setErrorMessage('Dodaj obrazek!')
			return
		}

		try {
			setIsSubmitting(true)
			const storageRef = storage.ref()

			const heroImageRef = storageRef.child(`heroPromotion/${promotion.heroImage.name}`)
			await heroImageRef.put(promotion.heroImage)

			const heroImageURL = await heroImageRef.getDownloadURL()

			const promotionData = {
				title: promotion.title,
				description: promotion.description,
				heroImage: heroImageURL,
			}

			await database.ref('promotions').push(promotionData)

			setPromotion({
				title: '',
				description: '',
				heroImage: null,
			})
			setIsSubmitting(false)
			props.onCancel()
			setErrorMessage('')
		} catch (error) {
			console.error('Błąd podczas dodawania promocji!', error)
			setErrorMessage('Wystąpił błąd podczas dodawania promocji!')
		}
	}

	return (
		<form className='new-promotion' onSubmit={handleSubmit}>
			{errorMessage && <div className='new-promotion__error'>{errorMessage}</div>}
			{isSubmitting && submittingContent}
			{!isSubmitting && (
				<>
					<div className='new-promotion__fields'>
						<label className='new-promotion__fields-label new-promotion__fields-label--half'>
							Tytuł:
							<input type='text' name='title' onChange={handleInputChange} />
						</label>
						<label className='new-promotion__fields-label new-promotion__fields-label--half'>
							Zdjęcie na tło:
							<input type='file' name='heroImage' onChange={handleFileInputChange} />
						</label>
						<label className='new-promotion__fields-label' htmlFor='description'>
							Opis:
						</label>
						<textarea id='description' name='description' onChange={handleInputChange} />
					</div>

					<div className='new-promotion__buttons'>
						<Button onClick={handleCancel}>Anuluj</Button>
						<Button>Dodaj</Button>
					</div>
				</>
			)}
		</form>
	)
}

export default NewPromotion
