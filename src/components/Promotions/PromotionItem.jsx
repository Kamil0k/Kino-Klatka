import { useState } from 'react'

import { useAuth } from '../../contexts/AuthContext'
import Button from '../UI/Button'

import './PromotionItem.css'

const PromotionItem = props => {
	const { currentUser, isEmployee } = useAuth()
	const [showConfirm, setShowConfirm] = useState(false)

	const handleDeleteConfirm = () => {
		setShowConfirm(true)
	}

	const handleConfirmDelete = () => {
		setShowConfirm(false)
		props.onDelete()
	}

	const handleCancelDelete = () => {
		setShowConfirm(false)
	}

	return (
		<div className='promotion-item'>
			<img src={props.imageUrl} alt={props.title} className='promotion-item__img' />
			<div
				className={
					props.isRight ? 'promotion-item__content' : 'promotion-item__content promotion-item__content--right'
				}>
				<p className='promotion-item__content-title'>{props.title}</p>
				<p className='promotion-item__content-description'>{props.description}</p>
				<div className='promotion-item__content-information'>
					<i className='fa-solid fa-info'></i>
					<p className='promotion-item__content-information-text'>Dowiedz się więcej na miejscu...</p>
				</div>
				{currentUser && isEmployee && (
					<>
						{!showConfirm && (
							<Button className='button-delete' onClick={handleDeleteConfirm}>
								Usuń
							</Button>
						)}
						{showConfirm && (
							<div className='promotion-item__content-confirm'>
								<p className='promotion-item__content-confirm-text'>Czy na pewno chcesz usunąć ten element?</p>
								<div
									className={
										props.isRight
											? 'promotion-item__content-confirm-buttons'
											: 'promotion-item__content-confirm-buttons promotion-item__content-confirm-buttons--right'
									}>
									<Button className='button-delete' onClick={handleConfirmDelete}>
										Tak
									</Button>
									<Button className='button-delete' onClick={handleCancelDelete}>
										Nie
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
			<div className='promotion-item__shadow'></div>
		</div>
	)
}

export default PromotionItem
