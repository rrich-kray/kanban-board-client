import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../utils/helpers";
import { fetchData, headers } from "../../utils/helpers";
import "./Modal.css";

const Modal = ({
  boardData,
  baseUrl,
  activeBoardIndex,
  changeActiveBoardIndex,
}) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    progress: "0",
    board_id: boardData[0].id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="modal">
      <form className="add-post-form">
        <input
          name="title"
          id="title"
          placeholder="Task name"
          onChange={handleChange}
        ></input>
        <input
          name="description"
          id="description"
          placeholder="Task description"
          onChange={handleChange}
        ></input>
        <select
          name="board_id"
          id="board_id"
          style={{ marginBottom: "10px" }}
          onChange={handleChange}
        >
          {boardData &&
            boardData.map((board, i) => (
              <option name={board.id} value={board.id} key={i}>
                {board.name}
              </option>
            ))}
        </select>
        <select
          name="progress"
          id="progress"
          style={{ marginBottom: "10px" }}
          onChange={handleChange}
        >
          <option name="0" value="0">
            To Do
          </option>
          <option name="1" value="1">
            Work-In-Process
          </option>
          <option name="2" value="2">
            Completed
          </option>
        </select>
      </form>
      <button
        className="add-post-btn"
        onClick={() => {
          fetchData(
            `${baseUrl}/kanban-board-full-stack/api/tasks`,
            "POST",
            headers,
            {
              title: formState.title,
              description: formState.description,
              progress: formState.progress,
              board_id: formState.board_id,
            }
          ).then((response) => {
            window.location.replace("/");
          });
        }}
      >
        Submit Task
      </button>
    </div>
  );
};

export default Modal;
