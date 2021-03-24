import { LOAD_CONTRACTS } from '../utils/actions';

const contract_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CONTRACTS:
      const tempContracts = payload.map(({ _id, validity, ...rest }) => ({
        ...rest,
        key: _id,
        validity: `${validity.startDate},${validity.endDate}`,
      }));
      return { ...state, contracts: tempContracts, loading: false };
    default:
      return { ...state };
  }
};

export default contract_reducer;
