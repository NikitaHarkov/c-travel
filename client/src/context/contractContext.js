import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import reducer from '../reducer/contractReducer';
import {
  LOAD_CONTRACTS,
  LOAD_SINGLE_CONTRACT,
  LOAD_ERROR,
  PRELOAD_CONTRACT,
  CLEAR_CONTRACT_STATE,
  SET_CONTRACT,
  CREATE_CONTRACT,
  LOGOUT,
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
    if (query === '') {
      fetchContracts();
    } else {
      axios
        .get(`/contracts`, { params: { data: query } })
        .then(res => dispatch({ type: LOAD_CONTRACTS, payload: res.data }))
        .catch(err => console.log(err));
    }

    //TODO query contracts
  };

  const setSingleContract = contract => {
    dispatch({ type: SET_CONTRACT, payload: contract });
  };

  const getSingleContract = id => {
    axios
      .get(`/contracts/${id}`)
      .then(dispatch({ type: PRELOAD_CONTRACT }))
      .then(result =>
        dispatch({ type: LOAD_SINGLE_CONTRACT, payload: result.data })
      )
      .catch(() => dispatch({ type: LOAD_ERROR }));
  };

  const createContract = form => {
    axios
      .post('/contracts', form)
      .then(res => dispatch({ type: CREATE_CONTRACT, payload: res.data }))
      .catch(err => console.log(err));
  };

  const clearContractStateByLogout = () => {
    dispatch({ type: LOGOUT });
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
        setSingleContract,
        createContract,
        clearContractStateByLogout,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  return useContext(ContractContext);
};
