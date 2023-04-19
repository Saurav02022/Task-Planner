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

const initialState = {
  isAuth: false,
  signupLoading: false,
  signupSuccess: "",
  signupError: "",
  loginLoading: false,
  loginSuccess: "",
  loginError: "",
  token: "",
  userid: "",
  firstName: "",
};

const AuthenticationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signupSuccess: payload,
        signupLoading: false,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        isAuth: false,
        signupLoading: false,
        signupSuccess: "",
        signupError: payload,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        isAuth: false,
        loginLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: payload.isAuthenticated,
        loginSuccess: payload.message,
        loginLoading: false,
        token: payload.token,
        userid: payload.userId,
        firstName: payload.firstName,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isAuth: false,
        loginLoading: false,
        loginSuccess: "",
        loginError: payload,
        token: "",
        userid: "",
      };
    case RESET: {
      return {
        isAuth: false,
        signupLoading: false,
        signupSuccess: "",
        signupError: "",
        loginLoading: false,
        loginSuccess: "",
        loginError: "",
        token: "",
        userid: "",
        firstName: "",
      };
    }
    case Logout: {
      return {
        isAuth: false,
        signupLoading: false,
        signupSuccess: "",
        signupError: "",
        loginLoading: false,
        loginSuccess: "",
        loginError: "",
        token: "",
        userid: "",
        firstName: "",
      };
    }

    default:
      return state;
  }
};

export { AuthenticationReducer };
