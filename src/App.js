import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import Board from "./components/Board/Board";
import Sidebar from "./components/Sidebar/Sidebar";
import Nav from "./components/Nav/Nav";
import Modal from "./components/Modal/Modal";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Navigate } from "react-router-dom";
import { useAuth, AuthContext } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

function App() {
  const [activeBoardIndex, changeActiveBoardIndex] = useState(1);
  const [isModalVisible, changeModalVisibility] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://kanban-server-rrich.herokuapp.com"
      : "http://localhost:3001";

  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route
              exact
              path="/dashboard"
              element={
                localStorage.getItem("token") ? (
                  <Dashboard
                    baseUrl={baseUrl}
                    activeBoardIndex={activeBoardIndex}
                    changeActiveBoardIndex={changeActiveBoardIndex}
                    isModalVisible={isModalVisible}
                    changeModalVisibility={changeModalVisibility}
                  />
                ) : (
                  <Navigate to="/register" />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={
                !localStorage.getItem("token") ? (
                  <Login baseUrl={baseUrl} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                !localStorage.getItem("token") ? (
                  <Register baseUrl={baseUrl} />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;