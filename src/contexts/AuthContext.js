import React, { useReducer, createContext, useContext } from 'react';
import decode from 'jwt-decode';

// Declare initial state
// Declare initial context
// Declare reducer function
// Create state and dispatch using initial state and reducer function.
// Create login and logout functions, which uses dispatch functions to update state
// Pass user state, login and logout functions through AuthProvider as props

const initialState = {
  user: null,
};

if (localStorage.getItem('token')) {
  const decodedToken = decode(localStorage.getItem('token'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });

    const logout = () => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      window.location.replace('/');
    };

    return (
      <AuthContext.Provider value={{ user: state.user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
}

export { AuthContext, AuthProvider, useAuth };
