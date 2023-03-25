import {
  sprintCreateLoading,
  sprintCreateSuccess,
  sprintCreateError,
  sprintGetLoading,
  sprintGetSuccess,
  sprintGetError,
} from "./actionType";

let initialValue = {
  createLoading: false,
  createSuccess: "",
  createError: "",
  getLoading: false,
  getSuccess: [],
  getError: "",
};

const sprintReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case sprintCreateLoading: {
      return {
        ...state,
        createLoading: true,
      };
    }
    case sprintCreateSuccess: {
      return {
        ...state,
        createLoading: false,
        createSuccess: payload.message,
      };
    }
    case sprintCreateError: {
      return {
        ...state,
        createLoading: false,
        createSuccess: "",
        createError: payload,
      };
    }

    case sprintGetLoading: {
      return {
        ...state,
        getLoading: true,
      };
    }
    case sprintGetSuccess: {
      return {
        ...state,
        getLoading: false,
        getSuccess: payload,
      };
    }
    case sprintGetError: {
      return {
        ...state,
        getLoading: false,
        getSuccess: "",
        getError: payload,
      };
    }

    case "Reset": {
      return {
        ...state,
        createSuccess: "",
        deleteSuccess: "",
      };
    }
    default: {
      return state;
    }
  }
};

export default sprintReducer;