import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./Sidebar.css";

const Sidebar = ({ changeActiveBoardIndex, boardData, baseUrl }) => {
  const [allBoards, setAllBoards] = useState();
  const [isFormActive, activateForm] = useState();
  const [formState, setFormState] = useState({
    name: "",
    user_id: jwt_decode(localStorage.getItem("token")).data[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const createBoard = () => {
    axios
      .post(`${baseUrl}/kanban-board-full-stack/api/boards`, {
        name: formState.name,
        user_id: formState.user_id,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const deleteBoard = (boardId) => {
    axios
      .delete(`${baseUrl}/kanban-board-full-stack/api/boards`)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src="https://www.svgrepo.com/show/96059/logo.svg" alt="icon"></img>
        <span
          onClick={() =>
            document.querySelector(".boards-list").classList.toggle("show")
          }
        >
          Kanban
        </span>
      </div>
      <div className="boards-list">
        <span className="all-boards">
          All Boards {boardData && `(${boardData.length})`}
        </span>
        {boardData &&
          boardData.map((board) => (
            <div
              className="board-name-logo"
              key={board.id}
              onClick={() => changeActiveBoardIndex(board.id)}
            >
              <img
                src="https://www.svgrepo.com/show/19189/notebook.svg"
                alt="notebook-icon"
              ></img>
              {board.name}
              <DeleteIcon onClick={() => deleteBoard(board.id)} />
            </div>
          ))}
        <span
          style={{
            marginLeft: "20px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => activateForm(!isFormActive)}
        >
          + Add New Board
        </span>
        {isFormActive && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "25px",
              marginTop: "20px",
            }}
          >
            <input
              name="name"
              id="name"
              className="board-name-input"
              onChange={handleChange}
            ></input>
            <button
              style={{
                height: "35px",
                animation: "0.25s ease-out 0s 1 slide-in",
              }}
              onClick={() => createBoard()}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
