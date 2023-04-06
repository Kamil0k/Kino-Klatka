import { useState } from 'react'
import './SignUpForm.css'
import Button from '../UI/Button'

const SignUpForm = () => {

    const [isEmployee, setIsEmployee] = useState(false)

	const employeeHandler = () => {
        setIsEmployee(!isEmployee)
	}

	return (
		<>
			<form action='post' className='form-signup'>
				<i className='fa-regular fa-user form-signup__icon'></i>
				<h3 className='form-signup__title'>Zarejestruj się!</h3>
				<input type='text' id='name' placeholder='Imię' required className='form-signup__input' />
				<input type='text' id='surname' placeholder='Nazwisko' required className='form-signup__input' />
                {isEmployee && <input type='text' id='idOfEmployee' placeholder='ID pracownika' required className='form-signup__input' />}
				<input type='email' id='email' placeholder='Email' required className='form-signup__input' />
				<input type='password' placeholder='Hasło' required className='form-signup__input' />
				<input type='password' placeholder='Powtórz hasło' required className='form-signup__input' />
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
				<Button>Zarejestruj się</Button>
			</form>
		</>
	)
}

export default SignUpForm
