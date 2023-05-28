import { useState, useEffect } from 'react'
import { database } from '../../firebase'
import './Tickets.css'

import SectionTitle from '../UI/SectionTitle'

const Tickets = () => {
	const [endDate, setEndDate] = useState(new Date())
	const [ticketPrices, setTicketPrices] = useState([])

	function getCurrentDate() {
		const currentDate = new Date()
		const day = String(currentDate.getDate()).padStart(2, '0')
		const month = String(currentDate.getMonth() + 1).padStart(2, '0')
		const year = String(currentDate.getFullYear())

		return `${day}.${month}.${year}`
	}

	function formatEndDate(date) {
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = String(date.getFullYear())

		return `${day}.${month}.${year}`
	}

	useEffect(() => {
		// Pobierz wartości biletów z bazy danych i zaktualizuj stan komponentu
		database
			.ref('ticketsPrice')
			.once('value')
			.then(snapshot => {
				const ticketPricesFromFirebase = snapshot.val()
				if (ticketPricesFromFirebase) {
					const endDateValue = ticketPricesFromFirebase.endDate
					const prices = Object.values(ticketPricesFromFirebase).slice(1, 6) // Pobierz tylko 5 pierwszych wartości
					setTicketPrices(prices)
					setEndDate(new Date(endDateValue))
				}
			})
			.catch(error => {
				console.error('Error fetching ticket prices from Firebase:', error)
			})
	}, [])

	const formattedEndDate = formatEndDate(endDate)

	return (
		<>
			<div className='tickets wrapper'>
				<SectionTitle title='Ceny biletów' />
				<div className='tickets__header'>
					<i className='fa-solid fa-ticket tickets__header-icon'></i>
					<h3 className='tickets__header-title'>
						Ceny sprzedaży biletów w dniach od {getCurrentDate()}-{formattedEndDate}
					</h3>
				</div>
				<div className='tickets__list'>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet klasyczny</p>
						<p className='tickets__list-item-price'>{ticketPrices[0]}zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet studencki*</p>
						<p className='tickets__list-item-price'>{ticketPrices[1]}zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet rodzinny**</p>
						<p className='tickets__list-item-price'>{ticketPrices[2]}zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet jednorazowy grupowy (powyżej 30 osób)</p>
						<p className='tickets__list-item-price'>{ticketPrices[3]}zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet jednorazowy grupowy (powyżej 100 osób)</p>
						<p className='tickets__list-item-price'>{ticketPrices[4]}zł</p>
					</div>
					<div className='tickets__list-attentions'>
						<div className='tickets__list-attention'>
							*Zniżka możliwa do uzyskania po przedstawieniu podbitej legitymacji studenckiej
						</div>
						<div className='tickets__list-attention'>
							**Zniżka dotyczy każdego członka rodziny, po przedstawieniu karty dużej rodziny
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Tickets
