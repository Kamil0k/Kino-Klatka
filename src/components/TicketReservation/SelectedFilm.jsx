import SectionTitle from '../UI/SectionTitle'
import CinemaSeats from './CinemaSeats'
import Button from '../UI/Button'
import './SelectedFilm.css'

const SelectedFilm = () => {
	const savedFilm = JSON.parse(localStorage.getItem('film'))

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
			<select name="" id="" className="selected-film__options">
                <option>Bilet klasyczny</option>
                <option>Bilet studencki</option>
                <option>Bilet rodzinny (do 10 osób)</option>
                <option>Bilet jednorazowy grupowy (powyżej 30 osób)</option>
                <option>Bilet jednorazowy grupowy (powyżej 50 osób)</option>
            </select>
			<CinemaSeats/>
			<div className="selected-film__buttons">
				<Button className="selected-film__buttons-btn">Anuluj</Button>
				<Button className="selected-film__buttons-btn">Zarezerwuj</Button>
			</div>
		</div>
	)
}

export default SelectedFilm
