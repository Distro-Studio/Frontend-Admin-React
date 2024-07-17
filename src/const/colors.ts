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

const useLightDarkColor = () => {
  return useColorModeValue("white", "#191919");
};

const useDarkLightColor = () => {
  return useColorModeValue("dark", "white");
};

const useErrorColor = () => {
  return useColorModeValue("#E53E3E", "#FC8181");
};

const useWarningColor = () => {
  return useColorModeValue("#C05621", "#FBD38D");
};

const useErrorAlphaColor = () => {
  return useColorModeValue("#FED7D7", "#FEB2B229");
};

const useWarningAlphaColor = () => {
  return useColorModeValue("#FEEBC8", "#FBD38D29");
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
  useLightDarkColor,
  useDarkLightColor,
  useErrorColor,
  useErrorAlphaColor,
  useWarningColor,
  useWarningAlphaColor,
};
