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
  UPDATE_CONTRACT,
  SET_ERRORS,
  REMOVE_ERRORS,
  LOGOUT,
} from '../utils/actions';

const ContractContext = React.createContext();

const initialState = {
  contracts: [],
  loading: true,
  singleContract: null,
  errors: [],
};

export const ContractProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setErrors = errors => {
    dispatch({ type: SET_ERRORS, payload: errors.response.data });
    setTimeout(() => dispatch({ type: REMOVE_ERRORS }), 4000);
  };

  const fetchContracts = () => {
    axios
      .get('/contracts')
      .then(res => dispatch({ type: LOAD_CONTRACTS, payload: res.data }))
      .catch(err => {
        dispatch({ type: LOAD_ERROR });
        setErrors(err);
      });
  };

  const queryContracts = query => {
    if (query === '') {
      fetchContracts();
    } else {
      axios
        .get(`/contracts`, { params: { data: query } })
        .then(res => dispatch({ type: LOAD_CONTRACTS, payload: res.data }))
        .catch(err => setErrors(err));
    }
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
      .catch(err => {
        dispatch({ type: LOAD_ERROR });
        setErrors(err);
      });
  };

  const createContract = form => {
    axios
      .post('/contracts', form)
      .then(res => {
        dispatch({ type: CREATE_CONTRACT });
        setSingleContract(res.data);
      })
      .catch(errors => setErrors(errors));
  };

  const updateContract = form => {
    axios
      .put(`/contracts/${form.id}`, form)
      .then(res => dispatch({ type: UPDATE_CONTRACT, payload: res }))
      .catch(err => setErrors(err));
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
        updateContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  return useContext(ContractContext);
};
