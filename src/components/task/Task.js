import React, { useState, useEffect } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Task.css";

const Task = ({ task, baseUrl }) => {
  console.log(baseUrl);
  const deleteTask = (taskId) => {
    // e.preventDefault();
    fetch(`${baseUrl}/kanban-board-full-stack/api/tasks`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: taskId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update progress attribute of task
  const changeProgress = (task, direction) => {
    // more than two arguments, more than a single purpose. Need to simplify
    // e.preventDefault();
    let newTaskProgress;
    if (direction === "right") {
      if (task.progress === 2) {
        newTaskProgress = 0;
      } else {
        newTaskProgress = task.progress += 1;
      }
    } else if (direction === "left") {
      if (task.progress === 0) {
        newTaskProgress = 2;
      } else {
        newTaskProgress = task.progress -= 1;
      }
    }
    fetch(`${baseUrl}/kanban-board-full-stack/api/tasks`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task_id: task.id, progress: newTaskProgress }),
    });
    window.location.replace("/");
  };

  return (
    <li className="task" key={task.id}>
      <div className="task-name">{task.title}</div>
      <div
        className="delete-icon"
        onClick={() => deleteTask(task.id)}
        style={{
          height: "100%",
          cursor: "pointer",
        }}
      >
        <DeleteIcon />
      </div>
      <div
        className="arrows"
        style={{
          height: "100%",
          display: "flex",
        }}
      >
        <div
          className="left-arrow"
          style={{ cursor: "pointer" }}
          onClick={() => changeProgress(task, "left")}
        >
          <ArrowLeftIcon />
        </div>
        <div
          className="right-arrow"
          style={{ cursor: "pointer" }}
          onClick={() => changeProgress(task, "right")}
        >
          <ArrowRightIcon />
        </div>
      </div>
    </li>
  );
};

export default Task;
