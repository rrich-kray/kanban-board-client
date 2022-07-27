import React, { useState, useEffect } from "react";
import axios from "axios";
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
    board_id: boardData[0].id, // this board id must not exist
  });

  console.log(formState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleTaskSubmit = (e) => {
    axios
      .post(`${baseUrl}/kanban-board-full-stack/api/tasks`, {
        title: formState.title,
        description: formState.description,
        progress: formState.progress,
        board_id: formState.board_id,
      })
      .then((response) => {
        console.log(response);
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.error("Error", err);
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
            boardData.map((board) => (
              <option name={board.id} value={board.id}>
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
      <button onClick={handleTaskSubmit}>Submit Task</button>
    </div>
  );
};

export default Modal;
