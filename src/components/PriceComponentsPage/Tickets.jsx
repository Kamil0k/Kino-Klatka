import './Tickets.css'

import SectionTitle from '../UI/SectionTitle'

const Tickets = () => {
	return (
		<>
			<div className='tickets wrapper'>
				<SectionTitle title='Ceny biletów' />
				<div className='tickets__header'>
					<i className='fa-solid fa-ticket tickets__header-icon'></i>
					<h3 className='tickets__header-title'>Ceny sprzedaży biletów w dniach od 01.04.2020-30.04.2023</h3>
				</div>
				<div className='tickets__list'>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet klasyczny</p>
						<p className='tickets__list-item-price'>25,5 zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet studencki*</p>
						<p className='tickets__list-item-price'>18 zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet rodzinny**</p>
						<p className='tickets__list-item-price'>20,5 zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet jednorazowy grupowy (powyżej 30 osób)</p>
						<p className='tickets__list-item-price'>16 zł</p>
					</div>
					<div className='tickets__list-item'>
						<p className='tickets__list-item-title'>Bilet jednorazowy grupowy (powyżej 100 osób)</p>
						<p className='tickets__list-item-price'>13 zł</p>
					</div>
					<div className='tickets__list-attentions'>
						<div className='tickets__list-attention'>
							*Zniżka możliwa do uzyskania po przedstawieniu podbitej legitymacji studenckiej
						</div>
						<div className='tickets__list-attention'>
							**Zniżka dotyczy każdego członka rodziny, po przedstawieniu karty dużej rodziny
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Tickets
