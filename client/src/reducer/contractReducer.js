import {
  LOAD_CONTRACTS,
  LOAD_SINGLE_CONTRACT,
  LOAD_ERROR,
  PRELOAD_CONTRACT,
  CLEAR_CONTRACT_STATE,
  SET_CONTRACT,
  LOGOUT,
  CREATE_CONTRACT,
  UPDATE_CONTRACT,
  SET_ERRORS,
  DELETE_CONTRACT,
} from '../utils/actions';
import { renameProp } from '../utils/helpers';
import {
  errorNotification,
  successNotification,
} from '../components/Notification';

const contract_reducer = (state, action) => {
  const { type, payload } = action;
  let contracts;
  let singleContract;
  switch (type) {
    case LOAD_CONTRACTS:
      contracts = parseResponse(payload.data);
      return { ...state, amount: payload.amount, contracts, loading: false };
    case SET_CONTRACT:
      const { date, validity } = payload;
      return {
        ...state,
        singleContract: {
          ...payload,
          date: new Date(date),
          validity: new Date(validity),
        },
      };
    case CLEAR_CONTRACT_STATE:
    case PRELOAD_CONTRACT:
      return { ...state, singleContract: null };
    case LOAD_SINGLE_CONTRACT:
      singleContract = parseResponse(payload);
      return {
        ...state,
        singleContract,
        loading: false,
      };
    case CREATE_CONTRACT:
    case UPDATE_CONTRACT:
      successNotification();
      return {
        ...state,
        loading: true,
      };
    case DELETE_CONTRACT:
      contracts = state.contracts.filter(contract => contract.key !== payload);
      const amount = contracts.length;
      return { ...state, contracts, amount };
    case LOAD_ERROR:
      return { ...state, singleContract: null, loading: false };
    case LOGOUT:
      return { ...state, contracts: [], singleContract: null, loading: false };
    case SET_ERRORS:
      errorNotification(payload.errors);
      return { ...state };
    default:
      return { ...state };
  }
};

export default contract_reducer;

function parseResponse(payload) {
  if (payload instanceof Array) {
    return payload.map(({ _id, ...rest }) => ({
      ...rest,
      key: _id,
    }));
  } else {
    return renameProp('_id', 'key', payload);
  }
}
