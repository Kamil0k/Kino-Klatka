import { useState, useEffect } from 'react'
import DataItem from './DataItem'
import RepertoireItem from './RepertoireItem'
import './RepertoireMenu.css'
import { database } from '../../firebase'

const RepertoireMenu = () => {
	const [selectedItem, setSelectedItem] = useState(0)
	const [repertoireItems, setRepertoireItems] = useState([])
	const today = new Date()

	const dates = []
	for (let i = 0; i < 7; i++) {
		const date = new Date()
		date.setDate(today.getDate() + i)
		dates.push(date)
	}

	const handleItemClick = index => {
		setSelectedItem(index)
	}

	const dataItems = dates.map((date, index) => {
		const dayOfWeek = date.toLocaleDateString('pl-PL', { weekday: 'long' })
		const formattedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)
		const dayOfMonth = date.getDate()
		const month = date.toLocaleDateString('pl-PL', { month: 'long' })
		const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1)

		return (
			<DataItem
				key={date.toISOString()}
				dayOfWeek={formattedDayOfWeek}
				dayOfMonth={dayOfMonth}
				month={formattedMonth}
				active={selectedItem === index}
				onClick={() => handleItemClick(index)}
			/>
		)
	})

	useEffect(() => {
		const repertoireRef = database.ref('repertoire')

		repertoireRef.on('value', snapshot => {
			const data = snapshot.val()
			const items = Object.keys(data).map(key => ({
				id: key,
				...data[key],
			}))
			setRepertoireItems(items)
		})
	}, [])

	const repertoireItemsToRender = repertoireItems.filter(
		item => item.id === dates[selectedItem].toISOString().split('T')[0]
	)

	const { id, ...rest } = repertoireItemsToRender.length > 0 ? repertoireItemsToRender[0] : {}
	const itemsArray = Object.values(rest)[0]

	return (
		<>
			<div className='data-items'>{dataItems}</div>
			<div className='repertoire-items'>
				{!itemsArray && <p className='repertoire-items__information'>Brak zaplanowanego repertuaru na ten dzień!</p>}
				{itemsArray &&
					itemsArray.map(item => (
						<RepertoireItem key={item.id} selectedFilm={item.selectedFilm} startTime={item.startTime} />
					))}
			</div>
		</>
	)
}

export default RepertoireMenu
