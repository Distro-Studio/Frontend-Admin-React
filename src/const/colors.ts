import { useColorModeValue } from "@chakra-ui/react";

const useContentBg = () => {
  return useColorModeValue("#f9f9f9", "#151515");
};

const useBodyColor = () => {
  return useColorModeValue("white", "dark");
};

export { useContentBg, useBodyColor };
