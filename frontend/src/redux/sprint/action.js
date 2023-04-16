import {
  sprintCreateLoading,
  sprintCreateSuccess,
  sprintCreateError,
  sprintGetLoading,
  sprintGetSuccess,
  sprintGetError,
  sprintDeleteLoading,
  sprintDeleteSuccess,
  sprintDeleteError,
} from "./actionType";

import axios from "axios";

//Create a new Sprint
export const createSprint = (data) => async (dispatch) => {
  dispatch({ type: sprintCreateLoading });
  try {
    await axios
      .post(
        "https://cautious-pink-flannel-nightgown.cyclic.app/sprint/create",
        data
      )
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
    await axios
      .get(
        `https://cautious-pink-flannel-nightgown.cyclic.app/sprint/${userId}`
      )
      .then((res) => {
        dispatch({ type: sprintGetSuccess, payload: res.data });
      });
  } catch (e) {
    dispatch({ type: sprintGetError, payload: e.message });
  }
};
//delte sprintName Data using sprintName, creatorId
export const deleteSprintData = (sprintName, creatorId) => async (dispatch) => {
  dispatch({ type: sprintDeleteLoading });
  try {
    await axios
      .delete(
        `https://cautious-pink-flannel-nightgown.cyclic.app/sprint/delete?sprintName=${sprintName}&creatorId=${creatorId}`
      )
      .then((res) => {
        dispatch({ type: sprintDeleteSuccess, payload: res.data });
      });
  } catch (e) {
    dispatch({ type: sprintDeleteError, payload: e });
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
