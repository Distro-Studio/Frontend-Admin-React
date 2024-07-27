import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f8f8f8", "#151515");
};

const useTableStripedColor = () => {
  return useColorModeValue("#fbfbfb", "#161616");
};

const useBodyColor = () => {
  return useColorModeValue("white", "dark");
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
  useWhiteDarkColor,
  statusKaryawanColorScheme,
  useLightDarkColor,
  useDarkLightColor,
  useErrorColor,
  useErrorAlphaColor,
  useWarningColor,
  useWarningAlphaColor,
  useTableStripedColor,
};
