import { Button, Center, Input, Text } from "@chakra-ui/react";
import React from "react";

const UpdateSprint = ({ currentSprintName }) => {
  return (
    <Center display="flex" flexDir="column" gap="2" mt="2">
      <Text>Current Sprint Name:- {currentSprintName}</Text>
      <Input type="text" placeholder="Updated Sprint Name" />
      <Button
        bgColor="#38aa8c"
        color="white"
        _hover={{
          bgColor: "#38aa8c",
          color: "white",
        }}
      >
        submit
      </Button>
    </Center>
  );
};

export default UpdateSprint;
