import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: any;
}

export default function TabelContainer({ children, ...props }: Props) {
  return (
    <Box
      overflow={"auto"}
      w={"100%"}
      maxH={"calc(80vh - 80px)"}
      border={"1px solid var(--divider3)"}
      borderRadius={16}
      className="scrollX"
      {...props}
      // maxW={"1024px"}
      // mx={"auto"}
    >
      {children}
    </Box>
  );
}
