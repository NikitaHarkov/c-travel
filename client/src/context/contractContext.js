import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import reducer from '../reducer/contractReducer';
import { LOAD_CONTRACTS } from '../utils/actions';

const ContractContext = React.createContext();

const initialState = {
  contracts: [],
  loading: true,
};

export const ContractProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContracts = () => {
    axios
      .get('/contracts')
      .then(res => dispatch({ type: LOAD_CONTRACTS, payload: res.data }))
      .catch(err => console.log(err));
  };

  return (
    <ContractContext.Provider value={{ ...state, fetchContracts }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  return useContext(ContractContext);
};
