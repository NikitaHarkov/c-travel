import React, { useContext, useReducer } from 'react';
import reducer from '../reducer/userReducer';
import axios from 'axios';
import setAuthToken from '../utils/auth-headers';
import { LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from '../utils/actions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
};

export const UserContext = React.createContext();

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadUser = () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    //TODO Get request to check JWT token for validity
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
      .catch(err => dispatch({ type: LOGIN_FAIL }));
  };

  return (
    <UserContext.Provider value={{ ...state, login, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
