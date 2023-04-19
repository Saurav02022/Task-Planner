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
  useToast,
  Heading,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import {
  ResetAllSucceess,
  createSprint,
  getSprintData,
} from "../redux/sprint/action";

import Card from "../components/Card";

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
    deleteLoading,
    deleteSuccess,
    deleteError,
    updateNameLoading,
    updateNameError,
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
    if (updateNameError) {
      toast({
        description: updateNameError,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
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
    if (deleteSuccess) {
      toast({
        description: deleteSuccess,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      dispatch(ResetAllSucceess());
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
  }, [
    createSuccess,
    createError,
    getError,
    deleteError,
    deleteSuccess,
    toast,
    dispatch,
    onClose,
    addNewSprint,
    updateNameError,
  ]);

  useEffect(() => {
    dispatch(getSprintData(userid));
  }, [addNewSprint, deleteSuccess, dispatch, updateNameLoading, userid]);

  if (getLoading) {
    return (
      <Heading as="h2" textAlign="center">
        Loading...
      </Heading>
    );
  }
  if (deleteLoading) {
    return (
      <Heading as="h2" textAlign="center">
        Loading...
      </Heading>
    );
  }

  if (updateNameLoading) {
    return (
      <Heading as="h2" textAlign="center">
        Loading...
      </Heading>
    );
  }

  return (
    <Flex justifyContent="center" flexDirection="column" textAlign="center">
      <Box marginTop="50px">
        <Button
          onClick={onOpen}
          backgroundColor={backgroundColor}
          color="white"
        >
          Create a new Sprint
        </Button>

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
                isDisabled={createLoading || createError}
              />
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
                isLoading={createLoading}
                loadingText="Loading..."
                colorScheme="green"
                onClick={createNewSprintBtn}
              >
                Create a new Sprint
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
        {getSuccess.length > 0 &&
          getSuccess.map((item, index) => {
            return (
              <Card
                sprintName={item.sprintName}
                creatorId={item.creatorId}
                key={index}
                link={item.sprintName}
                index={index}
              />
            );
          })}
      </Box>
    </Flex>
  );
};

export default Home;
