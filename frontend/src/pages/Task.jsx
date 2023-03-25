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
  useToast,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
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
} from "../redux/task.js/action";

const backgroundColor = "#38aa8c";

const Sprint = () => {
  const [dataAdd, setDataAdd] = useState(false);
  const [state, Dispatch] = useReducer(taskCreate, initialValue);

  const dispatch = useDispatch();
  const toast = useToast();
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
      toast({
        description: `Please select the Task Type`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!state.sprintName) {
      toast({
        description: `Please select the sprint Name`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!state.task) {
      toast({
        description: `Please Enter the task`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!state.statusOfTask) {
      toast({
        description: `Please Enter the status Of the Task`,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
    toast({
      description: createSuccess,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (createSuccess === "Sprint Name does not exists") {
    toast({
      description: createSuccess,
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (createSuccess === "new task created successfully") {
    toast({
      description: createSuccess,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  const deleteTask = (id) => {
    dispatch(deletetask(id));
    toast({
      description: "task deleted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    setTimeout(() => {
      setDataAdd(!dataAdd);
      dispatch(ResetAllSucceess());
    }, 1000);
  };

  if (createError) {
    toast({
      description: createError,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (getTaskError) {
    toast({
      description: getTaskError,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (deleteError) {
    toast({
      description: deleteError,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (changeStatusError) {
    toast({
      description: changeStatusError,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  useEffect(() => {
    dispatch(getSprintData(userid));
    dispatch(getallTaskData(userid));
  }, [dataAdd]);

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
              <Button backgroundColor={"red"} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                backgroundColor={backgroundColor}
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

      <Table>
        <Thead>
          <Tr>
            <Td> S.no</Td>
            <Td>Task Type</Td>
            <Td>Sprint Name</Td>
            <Td>Task</Td>
            <Td>Status of The Task</Td>
            <Td>Change Status of Task</Td>
          </Tr>
        </Thead>
        <Tbody>
          {getTaskSuccess.length > 0 &&
            getTaskSuccess.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{item.taskType}</Td>
                  <Td>{item.sprintName}</Td>
                  <Td>{item.task}</Td>
                  <Td>{item.statusOfTask}</Td>
                  <Td>
                    <Select
                      placeholder="Select status of task"
                      onChange={(e) => {
                        dispatch(changeTaskStatus(item._id, e.target.value));
                        toast({
                          description: "change Status successfully",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                          position: "top-right",
                        });
                        setTimeout(() => {
                          setDataAdd(!dataAdd);
                          dispatch(ResetAllSucceess());
                        }, 1000);
                      }}
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
                  </Td>
                  <Td>
                    <Button
                      backgroundColor={backgroundColor}
                      color="white"
                      onClick={() => deleteTask(item._id)}
                      isLoading={deleteLoading}
                      loadingText="Loading..."
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default Sprint;
