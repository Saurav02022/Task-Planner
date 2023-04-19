import {
  Button,
  Select,
  useToast,
  Heading,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  ResetAllSucceess,
  changeTaskStatus,
  deletetask,
  getTaskDataBySprintName,
} from "../redux/task/action";

const backgroundColor = "#38aa8c";

const SingleSprint = () => {
  const [dataAdd, setDataAdd] = useState(false);
  const { sprintName } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const { userid } = useSelector((store) => store.AuthenticationReducer);
  const {
    getLoading,
    allTaskBySprint,
    getTaskError,
    deleteLoading,
    deleteError,
    changeStatusloading,
    changeStatusError,
  } = useSelector((store) => store.taskReducer);

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

  useEffect(() => {
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
  }, [getTaskError, deleteError, changeStatusError, toast]);

  useEffect(() => {
    dispatch(getTaskDataBySprintName(userid, sprintName));
  }, [dataAdd, dispatch, sprintName, userid]);

  if (getLoading || changeStatusloading) {
    return (
      <Heading as="h1" textAlign="center">
        Loading...
      </Heading>
    );
  }
  return (
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
      {allTaskBySprint.length > 0 &&
        allTaskBySprint.map((item, index) => {
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
                    disabled={item.statusOfTask === "Completed" ? true : false}
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
  );
};

export default SingleSprint;
