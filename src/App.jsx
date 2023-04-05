import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './pages/Root'
import HomePage from './pages/HomePage'
import PricePage from './pages/PricePage'
import SignInPage from './pages/SignInPage'

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
				element: <SignInPage/>,
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
