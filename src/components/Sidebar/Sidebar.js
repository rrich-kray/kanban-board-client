import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import jwt_decode from "jwt-decode";
import logo from "./logo-light.svg";
import boardIcon from "./icon-board.svg";
import { config } from "../../utils/helpers";
import { fetchData, headers } from "../../utils/helpers";
import styles from "./styles.module.scss";
import "./Sidebar.css";

const Sidebar = ({
  activeBoardIndex,
  changeActiveBoardIndex,
  boardData,
  baseUrl,
}) => {
  const [allBoards, setAllBoards] = useState();
  const [isFormActive, activateForm] = useState();
  const [isBoardsListActive, setBoardsListActive] = useState(false);
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

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="icon"></img>
      </div>
      <div class="sidebar-header-container">
        <span
          className="all-boards"
          onClick={() => setBoardsListActive(!isBoardsListActive)}
        >
          All Boards {boardData && `(${boardData.length})`}
        </span>
      </div>
      <div
        className="boards-list"
        // style={{ display: !isBoardsListActive && "none" }}
      >
        {boardData &&
          boardData.map((board) => (
            <div
              className="board-name-logo"
              key={board.id}
              style={{
                background: activeBoardIndex === board.id ? "#615ED0" : "none",
              }}
              onClick={() => changeActiveBoardIndex(board.id)}
            >
              <img src={boardIcon} alt="notebook-icon" />
              {board.name}
              <DeleteIcon
                onClick={() => {
                  fetchData(
                    `${baseUrl}/kanban-board-full-stack/api/boards`,
                    "DELETE",
                    headers,
                    { board_id: board.id }
                  ).then((response) => {
                    window.location.replace("/");
                  });
                }}
              />
            </div>
          ))}
      </div>
      <div className="add-new-board-container">
        <span onClick={() => activateForm(!isFormActive)}>+ Add New Board</span>
      </div>
      {isFormActive && (
        <div
          className="create-board-form"
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
            onClick={() => {
              fetchData(
                `${baseUrl}/kanban-board-full-stack/api/boards`,
                "POST",
                headers,
                { name: formState.name }
              ).then((response) => {
                window.location.replace("/");
              });
            }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
