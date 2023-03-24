let initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignupReducer = (state = initialValue, { type, payload }) => {
  switch (type) {
    case "firstName": {
      return {
        ...state,
        firstName: payload,
      };
    }
    case "lastName": {
      return {
        ...state,
        lastName: payload,
      };
    }
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

export { SignupReducer, initialValue };
