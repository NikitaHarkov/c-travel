import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import reducer from '../reducer/contractReducer';
import {
  LOAD_CONTRACTS,
  LOAD_SINGLE_CONTRACT,
  LOAD_ERROR,
  PRELOAD_CONTRACT,
  CLEAR_CONTRACT_STATE,
} from '../utils/actions';

const ContractContext = React.createContext();

const initialState = {
  contracts: [],
  loading: true,
  singleContract: null,
};

export const ContractProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchContracts = () => {
    axios
      .get('/contracts')
      .then(res => dispatch({ type: LOAD_CONTRACTS, payload: res.data }))
      .catch(() => dispatch({ type: LOAD_ERROR }));
  };

  const queryContracts = query => {
    if (query.isEmpty()) {
      fetchContracts();
    }

    //TODO query contracts
  };

  const getSingleContract = id => {
    axios
      .get(`/contracts/${id}`)
      .then(result => {
        dispatch({ type: PRELOAD_CONTRACT });
        dispatch({ type: LOAD_SINGLE_CONTRACT, payload: result.data });
      })
      .catch(() => dispatch({ type: LOAD_ERROR }));
  };

  const clearContractState = () => {
    dispatch({ type: CLEAR_CONTRACT_STATE });
  };

  return (
    <ContractContext.Provider
      value={{
        ...state,
        fetchContracts,
        queryContracts,
        getSingleContract,
        clearContractState,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  return useContext(ContractContext);
};
