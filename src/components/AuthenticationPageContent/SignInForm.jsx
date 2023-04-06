import './SignInForm.css'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'

const SignInForm = () => {
	return (
		<>
			<form action='post' className='form-signin'>
				<i className='fa-regular fa-user form-signin__icon'></i>
				<h3 className='form-signin__title'>Zaloguj się!</h3>
				<input type='email' id='email' placeholder='Email' required className='form-signin__input'/>
				<input type='password' placeholder='Hasło' required className='form-signin__input'/>
				<div className='form-signin__check'>
					<input type='checkbox' id='employee-checkbox' name='employee' className='form-signin__check-input' />
                    <label className='form-signin__check-label' for='employee-checkbox'>
						Jestem pracownikiem
					</label>
				</div>
				<Button>Zaloguj się</Button>
				<p className='form-signin__text'>
					Nie masz jeszcze konta?
					<br /> <Link to='/dupa' className='form-signin__text-link'>Zarejestruj się!</Link>
				</p>
			</form>
		</>
	)
}

export default SignInForm
