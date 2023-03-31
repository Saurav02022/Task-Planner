import React, { useState, useEffect } from "react";

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
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  useToast,
  Heading,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import {
  ResetAllSucceess,
  createSprint,
  getSprintData,
} from "../redux/sprint/action";

import { Link } from "react-router-dom";

const backgroundColor = "#38aa8c";
const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sprintName, setSprintName] = useState("");
  const [addNewSprint, setAddNewSprint] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();

  const { userid } = useSelector((store) => store.AuthenticationReducer);
  const {
    createLoading,
    createSuccess,
    createError,
    getLoading,
    getSuccess,
    getError,
  } = useSelector((store) => store.sprintReducer);

  const createNewSprintBtn = () => {
    if (!sprintName) {
      toast({
        description: "Please enter sprint Name",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    const payload = {
      sprintName,
      creatorId: userid,
    };
    dispatch(createSprint(payload));
    setSprintName("");
  };

  useEffect(() => {
    if (createSuccess === "already sprint exists") {
      toast({
        description: createSuccess,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(ResetAllSucceess());
      onClose();
    }

    if (createSuccess === "new sprint created successfully") {
      toast({
        description: createSuccess,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setAddNewSprint(!addNewSprint);
      dispatch(ResetAllSucceess());
      onClose();
    }

    if (createError) {
      toast({
        description: createError,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (getError) {
      toast({
        description: getError,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [createSuccess, createError, getError]);

  useEffect(() => {
    dispatch(getSprintData(userid));
  }, [addNewSprint]);
  if (getLoading) {
    return (
      <Heading as="h2" textAlign="center">
        Loading...
      </Heading>
    );
  }
  return (
    <Flex justifyContent="center" flexDirection="column" textAlign="center">
      <Box marginTop="50px">
        <Button onClick={onOpen}>Create a new Sprint</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a new Sprint</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Sprint Name"
                value={sprintName}
                onChange={(e) => setSprintName(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button backgroundColor={"red"} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                isLoading={createLoading}
                loadingText="Loading..."
                backgroundColor={backgroundColor}
                onClick={createNewSprintBtn}
              >
                Create a new Sprint
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Table marginTop="50px">
        <Thead>
          <Tr>
            <Td>Sr.no</Td>
            <Td>Sprint Name</Td>
          </Tr>
        </Thead>
        <Tbody>
          {getSuccess.length > 0 &&
            getSuccess.map((item, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <Link to={`/${item.sprintName}`}>{item.sprintName}</Link>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default Home;
