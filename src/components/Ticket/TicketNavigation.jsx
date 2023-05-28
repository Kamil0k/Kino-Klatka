import { useState } from 'react'
import SectionTitle from '../UI/SectionTitle'
import Button from '../UI/Button'
import ChangePrice from './ChangePrice'

import './TicketNavigation.css'

const TicketNavigation = () => {
	const [isLists, setIsLists] = useState(true)

	const handleReservationButton = () => {
		setIsLists(true)
	}

	const handleChangePriceButton = () => {
		setIsLists(false)
	}

	const handleCancel = () =>{
		setIsLists(true)
	}

	return (
		<>
			<div className='ticket-navigation wrapper'>
				<SectionTitle title={isLists ? 'Rezerwacja biletów' : 'Ceny biletów'} />
				<div className='ticket-navigation__buttons'>
					<Button className='ticket-navigation__buttons-btn' onClick={handleReservationButton} disabled={isLists}>
						Rezerwacja biletów
					</Button>
					<Button className='ticket-navigation__buttons-btn' onClick={handleChangePriceButton}  disabled={!isLists}>
						Ceny biletów
					</Button>
				</div>
				{!isLists && <ChangePrice onCancel={handleCancel}/>}
				{/* {isLists && <RepertoireMenu/>} */}
			</div>
		</>
	)
}

export default TicketNavigation
