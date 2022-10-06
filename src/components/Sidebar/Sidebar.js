import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import jwt_decode from "jwt-decode";
import logo from "./icon-show-sidebar.svg";
import boardIcon from "./icon-board.svg";
import { config } from "../../utils/helpers";
import { fetchData, headers } from "../../utils/helpers";
import "./Sidebar.css";

const Sidebar = ({ changeActiveBoardIndex, boardData, baseUrl }) => {
  const [allBoards, setAllBoards] = useState();
  const [isFormActive, activateForm] = useState();
  const [formState, setFormState] = useState({
    name: "",
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
      .post(
        `${baseUrl}/kanban-board-full-stack/api/boards`,
        {
          name: formState.name,
        },
        config
      )
      .then((response) => {
        console.log(response);
        // window.location.replace("/dashboard");
      });
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="icon"></img>
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
              <img src={boardIcon} alt="notebook-icon"></img>
              {board.name}
              <DeleteIcon
                onClick={() =>
                  fetchData(
                    `${baseUrl}/kanban-board-full-stack/api/boards`,
                    "DELETE",
                    headers,
                    { board_id: board.id }
                  )
                }
              />
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
              onClick={() =>
                fetchData(
                  `${baseUrl}/kanban-board-full-stack/api/boards`,
                  "POST",
                  headers,
                  { name: formState.name }
                )
              }
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
