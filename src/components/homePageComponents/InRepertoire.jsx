import './InRepertoire.css'
import Slider from 'react-slick'

import SectionTitle from '../UI/SectionTitle'
import RepertoireItem from './RepertoireItem'

import film1 from '../../assets/img/film1.jpg'
import film2 from '../../assets/img/film2.jpg'
import film3 from '../../assets/img/film3.jpg'
import film4 from '../../assets/img/film4.jpg'
import film5 from '../../assets/img/film5.jpg'

const InRepertoire = () => {
	const settings = {
		className: 'repertoire__items',
		dots: true,
		infinite: true,
		slidesToShow: 3,
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

	return (
		<>
			<div className='repertoire wrapper'>
				<SectionTitle className='repertoire__title' title='W repertuarze' />
				<Slider {...settings} className='repertoire__items'>
					<RepertoireItem src={film1} alt='Jest alt!' title='Asterix i Obelix Misja Kleopatra' />
					<RepertoireItem src={film2} alt='Jest alt!' title='Bóg nie umarł!' />
					<RepertoireItem src={film3} alt='Jest alt!' title='Obecność' />
					<RepertoireItem src={film4} alt='Jest alt!' title='Dawno temu w trawie' />
					<RepertoireItem src={film5} alt='Jest alt!' title='Tylko mnie kochaj' />
				</Slider>
			</div>
		</>
	)
}

export default InRepertoire
