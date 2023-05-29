import React, { useState, useEffect } from 'react'
import SectionTitle from '../UI/SectionTitle'
import CinemaSeats from './CinemaSeats'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './SelectedFilm.css'

const SelectedFilm = () => {
	const savedFilm = JSON.parse(localStorage.getItem('film'))
	const [selectedTicket, setSelectedTicket] = useState(0)
	const [selectedSeats, setSelectedSeats] = useState([])
	const [totalPrice, setTotalPrice] = useState(0)
	const [newOrderId, setNewOrderId] = useState(0)
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	const handleTicketChange = event => {
		setSelectedTicket(+event.target.value)
	}

	const handleSeatSelection = selectedSeats => {
		setSelectedSeats(selectedSeats)
	}

	const handleTotalPriceChange = newTotalPrice => {
		setTotalPrice(newTotalPrice)
	}

	const convertSeatIndex = seat => {
		const alphabet = 'ABCDEFGHIJKLMNOUPRSTW'
		const row = alphabet.indexOf(seat.charAt(0))
		const col = parseInt(seat.slice(1)) - 1
		return row * 8 + col
	}

	useEffect(() => {
		const ordersRef = firebase.database().ref('orders')
		ordersRef.on('value', snapshot => {
			const ordersData = snapshot.val()
			const count = Object.keys(ordersData).length
			setNewOrderId(count)
		})

		return () => {
			ordersRef.off('value')
		}
	}, [])

	useEffect(() => {
		setSelectedSeats([])
	}, [selectedTicket])

	let attentionText = ''
	let isButtonDisabled = true

	if (selectedTicket === '2') {
		attentionText = 'Wybierz do 10 miejsc!'
		isButtonDisabled = selectedSeats.length === 0 || selectedSeats.length > 10
	} else if (selectedTicket === '3') {
		attentionText = 'Wybierz powyżej 30 miejsc!'
		isButtonDisabled = selectedSeats.length < 30
	} else if (selectedTicket === '4') {
		attentionText = 'Wybierz powyżej 50 miejsc!'
		isButtonDisabled = selectedSeats.length < 50
	} else {
		isButtonDisabled = selectedSeats.length === 0
	}

	const handleReservation = async () => {
		const ordersRef = firebase.database().ref('orders')
		const newOrder = {
			id: newOrderId,
			email: currentUser.email,
			savedFilm,
			selectedSeats,
			selectedTicket,
			totalPrice,
		}

		const convertedSeats = selectedSeats.map(seat => convertSeatIndex(seat))

		// Zaktualizuj tabelę miejsc w bazie danych
		const cinemaPlanRef = firebase.database().ref('CinemaPlan')
		const cinemaPlanSnapshot = await cinemaPlanRef.child(savedFilm.date + '-' + savedFilm.index).once('value')
		const cinemaPlanData = cinemaPlanSnapshot.val()

		// Zaktualizuj status wybranych miejsc na "zajęte" (true)
		convertedSeats.forEach(seatIndex => {
			cinemaPlanData[seatIndex] = true
		})

		// Zapisz zaktualizowaną tabelę miejsc w bazie danych
		await cinemaPlanRef.child(savedFilm.date + '-' + savedFilm.index).set(cinemaPlanData)

		await ordersRef
			.push(newOrder)
			.then(() => {
				navigate('/showrepertoire')
			})
			.catch(error => {
				console.error('Błąd podczas zapisywania zamówienia:', error)
				// Tutaj możesz dodać kod do wyświetlenia informacji o błędzie zapisu zamówienia
			})
	}

	return (
		<div className='selected-film'>
			<SectionTitle title='Rezerwacja biletów' />
			<h3 className='selected-film__title'>Wybrany film</h3>
			<div className='selected-film__box'>
				<p className='selected-film__box-title'>{savedFilm.title}</p>
				<p className='selected-film__box-time'>Godzina rozpoczęcia: {savedFilm.startTime}</p>
				<p className='selected-film__box-date'>Data: {savedFilm.date}</p>
			</div>
			<h3 className='selected-film__title'>Wybierz bilet</h3>
			<select className='selected-film__options' onChange={handleTicketChange}>
				<option value='0'>Bilet klasyczny</option>
				<option value='1'>Bilet studencki</option>
				<option value='2'>Bilet rodzinny (do 10 osób)</option>
				<option value='3'>Bilet jednorazowy grupowy (powyżej 30 osób)</option>
				<option value='4'>Bilet jednorazowy grupowy (powyżej 50 osób)</option>
			</select>
			{attentionText && <p className='selected-film__attention'>{attentionText}</p>}
			<CinemaSeats
				selectedTicket={selectedTicket}
				onSeatSelection={handleSeatSelection}
				onTotalPriceChange={handleTotalPriceChange}
			/>

			<div className='selected-film__buttons'>
				<Button className='selected-film__buttons-btn'>
					<Link to='/showrepertoire' style={{ textDecoration: 'none', color: 'white' }}>
						Anuluj
					</Link>
				</Button>
				<Button className='selected-film__buttons-btn' disabled={isButtonDisabled} onClick={handleReservation}>
					Zarezerwuj
				</Button>
			</div>
		</div>
	)
}

export default SelectedFilm
