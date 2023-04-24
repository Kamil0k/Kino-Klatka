import Sectiontitle from '../UI/SectionTitle'
import Chart from './Chart'
import InRepertoire from '../HomePageComponents/InRepertoire'
import './Statistics.css'


const Statistics = () => {

	return (
		<>
			<div className='statistics wrapper'>
				<Sectiontitle title='główne statystyki' />
				<div className='statistics__boxes'>
					<div className='statistics__box'>
						<p className='statistics__box-title'>Filmów</p>
						<p className='statistics__box-value'>128</p>
					</div>
					<div className='statistics__box'>
						<p className='statistics__box-title'>Kinomaniaków</p>
						<p className='statistics__box-value'>543</p>
					</div>
					<div className='statistics__box'>
						<p className='statistics__box-title'>Pracowników</p>
						<p className='statistics__box-value'>56</p>
					</div>
					<div className='statistics__box'>
						<p className='statistics__box-title'>Promocji</p>
						<p className='statistics__box-value'>6</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Statistics
