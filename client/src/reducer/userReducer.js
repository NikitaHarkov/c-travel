import {
  LOGIN_SUCCESS,
  LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
} from '../utils/actions';

const user_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOADING:
      return { ...state, loading: true };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return { ...state };
  }
};

export default user_reducer;
