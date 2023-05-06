import { useState } from 'react'
import DataItem from './DataItem'
import './RepertoireMenu.css'

const RepertoireMenu = () => {
	const [selectedItem, setSelectedItem] = useState(0)
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

	return (
		<>
			<div className='data-items'>{dataItems}</div>
		</>
	)
}

export default RepertoireMenu
