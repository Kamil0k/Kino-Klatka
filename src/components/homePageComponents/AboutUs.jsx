import Map from '../../assets/img/mapka.png'

import './AboutUs.css'

const AboutUs = () => {
	return (
		<>
			<div className='aboutus wrapper'>
				<div>
					<h2 className='aboutus__title' id='aboutus'>
						O nas
					</h2>
					<p className='aboutus__description'>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla consectetur temporibus deleniti reiciendis?
						Repudiandae, fugit enim? Aperiam ex est, iste ab ipsam, corrupti totam eaque quis ut recusandae vel pariatur
						culpa eligendi dignissimos suscipit dicta et, beatae tenetur. Voluptatum sint suscipit placeat laudantium
						autem. Perspiciatis aliquam cum nisi vel. Sapiente!
					</p>
				</div>
				<img className='aboutus__map' src={Map} alt='Mapa Polski z pinezkami kin Klatka' />
			</div>
		</>
	)
}

export default AboutUs
