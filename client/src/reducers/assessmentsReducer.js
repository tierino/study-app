import { FETCH_ASSESSMENTS } from "../actions/types";

const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ASSESSMENTS:
      return payload;
    default:
      return state;
  }
};
