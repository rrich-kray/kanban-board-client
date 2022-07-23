import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ location }) => {
	const { currentUser } = useAuth();
	const token = JSON.parse(localStorage.getItem('sid'));
	console.log(token);
	return token ? <Outlet /> : <Navigate to={location} />;
};

export default PrivateRoute;
