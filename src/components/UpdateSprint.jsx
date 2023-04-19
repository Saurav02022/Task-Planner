import { Button, Center, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "../redux/sprint/action";
import useShowToast from "../CustomHooks/UseShowToast";

const UpdateSprint = ({ currentSprintName, creatorId }) => {
  const [name, setUpdateName] = useState();
  const dispatch = useDispatch();
  const [showToast] = useShowToast();

  function UpdateSprintName(updatedName) {
    if (!name) {
      showToast("", "Please Enter Your Updated Name", "info");
      return;
    }
    dispatch(updateName(currentSprintName, creatorId, updatedName));
    showToast("", "update sprint name successfully", "success");
  }
  
  return (
    <Center display="flex" flexDir="column" gap="2" mt="2">
      <Text>Current Sprint Name:- {currentSprintName}</Text>
      <Input
        type="text"
        placeholder="Updated Sprint Name"
        onChange={(e) => setUpdateName(e.target.value)}
      />
      <Button
        bgColor="#38aa8c"
        color="white"
        _hover={{
          bgColor: "#38aa8c",
          color: "white",
        }}
        onClick={() => UpdateSprintName(name)}
      >
        submit
      </Button>
    </Center>
  );
};

export default UpdateSprint;
