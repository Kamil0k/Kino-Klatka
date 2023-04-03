import './OurAchievements.css'

import SectionTitle from '../UI/SectionTitle'
import Achievement from './Achievement'

const OurAchievements = () => {
	return (
		<>
			<div className=' section wrapper'>
				<SectionTitle title='nasze osiągnięcia' />
                <div className="achievements">
                    <Achievement icon={<i className="fa-solid fa-hotel achievement__icon"></i>} value='20' describe='kin zlokalizowanych na terenie całego kraju'/>
                    <Achievement icon={<i className="fa-solid fa-earth-americas achievement__icon"></i>} value='18' describe='państw, w których znajdują się nasze kina'/>
                    <Achievement icon={<i className="fa-solid fa-trophy achievement__icon"></i>} value='135' describe='zdobytych nagród'/>
                    <Achievement icon={<i className="fa-solid fa-share-nodes achievement__icon"></i>} value='7 200 000' describe='fanów na mediach społaecznościowych'/>
                </div>

			</div>
		</>
	)
}

export default OurAchievements
