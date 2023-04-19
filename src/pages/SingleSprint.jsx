import {
  Table,
  Thead,
  Tr,
  Td,
  Button,
  Tbody,
  Select,
  useToast,
  Heading,
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
  }, [getTaskError, deleteError, changeStatusError]);

  useEffect(() => {
    dispatch(getTaskDataBySprintName(userid, sprintName));
  }, [dataAdd]);

  if (getLoading || changeStatusloading) {
    return (
      <Heading as="h1" textAlign="center">
        Loading...
      </Heading>
    );
  }
  return (
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
        {allTaskBySprint.length > 0 &&
          allTaskBySprint.map((item, index) => {
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
  );
};

export default SingleSprint;
