import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f9f9f9", "#141414");
};

const useBodyColor = () => {
  return useColorModeValue("white", "dark");
};

export { useContentBgColor, useBodyColor };
