import axios from "axios";

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET,
  Logout,
} from "./actionType";

//register a new user
export const registerUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    await axios
      .post(`https://cautious-pink-flannel-nightgown.cyclic.app/user/register`, data)
      .then((res) =>
        dispatch({ type: SIGNUP_SUCCESS, payload: res.data.message })
      );
  } catch (e) {
    dispatch({ type: SIGNUP_FAILURE, payload: e.message });
  }
};

//login a user
export const loginUser = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    await axios
      .post("https://cautious-pink-flannel-nightgown.cyclic.app/user/login", data)
      .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res.data }));
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, payload: e.message });
  }
};

//clear all success value
export const resetReduxData = () => (dispatch) => {
  dispatch({ type: RESET });
};

//logout a user
export const logoutUser = () => (dispatch) => {
  dispatch({ type: Logout });
};
