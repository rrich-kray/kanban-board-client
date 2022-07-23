import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Nav.css';

const Nav = ({ isModalVisible, changeModalVisibility }) => {
	const { logout } = useAuth();
	return (
		<div className="nav flex-row justify-end">
			<div className="nav-btn-container flex-row justify-center align-center">
				<button
					className="add-task-btn"
					onClick={() => changeModalVisibility(!isModalVisible)}
				>
					+ Create Task
				</button>
				<button id="logout-btn" onClick={() => logout()}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Nav;
