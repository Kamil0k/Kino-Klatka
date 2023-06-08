import { useEffect, useState } from 'react'
import { database } from '../../firebase'

import PromotionItem from './PromotionItem'


const ListOfPromotion = () => {
	const [promotions, setPromotions] = useState([])

	useEffect(() => {
		const promotionsRef = database.ref('promotions')
		promotionsRef.on('value', snapshot => {
			const promotionsData = snapshot.val()
			const newPromotions = []

			for (let promotionId in promotionsData) {
				newPromotions.push({
					id: promotionId,
					...promotionsData[promotionId],
				})
			}

			setPromotions(newPromotions)
		})
	}, [])

	const handleDelete = promotionId => {
		const promotionRef = database.ref(`promotions/${promotionId}`)
		promotionRef.remove()
	}

	return (
		<div className='list-of-promotion'>
			{promotions.map((promotion, index) => (
				<PromotionItem
					key={promotion.id}
					title={promotion.title}
					description={promotion.description}
					imageUrl={promotion.heroImage}
					isRight={index % 2 === 0}
					onDelete={() => handleDelete(promotion.id)}
				/>
			))}
		</div>
	)
}

export default ListOfPromotion
