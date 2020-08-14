import { FETCH_USER, AUTH_USER, AUTH_ERROR } from "../actions/types";

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
        user: payload.user,
        token: payload.token,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
