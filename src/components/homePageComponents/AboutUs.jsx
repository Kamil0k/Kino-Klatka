import Map from '../../assets/img/mapa.png'

import './AboutUs.css'

import SectionTitle from '../UI/SectionTitle'

const AboutUs = () => {
	return (
		<>
			<div className='aboutus wrapper'>
				<div>
					<SectionTitle title="o nas"/>
					<p className='aboutus__description'>
						Kino Klatka należy do międzynarodowego koncernu zespołu kin Film & Chill, który operuje na rynkach
						światowych od lat 80. Na ten moment koncern Film & Chill jest trzecim największym zrzeszeniem kin na całym
						świecie.
						<br />
						<br />
						Przedsiębiorstwo Film & Chill działa w 18 krajach - Polska, Wielka Brytania, Francja, Hiszpania, Portugalia,
						Bułgaria, Grecja, Włochy, Stany Zjednoczone, Kanada, Brazylia, Chile, Urugwaj, Kolumbia, Algieria, Republika
						Południowej Afryki, Indie, Australia.
						<br />
						<br />
						Kino Klatka działa w Polsce w 20 lokalizacjach. Niezależnie od tego, w której części Polski mieszkasz,
						napewno znajdziesz nasze kino w promieniu 100 kilometrów!
					</p>
				</div>
				<img className='aboutus__map' src={Map} alt='Mapa Polski z pinezkami kin Klatka' />
			</div>
		</>
	)
}

export default AboutUs
