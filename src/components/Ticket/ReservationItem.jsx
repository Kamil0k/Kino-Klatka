import { useState } from 'react'
import Button from '../UI/Button'
import { useAuth } from '../../contexts/AuthContext'
import firebase, { database } from '../../firebase'
import './ReservationItem.css'

const ReservationItem = props => {
	const [status, setStatus] = useState(props.order.status)
	const [cancelConfirmation, setCancelConfirmation] = useState(false)
	const { isEmployee } = useAuth()
	const formattedSeats = props.order.selectedSeats.join(', ')

	const convertSeatIndex = seat => {
		const alphabet = 'ABCDEFGHIJKLMNOUPRSTW'
		const row = alphabet.indexOf(seat.charAt(0))
		const col = parseInt(seat.slice(1)) - 1
		return row * 8 + col
	}

	const getTicket = ticket => {
		switch (ticket) {
			case 0:
				return 'Bilet klasyczny'
			case 1:
				return 'Bilet studencki'
			case 2:
				return 'Bilet rodzinny'
			case 3:
				return 'Bilet jednorazowy grupowy (powyżej 30 osób)'
			case 4:
				return 'Bilet jednorazowy grupowy (powyżej 50 osób)'
			default:
				return 'Nieznany bilet'
		}
	}

	const handleOrderCompletion = async () => {
		try {
			const ordersRef = database.ref(`orders/${props.order.id}`)
			await ordersRef.update({ status: true })
			setStatus(true)
		} catch (error) {
			console.error('Błąd podczas zrealizowania zamówienia:', error)
		}
	}

	const handleCancelConfirmation = () => {
		setCancelConfirmation(true)
	}

	const handleCancelOrder = async () => {
		try {
			const ordersRef = database.ref(`orders/${props.order.id}`)
			await ordersRef.remove()
			props.onRemove()
			const convertedSeats = props.order.selectedSeats.map(seat => convertSeatIndex(seat))

			// Zaktualizuj tabelę miejsc w bazie danych
			const cinemaPlanRef = firebase.database().ref('CinemaPlan')
			const cinemaPlanSnapshot = await cinemaPlanRef
				.child(props.order.savedFilm.date + '-' + props.order.savedFilm.index)
				.once('value')
			const cinemaPlanData = cinemaPlanSnapshot.val()

			// Zaktualizuj status wybranych miejsc na "zajęte" (true)
			convertedSeats.forEach(seatIndex => {
				cinemaPlanData[seatIndex] = false
			})

			// Zapisz zaktualizowaną tabelę miejsc w bazie danych
			await cinemaPlanRef.child(props.order.savedFilm.date + '-' + props.order.savedFilm.index).set(cinemaPlanData)
			// Dodatkowe operacje po usunięciu zamówienia, jeśli są wymagane
		} catch (error) {
			console.error('Błąd podczas anulowania zamówienia:', error)
		}
	}

	return (
		<div className='reservation-item'>
			{isEmployee && (
				<div className='reservation-item__first-block'>
					<p className='reservation-item__first-block-id-title'>ID rezerwacji:</p>
					<p className='reservation-item__first-block-id'>{props.order.id} </p>
					<p className='reservation-item__first-block-title'>Dane rezerwującego:</p>
					<p className='reservation-item__first-block-person'>{props.order.user}</p>
					<p className='reservation-item__first-block-email'>{props.order.email}</p>
				</div>
			)}
			<div className='reservation-item__second-block'>
				<div className='reservation-item__second-block-title'>Dane spektaklu:</div>
				<p className='reservation-item__second-block-film'>Film: {props.order.savedFilm.title}</p>
				<p className='reservation-item__second-block-date'>Data: {props.order.savedFilm.date}</p>
				<p className='reservation-item__second-block-time'>Godzina: {props.order.savedFilm.startTime}</p>
			</div>
			<div className='reservation-item__third-block'>
				<p className='reservation-item__third-block-title'>Zarezerwowane miejsca:</p>
				<p className='reservation-item__third-block-seats'>{formattedSeats}</p>
			</div>
			<div className='reservation-item__fourth-block'>
				<p className='reservation-item__fourth-block-ticket'>{getTicket(props.order.selectedTicket)}</p>
				<p className='reservation-item__fourth-block-sum'>
					Do zaplaty: {props.order.amountOfSeats} x {props.order.ticketPrice} zł = {props.order.totalPrice}zł
				</p>
				<p className='reservation-item__fourth-block-status'>Status: {status ? 'opłacone' : 'nieopłacone'}</p>
				{isEmployee && (
					<Button
						disabled={status}
						className={`reservation-item__fourth-block-btn ${status ? 'completed' : ''}`}
						onClick={handleOrderCompletion}>
						Zrealizuj rezerwację
					</Button>
				)}
				{!isEmployee && (
					<div>
						{cancelConfirmation ? (
							<div>
								<p className='question'>Czy napewno chcesz anulować rezerwację?</p>
								<Button className='btn-yes' onClick={handleCancelOrder}>
									Tak
								</Button>
								<Button className='btn-no' onClick={() => setCancelConfirmation(false)}>
									Nie
								</Button>
							</div>
						) : (
							<Button
								className={`reservation-item__fourth-block-btn ${status ? 'completed' : ''}`}
								onClick={handleCancelConfirmation}>
								Anuluj rezerwację
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default ReservationItem
