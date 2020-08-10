import { FETCH_USER } from "../actions/types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER:
      return {
        ...state,
        user: payload || false,
      };
    default:
      return state;
  }
};
