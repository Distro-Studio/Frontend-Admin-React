import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f9f9f9", "#141414");
};

const useBodyColor = () => {
  return useColorModeValue("white", "dark");
};

const usePrimaryAlphaColor = () => {
  return useColorModeValue("teal.100", "rgba(129, 230, 217, 0.16)");
};

const useWhiteDarkColor = () => {
  return useColorModeValue("white", "dark");
};

const statusKaryawanColorScheme = {
  tetap: "orange",
  Tetap: "orange",
  kontrak: "purple",
  Kontrak: "purple",
  magang: "green",
  Magang: "green",
};

export {
  useContentBgColor,
  useBodyColor,
  usePrimaryAlphaColor,
  useWhiteDarkColor,
  statusKaryawanColorScheme,
};
