import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import unitReducer from "./unitReducer";

export default combineReducers({
  auth: authReducer,
  selectedUnit: unitReducer,
  form: formReducer,
});
