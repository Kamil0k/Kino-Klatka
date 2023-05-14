import SectionTitle from '../components/UI/SectionTitle'
import ListsOfPromotions from '../components/Promotions/ListsOfPromotion'

const PromotionsPage = () => {
	return (
		<div className='wrapper'>
			<SectionTitle title='Promocje' />
			<ListsOfPromotions />
		</div>
	)
}

export default PromotionsPage
