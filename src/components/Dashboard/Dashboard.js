import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Sidebar from '../Sidebar/Sidebar';
import Nav from '../Nav/Nav';
import Board from '../Board/Board';
import './Dashboard.css';

const Dashboard = ({
	baseUrl,
	boardData,
	activeBoardIndex,
	changeActiveBoardIndex,
	isModalVisible,
	changeModalVisibility,
}) => {
	return (
		<div className="dashboard">
			{isModalVisible && (
				<Modal
					baseUrl={baseUrl}
					boardData={boardData}
					activeBoardIndex={activeBoardIndex}
					changeActiveBoardIndex={changeActiveBoardIndex}
				/>
			)}
			<div className="sidebar-container">
				<Sidebar
					baseUrl={baseUrl}
					boardData={boardData}
					changeActiveBoardIndex={changeActiveBoardIndex}
				/>
			</div>
			<div className="board-container">
				<Nav
					activeBoardIndex={activeBoardIndex}
					isModalVisible={isModalVisible}
					changeModalVisibility={changeModalVisibility}
				/>
				<Board
					baseUrl={baseUrl}
					boardData={boardData.filter((board) => board.id === activeBoardIndex)}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
