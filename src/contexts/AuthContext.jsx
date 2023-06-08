import React, { useContext, useState, useEffect } from 'react'
import { firebase, auth, db } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(false)
	const [isEmployee, setIsEmployee] = useState(false)

	function signup(name, surname, email, password, isEmployee) {
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(userCredential => {
				db.collection('users').doc(email).set({
					name: name,
					surname: surname,
					isEmployee: isEmployee,
				})
				return userCredential.user.updateProfile({
					displayName: `${name} ${surname}`,
				})
			})
			.catch(error => {
				console.error(error)
			})
	}

	function changePassword(oldPassword, newPassword) {
		const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, oldPassword)

		return currentUser
			.reauthenticateWithCredential(credential)
			.then(() => {
				return currentUser.updatePassword(newPassword)
			})
			.catch(error => {
				throw new Error('Błąd podczas zmiany hasła. Sprawdź poprawność starego hasła.')
			})
	}

	function signin(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function signout() {
		return auth.signOut()
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async user => {
			setLoading(false)
			setCurrentUser(user)
			if (user) {
				const userRef = db.collection('users').doc(user.email)
				const doc = await userRef.get()
				if (doc.exists) {
					const data = doc.data()
					setIsEmployee(data.isEmployee)
				}
			}
		})

		return unsubscribe
	}, [])

	const value = {
		currentUser,
		isEmployee,
		signin,
		signup,
		signout,
		changePassword,
	}

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
