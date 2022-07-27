import React, { useReducer, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

// Declare initial state
// Declare initial context
// Declare reducer function
// Create state and dispatch using initial state and reducer function.
// Create login and logout functions, which uses dispatch functions to update state
// Pass user state, login and logout functions through AuthProvider as props

const initialState = {
  user: token
    ? { id: jwt_decode(token).id, email: jwt_decode(token).email }
    : null,
};

// if (localStorage.getItem('token')) {
//   const decodedToken = decode(localStorage.getItem('token'));

//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem('token');
//   } else {
//     initialState.user = decodedToken;
//   }
// }

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

function authReducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: ACTIONS.LOGIN,
      payload: { id: userData.user.id, email: userData.user.email },
    });
    window.location.replace("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: ACTIONS.LOGOUT });
    window.location.replace("/register");
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, useAuth };
