import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Task from "../task/Task";
import "./Board.css";

const Board = ({ boardData, isModalVisible, baseUrl }) => {
  console.log(baseUrl);
  return (
    <>
      <div className="board">
        <div className="todo-tasks col">
          <div className="header">
            {/* <img
              src="https://www.svgrepo.com/show/397690/red-circle.svg"
              alt="progress-icon"
            ></img> */}
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Todo</h1>
          </div>
          <ul className="tasks">
            {boardData &&
              boardData[0].tasks
                .filter((task) => task.progress === 0)
                .map((task) => <Task baseUrl={baseUrl} task={task} />)}
          </ul>
        </div>
        <div className="wip-tasks col">
          <div className="header">
            {/* <img
              src="https://www.svgrepo.com/show/398719/yellow-circle.svg"
              alt="progress-icon"
            ></img> */}
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
              Work In Progress
            </h1>
          </div>
          <ul className="tasks">
            {boardData &&
              boardData[0].tasks
                .filter((task) => task.progress === 1)
                .map((task) => <Task baseUrl={baseUrl} task={task} />)}
          </ul>
        </div>
        <div className="completed-tasks col">
          <div className="header">
            {/* <img
              src="https://www.svgrepo.com/show/396579/green-circle.svg"
              alt="progress-icon"
            ></img> */}
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
              Completed
            </h1>
          </div>
          <ul className="tasks">
            {boardData &&
              boardData[0].tasks
                .filter((task) => task.progress === 2)
                .map((task) => <Task baseUrl={baseUrl} task={task} />)}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Board;
