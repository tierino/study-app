import { SELECT_UNIT } from "../actions/types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_UNIT:
      return payload;
    default:
      return state;
  }
};
