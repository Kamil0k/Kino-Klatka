import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import HamburgerNavigation from '../components/MainNavigation'

function RootLayout() {
	return (
		<>
			<HamburgerNavigation />
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default RootLayout
