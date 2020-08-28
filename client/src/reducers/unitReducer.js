import { FETCH_UNIT, CLEAR_UNIT } from "../actions/types";

const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_UNIT:
      return payload;
    case CLEAR_UNIT:
      return payload;
    default:
      return state;
  }
};
