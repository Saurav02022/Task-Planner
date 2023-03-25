import {
  sprintCreateLoading,
  sprintCreateSuccess,
  sprintCreateError,
  sprintGetLoading,
  sprintGetSuccess,
  sprintGetError,
} from "./actionType";

import axios from "axios";

//Create a new Sprint
export const createSprint = (data) => async (dispatch) => {
  dispatch({ type: sprintCreateLoading });
  try {
    await axios
      .post("https://cautious-pink-flannel-nightgown.cyclic.app/sprint/create", data)
      .then((res) => {
        dispatch({ type: sprintCreateSuccess, payload: res.data });
      });
  } catch (e) {
    dispatch({ type: sprintCreateError, payload: e.message });
  }
};

//find sprintName Data using userId
export const getSprintData = (userId) => async (dispatch) => {
  dispatch({ type: sprintGetLoading });
  try {
    await axios.get(`https://cautious-pink-flannel-nightgown.cyclic.app/sprint/${userId}`).then((res) => {
      dispatch({ type: sprintGetSuccess, payload: res.data });
    });
  } catch (e) {
    dispatch({ type: sprintGetError, payload: e.message });
  }
};

//to reset all success value which were store in redux i.e:--   createSuccess: "", deleteSuccess: "",
export const ResetAllSucceess = () => (dispatch) => {
  try {
    dispatch({ type: "Reset" });
  } catch (e) {
    console.log(e.message);
  }
};
