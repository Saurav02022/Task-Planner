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
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetReduxData } from "../redux/authentication/action";

import { initialValue, SignupReducer } from "./reducer/Signup";
import useShowToast from "../CustomHooks/UseShowToast";

const backgroundColor = "#38aa8c";

export default function Signup() {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast] = useShowToast();
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch] = useReducer(SignupReducer, initialValue);

  const { signupLoading, signupSuccess, signupError } = useSelector(
    (store) => store.AuthenticationReducer
  );

  const SignupBtn = () => {
    if (!state.firstName) {
      showToast("first Name", "Please Enter Your first Name", "info");
      return;
    }
    if (!state.lastName) {
      showToast("last Name", "Please Enter Your last Name", "info");
      return;
    }

    if (!state.email) {
      showToast("Email", "Please Enter Your Email address", "info");
      return;
    }
    if (!state.email.includes("@")) {
      showToast("Email", "Please Enter a valid Email address", "info");
      return;
    }
    if (state.email.includes("@@") === true) {
      showToast("Email", "Please Enter a valid Email address", "info");
      return;
    }
    if (!state.password) {
      showToast("Password", "Please Enter the password", "info");
      return;
    }
    if (state.password.length < 8) {
      showToast("Password", "password length should be 8 characters", "info");
      return;
    }
    Dispatch(registerUser(state));
    setTimeout(() => {
      dispatch({ type: "firstName", payload: "" });
      dispatch({ type: "lastName", payload: "" });
      dispatch({ type: "email", payload: "" });
      dispatch({ type: "password", payload: "" });
    }, 2000);
  };

  useEffect(() => {
    if (signupError) {
      showToast("", signupError, "error");
      Dispatch(resetReduxData());
    }
    if (signupSuccess) {
      showToast("", signupSuccess, "success");
      Dispatch(resetReduxData());
      navigate("/login");
    }
  }, [signupError, signupSuccess]);

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
