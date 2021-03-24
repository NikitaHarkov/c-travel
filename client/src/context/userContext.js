import React, { useContext, useReducer } from 'react';
import reducer from '../reducer/userReducer';
import axios from 'axios';
import setAuthToken from '../utils/auth-headers';
import {
  AUTH_ERROR,
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
} from '../utils/actions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
};

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUser = () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    axios
      .get('/auth')
      .then(res => {
        dispatch({ type: LOADING });
        dispatch({ type: USER_LOADED, payload: res.data });
      })
      .catch(() => dispatch({ type: AUTH_ERROR }));
  };

  const login = (username, password) => {
    const body = { username, password };
    dispatch({ type: LOADING });
    axios
      .post('/login', body, config)
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        loadUser();
      })
      .catch(() => dispatch({ type: LOGIN_FAIL }));
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <UserContext.Provider value={{ ...state, login, loadUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
