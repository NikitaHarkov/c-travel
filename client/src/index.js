import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './context/userContext';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_REQUEST_DOMAIN;

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
