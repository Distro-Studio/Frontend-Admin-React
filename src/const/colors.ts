import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f5f5f5", "#151515");
};

const useBodyColor = () => {
  return useColorModeValue("white", "dark");
};

export { useContentBgColor, useBodyColor };
