import {
  taskCreateLoading,
  taskCreateSuccess,
  taskCreateError,
  taskGetLoading,
  taskGetSuccess,
  taskGetError,
  taskDeleteLoading,
  taskDeleteSuccess,
  taskDeleteError,
  taskStatusChangeLoading,
  taskStatusChangeSuccess,
  taskStatusChangeError,
  allTaskBySprintName,
} from "./actionType";

import axios from "axios";

//create a new task
export const createtask = (data) => async (dispatch) => {
  dispatch({ type: taskCreateLoading });
  try {
    await axios.post("https://cautious-pink-flannel-nightgown.cyclic.app/task/create", data).then((res) => {
      dispatch({ type: taskCreateSuccess, payload: res.data });
    });
  } catch (e) {
    dispatch({ type: taskCreateError, payload: e.message });
  }
};

//read all taskData through userId
export const getallTaskData = (userId) => async (dispatch) => {
  dispatch({ type: taskGetLoading });
  try {
    await axios.get(`https://cautious-pink-flannel-nightgown.cyclic.app/task/${userId}`).then((res) => {
      dispatch({ type: taskGetSuccess, payload: res.data });
    });
  } catch (e) {
    dispatch({ type: taskGetError, payload: e.message });
  }
};

//read taskData using userId and sprintName
export const getTaskDataBySprintName =
  (userId, sprintName) => async (dispatch) => {
    dispatch({ type: taskGetLoading });
    try {
      await axios
        .get(
          `https://cautious-pink-flannel-nightgown.cyclic.app/task/allTaskBySprintName/${sprintName}/${userId}`
        )
        .then((res) => {
          dispatch({ type: allTaskBySprintName, payload: res.data });
        });
    } catch (e) {
      dispatch({ type: taskGetError, payload: e.message });
    }
  };

//update statusofTask value
export const changeTaskStatus = (id, changeValue) => async (dispatch) => {
  dispatch({ type: taskStatusChangeLoading });
  try {
    await axios
      .patch(
        `https://cautious-pink-flannel-nightgown.cyclic.app/task/updateStatusofTask/${id}/${changeValue}`
      )
      .then((res) =>
        dispatch({ type: taskStatusChangeSuccess, payload: res.data })
      );
  } catch (e) {
    dispatch({ type: taskStatusChangeError, payload: e.message });
  }
};

// delete a particular task
export const deletetask = (Id) => async (dispatch) => {
  dispatch({ type: taskDeleteLoading });
  try {
    await axios
      .delete(`https://cautious-pink-flannel-nightgown.cyclic.app/task/delete/${Id}`)
      .then((res) => {
        dispatch({ type: taskDeleteSuccess, payload: res.data });
      });
  } catch (e) {
    dispatch({ type: taskDeleteError, payload: e.message });
  }
};

//reset all success value
export const ResetAllSucceess = () => (dispatch) => {
  try {
    dispatch({ type: "Reset" });
  } catch (e) {
    console.log(e.message);
  }
};
