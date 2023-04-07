import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/Root'
import HomePage from './pages/HomePage'
import PricePage from './pages/PricePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import AuthProvider from './contexts/AuthContext'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'prices',
				element: <PricePage />,
			},
			{
				path: 'signin',
				element: <SignInPage />,
			},
			{
				path: 'signup',
				element: <SignUpPage />,
			},
		],
	},
])

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}

export default App
