import axios from "axios";
import {
  FETCH_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_UNIT,
  FETCH_ASSESSMENTS,
  CLEAR_UNIT,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/account/user");

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signup", formProps); //formProps has email and password
    dispatch({ type: AUTH_USER, payload: response.data });
    // Redirects user to '/home'
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use." });
  }
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/signin", formProps); //formProps has email and password
    console.log(response.data);
    dispatch({ type: AUTH_USER, payload: response.data });
    // Redirects user to '/home'
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid email or password." });
  }
};

// Fetch the unit with the passed-in name, and put it in state as selectedUnit.
export const fetchUnit = (unitName) => async (dispatch) => {
  const response = await axios.get("/units/find", {
    params: { name: unitName },
  });

  dispatch({
    type: FETCH_UNIT,
    payload: response.data,
  });
};

// Fetch the select unit's assessments.
export const fetchAssessments = (unitName) => async (dispatch) => {
  const response = await axios.get("/units/get_assessments", {
    params: { unit: unitName },
  });

  dispatch({
    type: FETCH_ASSESSMENTS,
    payload: response.data,
  });
};

// Clear the selected unit from state
export const clearUnit = () => {
  return {
    type: CLEAR_UNIT,
    payload: null,
  };
};
