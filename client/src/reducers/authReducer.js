import {
  FETCH_USER,
  AUTH_USER,
  SIGNUP_ERROR,
  SIGNIN_ERROR,
} from "../actions/types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        user: payload || false,
      };
    case AUTH_USER:
      return {
        ...state,
        user: payload,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupError: payload,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        signinError: payload,
      };
    default:
      return state;
  }
};
