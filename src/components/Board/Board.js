import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Task from "../task/Task";
import styles from "./styles.module.scss";

const Board = ({ boardData, baseUrl }) => {
  // Can refactor these into a board column component
  return (
    <>
      <div className={styles.board}>
        <div className={styles.col}>
          <div className={styles.header}>
            {/* <img
              src="https://www.svgrepo.com/show/397690/red-circle.svg"
              alt="progress-icon"
            ></img> */}
            <span
              className={styles.headerLight}
              style={{ background: "#63C6DC" }}
            ></span>
            Todo
          </div>
          <ul className={styles.tasks}>
            {boardData.length > 0 &&
              boardData[0].tasks
                .filter((task) => task.progress === 0)
                .map((task) => <Task baseUrl={baseUrl} task={task} />)}
          </ul>
        </div>
        <div className={styles.col}>
          <div className={styles.header}>
            {/* <img
              src="https://www.svgrepo.com/show/398719/yellow-circle.svg"
              alt="progress-icon"
            ></img> */}
            <span
              className={styles.headerLight}
              style={{ background: "#8973FF" }}
            ></span>
            Work In Progress
          </div>
          <ul className={styles.tasks}>
            {boardData.length > 0 &&
              boardData[0].tasks
                .filter((task) => task.progress === 1)
                .map((task) => <Task baseUrl={baseUrl} task={task} />)}
          </ul>
        </div>
        <div className={styles.col}>
          <div className={styles.header}>
            {/* <img
              src="https://www.svgrepo.com/show/396579/green-circle.svg"
              alt="progress-icon"
            ></img> */}
            <span
              className={styles.headerLight}
              style={{ background: "#6CE8B4" }}
            ></span>
            Completed
          </div>
          <ul className={styles.tasks}>
            {boardData.length > 0 &&
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
