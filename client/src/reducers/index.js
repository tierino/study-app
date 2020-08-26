import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import unitReducer from "./unitReducer";
import assessmentsReducer from "./assessmentsReducer";

export default combineReducers({
  auth: authReducer,
  selectedUnit: unitReducer,
  unitAssessments: assessmentsReducer,
  form: formReducer,
});
