import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import Board from "../Board/Board";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Dashboard.css";

const Dashboard = ({ baseUrl, isModalVisible, changeModalVisibility }) => {
  const [boardData, setBoardData] = useState([]);
  const [activeBoardIndex, changeActiveBoardIndex] = useState(1);

  console.log(boardData);

  let config = {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
      }`,
    },
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      const userId = user.id;
      console.log(userId);
      axios
        .get(`${baseUrl}/kanban-board-full-stack/api/boards/${userId}`, config)
        .then((boardData) => {
          console.log(boardData);
          setBoardData(boardData.data);
          changeActiveBoardIndex(boardData.data[0].id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="dashboard">
      <>
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
            boardData={boardData}
            activeBoardIndex={activeBoardIndex}
            isModalVisible={isModalVisible}
            changeModalVisibility={changeModalVisibility}
          />
          <Board
            baseUrl={baseUrl}
            boardData={boardData.filter(
              (board) => board.id === activeBoardIndex
            )}
          />
        </div>
      </>
    </div>
  );
};

export default Dashboard;
