import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const Login = ({ baseUrl }) => {
  const [error, setError] = useState();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/kanban-board-full-stack/api/login`, {
        email: formState.email,
        password: formState.password,
      })
      .then((response) => {
        if (!response.data) {
          setError("User does not exist");
          return;
        }
        login(response.data);
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="login flex-row justify-center align-center">
      <form
        className="login-form form flex-col justify-cenpter align-center"
        onSubmit={loginUser}
      >
        {error && (
          <div
            style={{
              width: "75%",
              padding: "5px",
              background: "red",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "Center",
            }}
          >
            {error}
          </div>
        )}
        <div className="email input">
          <label htmlFor="email">Email</label>
          <input name="email" id="email" onChange={handleChange} />
        </div>
        <div className="password input">
          <label htmlFor="password">Password</label>
          <input name="password" id="password" onChange={handleChange} />
        </div>
        <button className="login-btn" onClick={loginUser}>
          Login
        </button>
        <div
          className="flex-row justify-center align-center"
          style={{ width: "100%", color: "white", marginTop: "10px" }}
        >
          <span>
            Haven't registered yet? <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
