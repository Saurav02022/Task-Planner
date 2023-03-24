import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Image,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authentication/action";

const Links = ["Home", "Sprint"];

const backgroundColor = "#38aa8c";

const NavLink = ({ children }) => (
  <Link
    to={children === Links[0] ? "/" : children === Links[1] ? "/sprint" : null}
  >
    <Box
      color="white"
      cursor="pointer"
      fontSize="large"
      _hover={{
        textDecoration: "underline",
        color: "black",
      }}
    >
      {children}
    </Box>
  </Link>
);

function Navbar() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuth, firstName } = useSelector(
    (store) => store.AuthenticationReducer
  );
  const dispatch = useDispatch();

  const logoutBtn = () => {
    dispatch(logoutUser());
    toast({
      description: "logout successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };
  return (
    <>
      <Box backgroundColor={backgroundColor} p={4}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          _hover={{
            cursor: "pointer",
          }}
          width="100%"
        >
          <IconButton
            backgroundColor={backgroundColor}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex alignItems={"center"} justifyContent={"space-evenly"}>
            <Box
              display="flex"
              alignItems={"center"}
              gap="10"
              justifyContent={{
                base: "center",
                md: "normal",
              }}
            >
              <Image
                src="https://i.ibb.co/6ZqY4R4/Screenshot-2023-03-24-at-3-25-09-PM.png"
                alt="company-logo"
                width={{
                  base: "25%",
                  
                }}
              />
              <Box display={{ base: "none", md: "flex" }} gap="10">
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Box>
            </Box>
          </Flex>

          <Flex
            alignItems={"center"}
            gap="5"
            flexDirection={{
              base: "column",
              sm: "column",
              md: "row",
              lg: "row",
              "2xl": "row",
            }}
          >
            <Link to="/login">
              <Button
                visibility={isAuth === true ? "hidden" : "visible"}
                backgroundColor={backgroundColor}
                color="white"
                border="1px solid #ccc"
                _hover={{
                  color: "black",
                }}
              >
                Login
              </Button>
            </Link>
            {isAuth && (
              <Button
                visibility={isAuth === false ? "hidden" : "visible"}
                backgroundColor={backgroundColor}
                color="white"
                border="1px solid #ccc"
                _hover={{
                  color: "black",
                }}
                onClick={logoutBtn}
              >
                Logout
              </Button>
            )}
            {isAuth && <Text>Welcome {firstName}</Text>}
            <Link to="/signup">
              <Button
                visibility={isAuth === true ? "hidden" : "visible"}
                backgroundColor={backgroundColor}
                color="white"
                border="1px solid #ccc"
                _hover={{
                  color: "black",
                }}
              >
                Signup
              </Button>
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
}
export default Navbar;
