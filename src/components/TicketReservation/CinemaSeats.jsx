import { useState, useEffect } from 'react'
import { database } from '../../firebase'

import './CinemaSeats.css'

const CinemaSeats = props => {
	const rows = 'ABCDEFGHIJKLMNOUPRSTW' 

	const [selectedSeats, setSelectedSeats] = useState([])
	const [occupiedSeats, setOccupiedSeats] = useState([])
	const [ticketPrices, setTicketPrices] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)

	const savedFilm = JSON.parse(localStorage.getItem('film'))

	useEffect(() => {
		const fetchOccupiedSeats = async () => {
			try {
				const date = savedFilm.date 
				const index = savedFilm.index 
				const snapshot = await database.ref(`CinemaPlan/${date}-${index}`).once('value')
				const occupiedSeatsData = snapshot.val() || []

				setOccupiedSeats(occupiedSeatsData)
			} catch (error) {
				console.error('Błąd podczas pobierania zajętych miejsc:', error)
			}
		}

		fetchOccupiedSeats()
	}, [savedFilm])

	useEffect(() => {
		setSelectedSeats([]) 
	}, [props.selectedTicket])

	useEffect(() => {
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
	}, [])

	useEffect(() => {
		let sum = 0
		selectedSeats.forEach(seat => {
			sum += +ticketPrices[+props.selectedTicket]
		})
		const roundedTotalPrice = sum.toFixed(2)
		setTotalPrice(roundedTotalPrice)
		props.onTotalPriceChange(roundedTotalPrice)
	}, [selectedSeats, ticketPrices, props.onTotalPriceChange])

	const handleSeatClick = seatNumber => {
		const row = rows.indexOf(seatNumber[0])
		const col = parseInt(seatNumber.slice(1))

		const isOccupied = occupiedSeats[row * 8 + col - 1]

		if (isOccupied) {
			return 
		}

		let updatedSelectedSeats
		if (selectedSeats.includes(seatNumber)) {
			updatedSelectedSeats = selectedSeats.filter(seat => seat !== seatNumber)
		} else {
			updatedSelectedSeats = [...selectedSeats, seatNumber]
		}

		setSelectedSeats(updatedSelectedSeats)
		props.onSeatSelection(updatedSelectedSeats)
	}

	const renderSeats = () => {
		const seats = []

		for (let row = 0; row < rows.length; row++) {
			for (let col = 1; col <= 8; col++) {
				const seatNumber = `${rows[row]}${col}`
				const isSelected = selectedSeats.includes(seatNumber)
				const isOccupied = occupiedSeats[row * 8 + col - 1]

				seats.push(
					<div
						key={seatNumber}
						className={`cinema-seats__box-item${isSelected ? ' selected' : ''}${isOccupied ? ' occupied' : ''}`}
						onClick={() => handleSeatClick(seatNumber)}>
						<i className='fa-solid fa-couch' />
						<p className='cinema-seats__box-item-value'>{seatNumber}</p>
					</div>
				)
			}
		}

		return seats
	}

	return (
		<div className='cinema-seats'>
			<h3 className='cinema-seats__title'>Wybierz miejsca</h3>
			<p className='cinema-seats__selected'>Wybrane miejsca: {selectedSeats.join(', ')}</p>
			<p className='cinema-seats__total-sum'>Do zapłaty: {totalPrice}zł</p>
			<div className='cinema-seats__box'>{renderSeats()}</div>
		</div>
	)
}

export default CinemaSeats
