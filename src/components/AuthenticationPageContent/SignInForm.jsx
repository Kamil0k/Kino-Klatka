import './SignInForm.css'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const SignInForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState({})

	const handleChange = event => {
		const name = event.target.id
		const value = event.target.value
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = event => {
		event.preventDefault()
		const validationErrors = validateFormData(formData)
		setErrors(validationErrors)
		if (Object.keys(validationErrors).length === 0) {
			//logowanie do systemu
		}
	}

	const validateFormData = data => {
		const errors = {}
		if (!data.email) {
			errors.email = 'Podaj adres email!'
		} else if (!/\S+@\S+\.\S+/.test(data.email)) {
			errors.email = 'Niepoprawny adres email!'
		}
		if (!data.password) {
			errors.password = 'Podaj hasło!'
		} else if (data.password.length < 10) {
			errors.password = 'Hasło musi się składać z 10 znaków!'
		}
		return errors
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='form-signin'>
				<i className='fa-regular fa-user form-signin__icon'></i>
				<h3 className='form-signin__title'>Zaloguj się!</h3>
				<input type='email' id='email' placeholder='Email' className='form-signin__input' onChange={handleChange} />
				{errors.email && <span className='form-signup__error'>{errors.email}</span>}
				<input
					type='password'
					id='password'
					placeholder='Hasło'
					className='form-signin__input'
					onChange={handleChange}
				/>
				{errors.password && <span className='form-signup__error'>{errors.password}</span>}
				<div className='form-signin__check'>
					<input type='checkbox' id='employee-checkbox' name='employee' className='form-signin__check-input' />
					<label className='form-signin__check-label' forhtml='employee-checkbox'>
						Jestem pracownikiem
					</label>
				</div>
				<Button>Zaloguj się</Button>
				<p className='form-signin__text'>
					Nie masz jeszcze konta?
					<br />{' '}
					<Link to='/signup' className='form-signin__text-link'>
						Zarejestruj się!
					</Link>
				</p>
			</form>
		</>
	)
}

export default SignInForm
