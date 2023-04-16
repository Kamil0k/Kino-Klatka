import { Outlet } from 'react-router-dom'
import EmployeeNavigation from '../../components/EmployeeNavigation'

import '../../index.css'

const EmployeeRoot = () => {
	return (
		<>
		<EmployeeNavigation/>
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default EmployeeRoot
