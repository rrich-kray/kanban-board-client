import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.scss";

const Nav = ({ isModalVisible, changeModalVisibility, boardData }) => {
  console.log(boardData);
  return (
    <div className={styles.nav}>
      <div className={styles.boardNameContainer}>{boardData.name}</div>
      <div className={styles.navBtnContainer}>
        {boardData.length > 0 && (
          <button
            className={styles.navBtn}
            onClick={() => changeModalVisibility(!isModalVisible)}
          >
            + Create Task
          </button>
        )}
        <button
          className={styles.navBtn}
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.replace("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
