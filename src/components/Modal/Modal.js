import React, { useState, useEffect } from "react";
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
    board_id: "1",
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
    fetch(`${baseUrl}/kanban-board-full-stack/api/tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
        }
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
        <button onClick={handleTaskSubmit}>Submit Task</button>
      </form>
    </div>
  );
};

export default Modal;
