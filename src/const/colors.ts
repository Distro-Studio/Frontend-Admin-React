import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f7f7f7", "#141414");
};

const useBodyColor = () => {
  return useColorModeValue("white", "dark");
};

export { useContentBgColor, useBodyColor };
