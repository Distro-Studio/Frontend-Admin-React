import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {}

export default function FlexLine({ ...props }: Props) {
  return <Box h={"1px"} flex={1} bg={"var(--divider)"} mx={4} {...props} />;
}
