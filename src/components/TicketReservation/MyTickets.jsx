import { useState, useEffect } from 'react'
import { database } from '../../firebase'
import ReservationItem from '../Ticket/ReservationItem'
import SectionTitle from '../UI/SectionTitle'
import { useAuth } from '../../contexts/AuthContext'

import './MyTickets.css'

const MyTickets = () => {
	const { currentUser } = useAuth()
	const [userOrders, setUserOrders] = useState([])
	const [refresh, setRefresh] = useState()

	useEffect(() => {
		const fetchUserOrders = async () => {
			try {
				const ordersRef = database.ref('orders')
				const snapshot = await ordersRef.once('value')
				const ordersData = snapshot.val()

				if (ordersData) {
					const userOrdersArray = Object.entries(ordersData)
						.filter(([key, value]) => value.email === currentUser?.email)
						.map(([key, value]) => ({
							id: key,
							...value,
						}))
					setUserOrders(userOrdersArray)
				}
			} catch (error) {
				console.error('Błąd podczas pobierania zamówień:', error)
			}
		}

		fetchUserOrders()
	}, [currentUser?.email, refresh])

	const sortedOrders = [...userOrders].sort((a, b) => {
		if (a.status === false && b.status === true) {
			return -1
		} else if (a.status === true && b.status === false) {
			return 1
		} else {
			return 0
		}
	})

	const handleRefresh = () => {
		setRefresh(!refresh)
	}

	return (
		<div className='my-tickets wrapper'>
			<SectionTitle title='Moje rezerwacje' />
			{sortedOrders.map(order => (
				<ReservationItem key={order.id} order={order} onRemove={handleRefresh} />
			))}
		</div>
	)
}

export default MyTickets
