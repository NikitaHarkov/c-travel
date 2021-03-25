import {
  LOAD_CONTRACTS,
  LOAD_SINGLE_CONTRACT,
  LOAD_ERROR,
  PRELOAD_CONTRACT,
  CLEAR_CONTRACT_STATE,
} from '../utils/actions';
import { renameProp } from '../utils/helpers';

const contract_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CONTRACTS:
      const contracts = parseResponse(payload);
      return { ...state, contracts, loading: false };
    case CLEAR_CONTRACT_STATE:
    case PRELOAD_CONTRACT:
      return { ...state, singleContract: null };
    case LOAD_SINGLE_CONTRACT:
      const singleContract = parseResponse(payload);
      return { ...state, singleContract, loading: false };
    case LOAD_ERROR:
      return { ...state, singleContract: null, loading: false };
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
