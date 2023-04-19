let initialValue = {
  taskType: "",
  sprintName: "",
  task: "",
  statusOfTask: "",
};

const taskCreate = (state = initialValue, { type, payload }) => {
  switch (type) {
    case "taskType": {
      return {
        ...state,
        taskType: payload,
      };
    }
    case "sprintName": {
      return {
        ...state,
        sprintName: payload,
      };
    }
    case "task": {
      return {
        ...state,
        task: payload,
      };
    }
    case "statusOfTask": {
      return {
        ...state,
        statusOfTask: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { taskCreate, initialValue };
