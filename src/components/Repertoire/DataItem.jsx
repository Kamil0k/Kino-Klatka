import './DataItem.css'

const DataItem = props => {
	const { dayOfWeek, dayOfMonth, month, active, onClick } = props

	const handleClick = () => {
		onClick && onClick()
	}

	return (
		<div className={`data-item ${active ? 'new-item-active' : ''}`} onClick={handleClick}>
			<p className='data-item__day-of-week'>{dayOfWeek}</p>
			<p className='data-item__day-of-month'>{dayOfMonth}</p>
			<p className='data-item__month'>{month}</p>
		</div>
	)
}

export default DataItem
