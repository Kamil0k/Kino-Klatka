import './AuthHeader.css'

const AuthHeader = (props) => {
	return (
		<>
			<div className='auth'>
				<div className='auth__shadow'></div>
                {props.children}
			</div>
		</>
	)
}

export default AuthHeader
