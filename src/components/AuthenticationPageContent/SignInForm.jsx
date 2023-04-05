import './SignInForm.css'
import Button from '../UI/Button'
import { Link } from 'react-router-dom'

const SignInForm = () => {
	return (
		<>
			<form action='post' className='form'>
				<h3 className='form__title'>Zaloguj się do twojego konta w kinie Klatka!</h3>
				<input type='text' placeholder='E-mail' />
				<input type='password' placeholder='Hasło' />
				<Button>Zaloguj się</Button>
				<p className='form__text'>
					Nie masz jeszcze konta? <Link className='form__text-link'>Zarejestruj się!</Link>
				</p>
			</form>
		</>
	)
}

export default SignInForm
