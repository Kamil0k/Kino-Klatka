import './Footer.css'

import Brand from './Brand'

const date = new Date();
const year = date.getFullYear()

const Footer = () => {
	return (
		<>
			<footer className='footer'>
				<Brand />
				<p className='footer__slogan'>
					Otwórz swoją <span className='footer__slogan-bolder'>klatkę wyobraźni</span> w kinie Klatka!
				</p>
				<div className='footer__social'>
					<i className='fa-brands fa-facebook'></i>
					<i className='fa-brands fa-instagram'></i>
					<i className='fa-brands fa-twitter'></i>
					<i className='fa-brands fa-youtube'></i>
					<i className='fa-brands fa-google-plus'></i>
				</div>
                <div className="footer__bottom">
                    <p className="footer__bottom-text">Copyright &copy; {year} Kino Klatka</p>
                </div>
			</footer>
		</>
	)
}

export default Footer
