import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { getAuth, updateProfile } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}
export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(false)

	function signup(name, surname, email, password, isEmployee, idOfEmployee) {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(userCredential => {
				const userId = userCredential.uid
				db.collection('users').doc(userId).set({
					name: name,
					surname: surname,
					isEmployee: isEmployee,
					idOfEmployee: idOfEmployee,
				})
				return userCredential.user.updateProfile({
					displayName: `${name} ${surname}`,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}

	function signin(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function signout() {
		return auth.signOut()
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setLoading(false)
			setCurrentUser(user)
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		signin,
		signup,
		signout,
	}

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
