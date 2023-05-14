import './InRepertoire.css'
import Slider from 'react-slick'

import SectionTitle from '../UI/SectionTitle'
import RepertoireItem from './RepertoireItem'
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { database } from '../../firebase'
import { Link } from 'react-router-dom'
const InRepertoire = () => {
	const [films, setFilms] = useState([])
	const { currentUser, isEmployee } = useAuth()
	const settings = {
		className: 'repertoire__items',
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		centerPadding: '50px',
		autoplaySpeed: 4000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	useEffect(() => {
		const fetchFilms = async () => {
			try {
				const snapshot = await database.ref('films').once('value')
				const filmsData = snapshot.val()

				if (filmsData) {
					const filmsArray = Object.keys(filmsData).map(key => ({
						id: key,
						...filmsData[key],
					}))
					setFilms(filmsArray.sort(() => Math.random() - 0.5))
				}
			} catch (error) {
				console.error('Błąd podczas pobierania filmów:', error)
			}
		}

		fetchFilms()
	}, [])

	const renderSlider = () => {
		if (films.length === 0) {
			return null
		}

		return (
			<Slider {...settings} className='repertoire__items'>
				{films.map(film => (
					<RepertoireItem id={film.id} key={film.id} src={film.thumbnail} alt={film.title} title={film.title} />
				))}
			</Slider>
		)
	}

	return (
		<>
			<div className='repertoire wrapper'>
				<SectionTitle className='repertoire__title' title='W repertuarze' />
				{renderSlider()}
				{(!currentUser || !isEmployee) && (
					<p className='repertoire__link'>
						Zapoznaj się z <Link to={'/repertoire'}>repertuarem</Link>, który przygotowaliśmy dla was!
					</p>
				)}
			</div>
		</>
	)
}

export default InRepertoire
