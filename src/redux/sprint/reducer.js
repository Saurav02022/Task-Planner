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
  sprintNameChangeLoading,
  sprintNameChangeSuccess,
  sprintNameChangeError,
} from "./actionType";

let initialValue = {
  createLoading: false,
  createSuccess: "",
  createError: "",
  getLoading: false,
  getSuccess: [],
  getError: "",
  deleteLoading: false,
  deleteSuccess: "",
  deleteError: "",
  updateNameLoading: false,
  updateNameSuccess: "",
  updateNameError: "",
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
    case sprintDeleteLoading: {
      return {
        ...state,
        deleteLoading: true,
      };
    }
    case sprintDeleteSuccess: {
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: payload.message,
      };
    }
    case sprintDeleteError: {
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: "",
        deleteError: payload.message,
      };
    }
    case sprintNameChangeLoading: {
      return {
        ...state,
        updateNameLoading: true,
      };
    }
    case sprintNameChangeSuccess: {
      return {
        ...state,
        updateNameLoading: false,
        updateNameSuccess: payload.message,
      };
    }
    case sprintNameChangeError: {
      return {
        ...state,
        updateNameLoading: false,
        updateNameSuccess: "",
        updateNameError: payload.message,
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
