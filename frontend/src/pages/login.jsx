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
} from "@chakra-ui/react";

import { useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import useShowToast from "../CustomHooks/UseShowToast";
import { initialValue, loginReducer } from "./reducer/Login";
import { loginUser, resetReduxData } from "../redux/authentication/action";

const backgroundColor = "#38aa8c";

export default function Login() {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast] = useShowToast();
  const [state, dispatch] = useReducer(loginReducer, initialValue);

  const { loginLoading, loginSuccess, loginError } = useSelector(
    (store) => store.AuthenticationReducer
  );

  const loginBtn = () => {
    if (!state.email) {
      showToast("Email is required", "Please enter your email address", "info");
      return;
    }
    if (!state.email.includes("@") || state.email.includes("@@") === true) {
      showToast(
        "Please Enter valid email address",
        "Please enter your email address",
        "info"
      );
      return;
    }
    if (!state.password) {
      showToast("Password is required", "Please enter your password", "info");
      return;
    }
    Dispatch(loginUser(state));
  };

  useEffect(() => {
    switch (loginSuccess) {
      case "User not found":
        showToast(
          "Your account is not available",
          "Please signup on our website",
          "info"
        );
        navigate("/signup");
        Dispatch(resetReduxData());
        break;
      case "Please Verify your email address":
        showToast(
          "Verify your email address",
          "Please Verify your email address",
          "info"
        );
        dispatch({ type: "email", payload: "" });
        dispatch({ type: "password", payload: "" });
        Dispatch(resetReduxData());
        break;
      case "Wrong Password":
        showToast("Wrong Password", "Please Enter your password", "info");
        dispatch({ type: "email", payload: "" });
        dispatch({ type: "password", payload: "" });
        Dispatch(resetReduxData());
        break;
      case "Login successfully":
        showToast("Login successfully", "", "success");
        navigate("/");
        break;
      default:
        if (loginError) {
          showToast("Login error", loginError, "error");
        }
    }
  }, [loginSuccess, loginError]);

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
