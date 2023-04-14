import { useToast } from "@chakra-ui/react";

const useShowToast = () => {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
      position: "bottom-right",
    });
  };
  return [showToast];
};

export default useShowToast;
