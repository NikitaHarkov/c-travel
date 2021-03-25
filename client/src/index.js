import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './context/userContext';
import { ContractProvider } from './context/contractContext';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_REQUEST_DOMAIN;
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ContractProvider>
        <App />
      </ContractProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
