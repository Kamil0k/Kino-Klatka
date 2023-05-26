import React, { useState, useEffect } from 'react'
import './CinemaSeats.css'
import { database } from '../../firebase'

const CinemaSeats = () => {
	const rows = 'ABCDEFGHIJKLMNOUPRSTW' // Litery rządów

	const [selectedSeats, setSelectedSeats] = useState([])
	const [occupiedSeats, setOccupiedSeats] = useState([])

	const savedFilm = JSON.parse(localStorage.getItem('film'))

	useEffect(() => {
		const fetchOccupiedSeats = async () => {
			try {
				// Pobierz zajęte miejsca z bazy danych na podstawie daty i indeksu
				const date = savedFilm.date // Zależnie od struktury danych w `savedFilm` dostosuj sposób pobierania daty
				const index = savedFilm.index // Zależnie od struktury danych w `savedFilm` dostosuj sposób pobierania indeksu
				const snapshot = await database.ref(`CinemaPlan/${date}-${index}`).once('value')
				const occupiedSeatsData = snapshot.val() || []

				// Ustaw zajęte miejsca w stanie komponentu
				setOccupiedSeats(occupiedSeatsData)
			} catch (error) {
				console.error('Błąd podczas pobierania zajętych miejsc:', error)
			}
		}

		fetchOccupiedSeats()
	}, [savedFilm])

	const handleSeatClick = seatNumber => {
        const row = rows.indexOf(seatNumber[0]);
        const col = parseInt(seatNumber.slice(1));
      
        const isOccupied = occupiedSeats[row * 8 + col - 1];
      
        if (isOccupied) {
          return; // Zwróć, jeśli miejsce jest zajęte
        }
      
        if (selectedSeats.includes(seatNumber)) {
          setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
          setSelectedSeats([...selectedSeats, seatNumber]);
        }
      };
      

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
		<div
			className='cinema-seats'
			onClick={() => {
				console.log(savedFilm)
			}}>
			<h3 className='cinema-seats__title'>Wybierz miejsca</h3>
			<p className='cinema-seats__selected'>Wybrane miejsca: {selectedSeats.join(', ')}</p>
			<p className='cinema-seats__total-sum'>Do zapłaty: 120zł</p>
			<div className='cinema-seats__box'>{renderSeats()}</div>
		</div>
	)
}

export default CinemaSeats
