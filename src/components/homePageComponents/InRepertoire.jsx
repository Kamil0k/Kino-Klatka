import './InRepertoire.css'

import SectionTitle from '../UI/SectionTitle'
import RepertoireItem from './RepertoireItem'

import film from '../../assets/img/film2.jpg'

const InRepertoire = () => {
	return (
		<>
			<div className='repertoire wrapper'>
				<SectionTitle title='W repertuarze' />
				<div className='repertoire__items'>
					<RepertoireItem src={film} alt='Jest alt!' />
				</div>
			</div>
		</>
	)
}

export default InRepertoire
