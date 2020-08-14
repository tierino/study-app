import axios from "axios";
import { FETCH_USER, AUTH_USER, AUTH_ERROR } from "./types";

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/users/current_user");

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post("auth/signup", formProps); //formProps has email and password
    console.log(response.data);
    // Successful signup action, send web token in payload
    dispatch({ type: AUTH_USER, payload: response.data });
    // Store token in localStorage (persisting logged-in state)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
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

    // Successful signin action, send web token in payload
    dispatch({ type: AUTH_USER, payload: response.data });
    // Store token in localStorage (persisting logged-in state)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    // Redirects user to '/home'
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid email or password." });
  }
};
