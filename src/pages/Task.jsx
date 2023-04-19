import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  useDisclosure,
  Box,
  Select,
  Input,
  Heading,
  Center,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useReducer, useState } from "react";
import { initialValue, taskCreate } from "./reducer/taskCreate";

import { useSelector, useDispatch } from "react-redux";
import { ResetAllSucceess, getSprintData } from "../redux/sprint/action";
import {
  changeTaskStatus,
  createtask,
  deletetask,
  getallTaskData,
} from "../redux/task/action";
import useShowToast from "../CustomHooks/UseShowToast";

const backgroundColor = "#38aa8c";

const Sprint = () => {
  const [dataAdd, setDataAdd] = useState(false);
  const [state, Dispatch] = useReducer(taskCreate, initialValue);
  const [showToast] = useShowToast();

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getSuccess } = useSelector((store) => store.sprintReducer);
  const { userid } = useSelector((store) => store.AuthenticationReducer);
  const {
    createLoading,
    createSuccess,
    createError,
    getLoading,
    getTaskSuccess,
    getTaskError,
    deleteLoading,
    deleteError,
    changeStatusloading,
    changeStatusError,
  } = useSelector((store) => store.taskReducer);

  const postTask = () => {
    if (!state.taskType) {
      showToast("", "Please select the Task Type", "info");
      return;
    }
    if (!state.sprintName) {
      showToast("", "Please select the sprint Name", "info");
      return;
    }
    if (!state.task) {
      showToast("", "Please Enter the task", "info");
      return;
    }
    if (!state.statusOfTask) {
      showToast("", "Please Enter the status Of the Task", "info");
      return;
    }

    const payload = {
      taskType: state.taskType,
      sprintName: state.sprintName,
      task: state.task,
      statusOfTask: state.statusOfTask,
      creatorId: userid,
    };
    dispatch(createtask(payload));
    onClose();
    setTimeout(() => {
      setDataAdd(!dataAdd);
      dispatch(ResetAllSucceess());
    }, 2000);
  };

  if (createSuccess === "already task exists") {
    showToast("",createSuccess, "info");
  }

  if (createSuccess === "Sprint Name does not exists") {
    showToast("",createSuccess, "info");
  }

  if (createSuccess === "new task created successfully") {
    showToast("",createSuccess, "success");
  }

  const deleteTask = (id) => {
    dispatch(deletetask(id));
    showToast("", "task deleted successfully", "success");
    setTimeout(() => {
      setDataAdd(!dataAdd);
      dispatch(ResetAllSucceess());
    }, 1000);
  };
  const changeStatusOftheTask = (id, currentStatus) => {
    dispatch(changeTaskStatus(id, currentStatus));
    showToast("", "change status successfully", "success");
    setTimeout(() => {
      setDataAdd(!dataAdd);
      dispatch(ResetAllSucceess());
    }, 1000);
  };

  useEffect(() => {
    if (createError) {
      showToast("", createError, "error");
    }

    if (getTaskError) {
      showToast("", getTaskError, "error");
    }

    if (deleteError) {
      showToast("", deleteError, "error");
    }

    if (changeStatusError) {
      showToast("", changeStatusError, "error");
    }
  }, [createError, getTaskError, deleteError, changeStatusError, showToast]);

  useEffect(() => {
    dispatch(getSprintData(userid));
    dispatch(getallTaskData(userid));
  }, [dataAdd, dispatch, userid]);

  if (getLoading || changeStatusloading) {
    return (
      <Heading as="h1" textAlign="center">
        Loading...
      </Heading>
    );
  }

  return (
    <Flex
      justifyContent="center"
      marginTop="10"
      flexDirection="column"
      gap="10"
      textAlign="center"
    >
      <Box>
        <Button
          backgroundColor={backgroundColor}
          color="white"
          onClick={onOpen}
          isDisabled={getSuccess.length > 0 ? false : true}
        >
          Add a new Task
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a new Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDirection="column" gap="5">
                <Select
                  placeholder="Select task Type"
                  onChange={(e) =>
                    Dispatch({ type: "taskType", payload: e.target.value })
                  }
                >
                  <option value="bug">bug</option>
                  <option value="feature">feature</option>
                  <option value="story">story</option>
                </Select>
                <Select
                  placeholder="Select Sprint Name"
                  onChange={(e) =>
                    Dispatch({ type: "sprintName", payload: e.target.value })
                  }
                >
                  {getSuccess.length > 0 &&
                    getSuccess.map((item, index) => {
                      return <option key={index}>{item.sprintName}</option>;
                    })}
                </Select>
                <Input
                  placeholder="Enter Task Here"
                  onChange={(e) =>
                    Dispatch({ type: "task", payload: e.target.value })
                  }
                />
                <Select
                  placeholder="Select Status of Task"
                  onChange={(e) =>
                    Dispatch({ type: "statusOfTask", payload: e.target.value })
                  }
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Select>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="red"
                mr={3}
                onClick={onClose}
                isDisabled={createLoading}
              >
                Close
              </Button>
              <Button
                colorScheme="green"
                onClick={postTask}
                isLoading={createLoading}
                loadingText="loading..."
              >
                Add a new Task
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        width="90%"
        gap="10"
        margin="auto"
        marginTop="10"
        marginBottom="10"
      >
        {getTaskSuccess.length > 0 &&
          getTaskSuccess.map((item, index) => {
            return (
              <Box
                border="1px solid #ccc"
                key={index}
                padding="5"
                borderRadius="md"
                height="300px"
              >
                <Center display="flex" flexDirection="column" gap="2">
                  <Text>Task Type:- {item.taskType}</Text>
                  <Text>Sprint Name:- {item.sprintName}</Text>
                  <Text noOfLines={2}>Task:- {item.task}</Text>
                  <Text>Status of the Task:- {item.statusOfTask}</Text>
                  <Select
                    mt="2"
                    placeholder="Select status of task"
                    onChange={(e) =>
                      changeStatusOftheTask(item._id, e.target.value)
                    }
                  >
                    <option
                      value="To Do"
                      disabled={item.statusOfTask === "To Do" ? true : false}
                    >
                      To Do
                    </option>
                    <option
                      value="In Progress"
                      disabled={
                        item.statusOfTask === "In Progress" ? true : false
                      }
                    >
                      In Progress
                    </option>
                    <option
                      value="Completed"
                      disabled={
                        item.statusOfTask === "Completed" ? true : false
                      }
                    >
                      Completed
                    </option>
                  </Select>
                  <Button
                    backgroundColor={backgroundColor}
                    color="white"
                    onClick={() => deleteTask(item._id)}
                    isLoading={deleteLoading}
                    loadingText="Loading..."
                  >
                    Delete
                  </Button>
                </Center>
              </Box>
            );
          })}
      </Box>
    </Flex>
  );
};

export default Sprint;
