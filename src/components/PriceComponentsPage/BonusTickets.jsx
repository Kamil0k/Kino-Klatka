import './BonusTickets.css'
import SectionTitle from '../UI/SectionTitle'
import BonusTicket from './BonusTicket'

const BonusTickets = () => {
	return (
		<>
			<div className='ticket-area wrapper'>
				<SectionTitle title='Bilety długoterminowe' />
				<div className='ticket-area__list'>
					<BonusTicket
						title='Bilet Singiel'
						icon={<i className='fa-solid fa-person ticket__icon'></i>}
						motto='Szukasz sposobu na spędzenie czasu w towarzystwie innych ludzi?'
						price1='289,99zł'
						price2='359,99zł'
						price3='425,99zł'
					/>
					<BonusTicket
						title='Bilet Familijny'
						icon={<i className='fa-solid fa-people-group ticket__icon'></i>}
						motto='Czy szukasz rozrywki dla całej twojej rodziny?'
						price1='459,99zł'
						price2='539,99zł'
						price3='699,99zł'></BonusTicket>
					<BonusTicket
						title='Bilet Para'
						icon={<i className='fa-solid fa-people-pulling ticket__icon'></i>}
						motto='Planujesz romantyczną randkę z ukochaną osobą?'
						price1='339,99zł'
						price2='439,99zł'
						price3='555,99zł'></BonusTicket>
				</div>
			</div>
		</>
	)
}

export default BonusTickets
