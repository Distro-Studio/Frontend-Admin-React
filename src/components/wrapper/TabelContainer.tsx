import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: any;
}

export default function TabelContainer({ children, ...props }: Props) {
  return (
    <Box
      overflow={"auto"}
      w={"100%"}
      h={[`calc(100vh - 398px)`, null, `calc(100vh - 344px)`]}
      border={"1px solid var(--divider3)"}
      borderRadius={8}
      {...props}
      // className="scrollX"
      // maxW={"1024px"}
      // mx={"auto"}
    >
      {children}
    </Box>
  );
}
