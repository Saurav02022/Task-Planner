import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { ExternalLinkIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSprintData } from "../redux/sprint/action";
import UpdateSprint from "./UpdateSprint";
import { useState } from "react";

const Card = ({ sprintName, link, index, creatorId }) => {
  const dispatch = useDispatch();
  const [renderUpdateSprintComponent, setRenderUpdateSprintComponent] =
    useState(false);

  function handleDelete() {
    dispatch(deleteSprintData(sprintName, creatorId));
  }

  return (
    <Center
      border="1px solid #ccc"
      key={index}
      display="flex"
      flexDirection="column"
      p="5"
      borderRadius="md"
      height="max-content"
    >
      <Flex gap="2">
        <Text>{sprintName}</Text>
        <Box>
          <Link to={link}>{<ExternalLinkIcon />}</Link>
        </Box>
      </Flex>
      <Flex gap="2">
        <Box onClick={handleDelete}>
          {<DeleteIcon color="red.500" cursor="pointer" boxSize="25px" />}
        </Box>
        <Box
          onClick={() =>
            setRenderUpdateSprintComponent(!renderUpdateSprintComponent)
          }
        >
          {<EditIcon cursor="pointer" boxSize="25px" />}
        </Box>
      </Flex>

      {renderUpdateSprintComponent ? (
        <UpdateSprint currentSprintName={sprintName} />
      ) : null}
    </Center>
  );
};

export default Card;
