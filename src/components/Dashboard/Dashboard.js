import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import Sidebar from "../Sidebar/Sidebar";
import Nav from "../Nav/Nav";
import Board from "../Board/Board";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Dashboard.css";

const Dashboard = ({
  baseUrl,
  activeBoardIndex,
  changeActiveBoardIndex,
  isModalVisible,
  changeModalVisibility,
}) => {
  const [boardData, setBoardData] = useState();
  console.log(boardData);
  console.log(activeBoardIndex);

  useEffect(() => {
    const token = jwt_decode(localStorage.getItem("token"));
    if (token) {
      const userId = token.data[0];
      axios
        .get(`${baseUrl}/kanban-board-full-stack/api/boards/${userId}`)
        .then((boardData) => {
          setBoardData(boardData.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="dashboard">
      {boardData && (
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
      )}
    </div>
  );
};

export default Dashboard;