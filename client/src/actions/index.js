import axios from "axios";
import { FETCH_USER, AUTH_USER, AUTH_ERROR } from "./types";

export const fetchUser = () => async (dispatch) => {
  console.log("fetching user...");
  const response = await axios.get("/account/user");
  console.log("response: ", response);

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

export const signout = () => {
  localStorage.removeItem("user");

  return {
    type: AUTH_USER,
    payload: "",
  };
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
