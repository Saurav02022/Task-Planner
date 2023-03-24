let initialValue = {
  email: "",
  password: "",
};

const loginReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case "email": {
      return {
        ...state,
        email: payload,
      };
    }
    case "password": {
      return {
        ...state,
        password: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { loginReducer, initialValue };
