import './SignInForm.css'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignInForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const [error, setError] = useState(null);
	const { signin } = useAuth()
	const navigate = useNavigate()

	const handleChange = event => {
		const name = event.target.id
		const value = event.target.value
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async event => {
		event.preventDefault()

		try {
			setError(null)
			await signin(formData.email, formData.password)
			navigate('/')
		} catch {
			setError('Błędny email lub hasło!');
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='form-signin'>
				<i className='fa-regular fa-user form-signin__icon'></i>
				<h3 className='form-signin__title'>Zaloguj się!</h3>
				<input type='email' id='email' placeholder='Email' className='form-signin__input' onChange={handleChange} />
				<input
					type='password'
					id='password'
					placeholder='Hasło'
					className='form-signin__input'
					onChange={handleChange}
				/>
				{/* <span className='form-signup__error'>{errors.auth}</span> */}
				{error && <span className="form-signup__error">{error}</span>}
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
