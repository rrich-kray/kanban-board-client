import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

const routes = ({ currentUser }) => [
	{
		path: '/',
		element: currentUser ? (
			<Dashboard
				baseUrl={baseUrl}
				boardData={boardData}
				activeBoardIndex={activeBoardIndex}
				changeActiveBoardIndex={changeActiveBoardIndex}
				isModalVisible={isModalVisible}
				changeModalVisibility={changeModalVisibility}
			/>
		) : (
			<Navigate to="/login" />
		),
	},
];
