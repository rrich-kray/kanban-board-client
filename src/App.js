import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import Board from './components/Board/Board';
import Sidebar from './components/Sidebar/Sidebar';
import Nav from './components/Nav/Nav';
import Modal from './components/Modal/Modal';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { Navigate } from 'react-router-dom';
import { useAuth, AuthContext } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { decode } from 'jwt-decode';

function App() {
  const [boardData, setBoardData] = useState();
  const [activeBoardIndex, changeActiveBoardIndex] = useState(1);
  const [isModalVisible, changeModalVisibility] = useState(false);

  const { state } = useAuth();
  console.log(state.user);
  console.log(boardData);

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://kanban-board-full-stack.herokuapp.com'
      : 'http://localhost:3001';

  useEffect(() => {
    fetch(`${baseUrl}/kanban-board-full-stack/api/boards`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setBoardData(data);
        console.log(boardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {boardData && (
        <div className="app">
          <Router>
            <Routes>
              <Route
                exact
                path="/dashboard"
                element={
                  state.user ? (
                    <Dashboard
                      baseUrl={baseUrl}
                      boardData={boardData}
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
                element={!state.user ? <Login /> : <Navigate to="/dashboard" />}
                baseUrl={baseUrl}
              />
              <Route
                exact
                path="/register"
                element={
                  !state.user ? <Register /> : <Navigate to="/dashboard" />
                }
                baseUrl={baseUrl}
              />
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
