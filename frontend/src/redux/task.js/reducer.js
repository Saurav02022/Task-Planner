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

let initialValue = {
  createLoading: false,
  createSuccess: "",
  createError: "",
  getLoading: false,
  getTaskSuccess: [],
  allTaskBySprint: [],
  getTaskError: "",
  deleteLoading: false,
  deleteSuccess: "",
  deleteError: "",
  changeStatusloading: false,
  changeStatusSuccess: "",
  changeStatusError: "",
};

const taskReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case taskCreateLoading: {
      return {
        ...state,
        createLoading: true,
      };
    }
    case taskCreateSuccess: {
      return {
        ...state,
        createLoading: false,
        createSuccess: payload.message,
      };
    }
    case taskCreateError: {
      return {
        ...state,
        createLoading: false,
        createSuccess: "",
        createError: payload,
      };
    }

    case taskGetLoading: {
      return {
        ...state,
        getLoading: true,
      };
    }
    case taskGetSuccess: {
      return {
        ...state,
        getLoading: false,
        getTaskSuccess: payload,
      };
    }
    case allTaskBySprintName: {
      return {
        ...state,
        getLoading: false,
        allTaskBySprint: payload.data,
      };
    }
    case taskGetError: {
      return {
        ...state,
        getLoading: false,
        getTaskSuccess: [],
        getTaskError: payload,
      };
    }
    case taskDeleteLoading: {
      return {
        ...state,
        deleteLoading: true,
      };
    }
    case taskDeleteSuccess: {
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: payload.message,
      };
    }
    case taskDeleteError: {
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: "",
        deleteError: payload,
      };
    }
    case "Reset": {
      return {
        ...state,
        createSuccess: "",
        deleteSuccess: "",
        changeStatusSuccess: "",
      };
    }

    case taskStatusChangeLoading: {
      return {
        ...state,
        changeStatusloading: true,
      };
    }
    case taskStatusChangeSuccess: {
      return {
        ...state,
        changeStatusloading: false,
        changeStatusSuccess: payload.message,
      };
    }
    case taskStatusChangeError: {
      return {
        ...state,
        changeStatusloading: false,
        changeStatusSuccess: "",
        changeStatusError: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default taskReducer;
