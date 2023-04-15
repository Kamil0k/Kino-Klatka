import { useState } from 'react'
import './SignUpForm.css'
import Button from '../UI/Button'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import 'firebase/auth'

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		idOfEmployee: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const { signup, currentUser } = useAuth()

	const [errors, setErrors] = useState({})
	const [errorMessage, setErrorMessage] = useState(null)
	const [loading, setLoading] = useState(false)

	const [isEmployee, setIsEmployee] = useState(false)
	const navigate = useNavigate()

	const employeeHandler = () => {
		setIsEmployee(!isEmployee)
	}

	const handleChange = event => {
		const name = event.target.id
		const value = event.target.value
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async event => {
		event.preventDefault()
		const validationErrors = validateFormData(formData)
		setErrors(validationErrors)
		if (Object.keys(validationErrors).length === 0) {
			try {
				setLoading(true)
				await signup(
					formData.name,
					formData.surname,
					formData.email,
					formData.password,
					isEmployee,
					isEmployee ? formData.idOfEmployee : null
				)

				setErrorMessage(null)
				navigate('/')
			} catch (error) {
				setErrorMessage(error.message)
			}
			setLoading(false)
		}
	}

	const validateFormData = data => {
		const errors = {}
		if (formData.name.length === 0) {
			errors.name = 'Podaj imię!'
		}
		if (!data.surname) {
			errors.surname = 'Podaj nazwisko!'
		}
		if (isEmployee) {
			if (!data.idOfEmployee) {
				errors.idOfEmployee = 'Podaj identfikator!'
			} else if (data.idOfEmployee.length !== 12) {
				errors.idOfEmployee = 'Identyfikator musi posiadać 12 znaków!'
			} else if (parseInt(data.idOfEmployee.charAt(data.idOfEmployee.length - 1)) % 5 !== 0) {
				errors.idOfEmployee = 'Niepoprawny identyfikator!'
			}
		}
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
		if (!data.confirmPassword) {
			errors.confirmPassword = 'Powtórz hasło!'
		} else if (data.password !== data.confirmPassword) {
			errors.confirmPassword = 'Hasła nie pasują do siebie!'
		}
		return errors
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='form-signup'>
				<i className='fa-regular fa-user form-signup__icon'></i>
				<h3 className='form-signup__title'>Zarejestruj się!</h3>
				<input type='text' id='name' placeholder='Imię' className='form-signup__input' onChange={handleChange} />
				{errors.name && <span className='form-signup__error'>{errors.name}</span>}
				<input type='text' id='surname' placeholder='Nazwisko' className='form-signup__input' onChange={handleChange} />
				{errors.surname && <span className='form-signup__error'>{errors.surname}</span>}
				{isEmployee && (
					<input
						type='text'
						id='idOfEmployee'
						placeholder='ID pracownika'
						className='form-signup__input'
						onChange={handleChange}
					/>
				)}
				{errors.idOfEmployee && isEmployee && <span className='form-signup__error'>{errors.idOfEmployee}</span>}
				<input type='email' id='email' placeholder='Email' className='form-signup__input' onChange={handleChange} />
				{errors.email && <span className='form-signup__error'>{errors.email}</span>}
				<input
					type='password'
					id='password'
					placeholder='Hasło'
					className='form-signup__input'
					onChange={handleChange}
				/>
				{errors.password && <span className='form-signup__error'>{errors.password}</span>}
				<input
					type='password'
					id='confirmPassword'
					placeholder='Powtórz hasło'
					className='form-signup__input'
					onChange={handleChange}
				/>
				{errors.confirmPassword && <span className='form-signup__error'>{errors.confirmPassword}</span>}
				<div className='form-signup__check'>
					<input
						type='checkbox'
						id='employee-checkbox'
						name='employee'
						className='form-signup__check-input'
						onChange={employeeHandler}
					/>
					<label className='form-signup__check-label' forhtml='employee-checkbox'>
						Jestem pracownikiem
					</label>
				</div>
				<Button>{loading ? 'Wysyłanie...' : 'Zarejestruj się'}</Button>
			</form>
		</>
	)
}

export default SignUpForm
