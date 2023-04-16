import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { ExternalLinkIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSprintData } from "../redux/sprint/action";

const Card = ({ sprintName, link, index, creatorId }) => {
  const dispatch = useDispatch();

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
    >
      <Flex gap="2">
        <Text>Sprint Name:-{sprintName}</Text>
        <Box>
          <Link to={link}>{<ExternalLinkIcon />}</Link>
        </Box>
      </Flex>
      <Flex gap="2">
        <Box onClick={handleDelete}>
          {<DeleteIcon color="red.500" cursor="pointer" boxSize="25px" />}
        </Box>
        <Box>{<EditIcon cursor="pointer" boxSize="25px" />}</Box>
      </Flex>
    </Center>
  );
};

export default Card;
