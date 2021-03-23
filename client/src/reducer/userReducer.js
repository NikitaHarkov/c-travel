import { LOGIN_SUCCESS, LOADING } from '../utils/actions';

const user_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default user_reducer;
