import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './Pages/Root'
import HomePage from './Pages/HomePage'
import PricePage from './Pages/PricePage'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import EmployeeHomePage from './Pages/EmployeePages/EmployeeHomePage'
import FilmsPage from './Pages/EmployeePages/FilmsPage'
import FilmDetailsPage from './Pages/EmployeePages/FilmDetailsPage'
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
			{
				path: 'employee',
				element: <EmployeeHomePage />,
			},
			{
				path: 'films',
				element: <FilmsPage />,
			},
			{
				path: 'films/:id',
				element: <FilmDetailsPage />,
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
