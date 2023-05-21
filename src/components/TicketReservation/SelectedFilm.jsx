import SectionTitle from '../UI/SectionTitle'
import './SelectedFilm.css'

const SelectedFilm = () => {
	return (
		<div className='selected-film'>
			<SectionTitle title='Rezerwacja biletów' />
			<h3 className='selected-film__title'>Wybrany film</h3>
			<div className='selected-film__box'>
				<p className='selected-film__box-title'>Harry Pother i Książę Półkrwi</p>
				<p className='selected-film__box-time'>Godzina rozpoczęcia: 10:28</p>
				<p className='selected-film__box-date'>Data: 14.05.2023</p>
			</div>
		</div>
	)
}

export default SelectedFilm
