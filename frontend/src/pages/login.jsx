/* The above code is a login page for a user to login to the application. */
/* The above code is a login page for a user to login to the application. */
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

import { initialValue, loginReducer } from "./reducer/Login";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetReduxData } from "../redux/authentication/action";

const backgroundColor = "#38aa8c";

export default function Login() {
 const [state, dispatch] = useReducer(loginReducer, initialValue);

  const toast = useToast();
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginLoading, loginSuccess, loginError } = useSelector(
    (store) => store.AuthenticationReducer
  );

const loginBtn = () => {
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
    if (!state.email.includes("@") || state.email.includes("@@") === true) {
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
        description: "Please Enter Your password",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    Dispatch(loginUser(state));
  };
  switch (loginSuccess) {
    case "Login successfully":
      toast({
        description: loginSuccess,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/");
      break;
    case "Wrong Password":
      toast({
        description: loginSuccess,
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      break;
    case "Email Address not found":
      toast({
        description: loginSuccess,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/signup");
      Dispatch(resetReduxData());
      break;
    default:
      if (loginError) {
        toast({
          description: loginError,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
  }
  
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={state.password}
                onChange={(e) =>
                  dispatch({ type: "password", payload: e.target.value })
                }
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={backgroundColor}
                color={"white"}
                _hover={{
                  bg: backgroundColor,
                }}
                onClick={loginBtn}
                isLoading={loginLoading}
                loadingText="submitting"
              >
                Sign in
              </Button>
            </Stack>
            <Flex justifyContent="center" textAlign="center">
              <Text>
                Open an new account ?{" "}
                <Text color={"blue.400"}>
                  <Link to="/signup">Signup</Link>
                </Text>
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}