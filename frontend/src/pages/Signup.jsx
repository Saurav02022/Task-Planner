import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useReducer, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { initialValue, SignupReducer } from "./reducer/Signup";
import { registerUser } from "../redux/authentication/action";

const backgroundColor = "#38aa8c";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(SignupReducer, initialValue);
  const toast = useToast();
  const Dispatch = useDispatch();
  const { signupLoading, signupSuccess, signupError } = useSelector(
    (store) => store.AuthenticationReducer
  );
  const navigate = useNavigate();
  if (signupError) {
    toast({
      description: signupError,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  const SignupBtn = () => {
    if (!state.firstName) {
      toast({
        title: "first Name",
        description: "Please Enter Your first Name",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!state.lastName) {
      toast({
        title: "last Name",
        description: "Please Enter Your last Name",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!state.email) {
      toast({
        title: "Email",
        description: "Please Enter Your Email address",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!state.email.includes("@")) {
      toast({
        title: "Email",
        description: "Please Enter Your valid Email address",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (state.email.includes("@@") === true) {
      toast({
        title: "Email",
        description: "Please Enter Your valid Email address",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!state.password) {
      toast({
        title: "Password",
        description: "Please Enter the password",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (state.password.length < 8) {
      toast({
        title: "Password",
        description: "password length should be 8 characters",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    Dispatch(registerUser(state));
  };

  if (signupSuccess === "new registration successfully") {
    toast({
      description: signupSuccess,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  }

  if (signupSuccess === "already registred user Please Login") {
    toast({
      description: signupSuccess,
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }

  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={state.firstName}
                    onChange={(e) =>
                      dispatch({ type: "firstName", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={state.lastName}
                    onChange={(e) =>
                      dispatch({ type: "lastName", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={(e) =>
                    dispatch({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={backgroundColor}
                color={"white"}
                _hover={{
                  bg: backgroundColor,
                }}
                onClick={SignupBtn}
                isLoading={signupLoading}
              >
                Sign up
              </Button>
            </Stack>
            <Flex justifyContent="center" textAlign="center">
              <Text>
                Already a user?{" "}
                <Text color={"blue.400"}>
                  <Link to="/login">Login</Link>
                </Text>
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}