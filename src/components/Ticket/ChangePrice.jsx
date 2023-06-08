import { useState, useEffect } from 'react'
import { database } from '../../firebase'

import Button from '../UI/Button'
import ChangeInput from './ChangeInput'

import './ChangePrice.css'

const ChangePrice = () => {
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [endDate, setEndDate] = useState(new Date())
	const [editItemIndex, setEditItemIndex] = useState(null)
	const [ticketPrices, setTicketPrices] = useState([])

	useEffect(() => {
		database
			.ref('ticketsPrice/endDate')
			.once('value')
			.then(snapshot => {
				const endDateFromFirebase = snapshot.val()
				if (endDateFromFirebase) {
					setEndDate(new Date(endDateFromFirebase))
				}
			})
			.catch(error => {
				console.error('Error fetching endDate from Firebase:', error)
			})

		database
			.ref('ticketsPrice')
			.once('value')
			.then(snapshot => {
				const ticketPricesFromFirebase = snapshot.val()
				if (ticketPricesFromFirebase) {
					const prices = Object.values(ticketPricesFromFirebase).slice(1, 6)
					setTicketPrices(prices)
				}
			})
			.catch(error => {
				console.error('Error fetching ticket prices from Firebase:', error)
			})
	}, [ticketPrices])

	const handleSaveDate = () => {
		setShowDatePicker(false)
		saveEndDateToFirebase(endDate)
	}

	function getCurrentDate() {
		const currentDate = new Date()
		const day = String(currentDate.getDate()).padStart(2, '0')
		const month = String(currentDate.getMonth() + 1).padStart(2, '0')
		const year = String(currentDate.getFullYear())

		return `${day}.${month}.${year}`
	}

	const saveEndDateToFirebase = endDate => {
		database
			.ref('ticketsPrice')
			.update({ endDate: endDate.toISOString().split('T')[0] })
			.then(() => {
				console.log('EndDate saved successfully in Firebase!')
			})
			.catch(error => {
				console.error('Error saving endDate to Firebase:', error)
			})
	}

	const handleCancel = () => {
		setShowDatePicker(false)
		setEditItemIndex(null)
	}

	const handleButtonClick = () => {
		setShowDatePicker(true)
		setEditItemIndex(null)
	}

	const handleItemBoxButtonClick = index => {
		setEditItemIndex(index)
	}

	const handleInputChangeCancel = () => {
		setEditItemIndex(null)
	}

	return (
		<div className='change-price'>
			<div className='change-price__title-box'>
				<p className='change-price__title-box-title'>
					Cena biletów obowiązująca od {getCurrentDate()} do {endDate.toLocaleDateString()}
				</p>
				{!showDatePicker && (
					<Button className='change-price__title-box-btn' onClick={handleButtonClick}>
						<i className='fa-solid fa-pen-to-square'></i>
					</Button>
				)}
			</div>

			{showDatePicker && (
				<div className='change-price__datepicker'>
					<input
						type='date'
						value={endDate.toISOString().split('T')[0]}
						onChange={e => setEndDate(new Date(e.target.value))}
					/>
					<div className='change-price__datepicker-buttons'>
						<Button className='change-price__datepicker-buttons-btn-save' onClick={handleSaveDate}>
							Zapisz
						</Button>
						<Button className='change-price__datepicker-buttons-btn-cancel' onClick={handleCancel}>
							Anuluj
						</Button>
					</div>
				</div>
			)}

			<div className='change-price__item'>
				<p className='change-price__item-title'>Bilet klasyczny</p>
				<div className='change-price__item-box'>
					<p className='change-price__item-box-value'>{ticketPrices[0]} zł</p>
					{editItemIndex !== 0 && (
						<Button className='change-price__item-box-btn' onClick={() => handleItemBoxButtonClick(0)}>
							<i className='fa-solid fa-pen-to-square'></i>
						</Button>
					)}
				</div>
			</div>
			{editItemIndex === 0 && <ChangeInput onCancel={handleInputChangeCancel} index={0} />}

			<div className='change-price__item'>
				<p className='change-price__item-title'>Bilet studencki</p>
				<div className='change-price__item-box'>
					<p className='change-price__item-box-value'>{ticketPrices[1]} zł</p>
					{editItemIndex !== 1 && (
						<Button className='change-price__item-box-btn' onClick={() => handleItemBoxButtonClick(1)}>
							<i className='fa-solid fa-pen-to-square'></i>
						</Button>
					)}
				</div>
			</div>
			{editItemIndex === 1 && <ChangeInput onCancel={handleInputChangeCancel} index={1} />}

			<div className='change-price__item'>
				<p className='change-price__item-title'>Bilet rodzinny</p>
				<div className='change-price__item-box'>
					<p className='change-price__item-box-value'>{ticketPrices[2]} zł</p>
					{editItemIndex !== 2 && (
						<Button className='change-price__item-box-btn' onClick={() => handleItemBoxButtonClick(2)}>
							<i className='fa-solid fa-pen-to-square'></i>
						</Button>
					)}
				</div>
			</div>
			{editItemIndex === 2 && <ChangeInput onCancel={handleInputChangeCancel} index={2} />}

			<div className='change-price__item'>
				<p className='change-price__item-title'>Bilet jednorazowy grupowy (powyżej 30 osób)</p>
				<div className='change-price__item-box'>
					<p className='change-price__item-box-value'>{ticketPrices[3]} zł</p>
					{editItemIndex !== 3 && (
						<Button className='change-price__item-box-btn' onClick={() => handleItemBoxButtonClick(3)}>
							<i className='fa-solid fa-pen-to-square'></i>
						</Button>
					)}
				</div>
			</div>
			{editItemIndex === 3 && <ChangeInput onCancel={handleInputChangeCancel} index={3} />}

			<div className='change-price__item'>
				<p className='change-price__item-title'>Bilet jednorazowy grupowy (powyżej 50 osób)</p>
				<div className='change-price__item-box'>
					<p className='change-price__item-box-value'>{ticketPrices[4]} zł</p>
					{editItemIndex !== 4 && (
						<Button className='change-price__item-box-btn' onClick={() => handleItemBoxButtonClick(4)}>
							<i className='fa-solid fa-pen-to-square'></i>
						</Button>
					)}
				</div>
			</div>
			{editItemIndex === 4 && <ChangeInput onCancel={handleInputChangeCancel} index={4} />}
		</div>
	)
}

export default ChangePrice
