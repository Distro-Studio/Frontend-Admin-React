import {
  Box,
  Button,
  HStack,
  Icon,
  IconButtonProps,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMoonLine } from "@remixicon/react";
import * as React from "react";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcherHeaderMenu: React.FC<ColorModeSwitcherProps> = (
  props
) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");

  return (
    <HStack
      as={Button}
      h={"45px"}
      w={"100%"}
      className="btn"
      justify={"flex-start"}
      fontWeight={400}
      onClick={toggleColorMode}
    >
      <Icon as={RiMoonLine} fontSize={18} />
      <Text>Mode Gelap</Text>
      <Box
        w={"10px"}
        h={"10px"}
        borderRadius={"full"}
        bg={text === "dark" ? "red.400" : "green.400"}
        ml={"auto"}
      />
    </HStack>
  );
};
