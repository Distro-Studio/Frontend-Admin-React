import { Box, BoxProps } from "@chakra-ui/react";
import useScreenWidth from "../../lib/useScreenWidth";

interface Props extends BoxProps {
  children: any;
}

export default function TabelContainer({ children, ...props }: Props) {
  const tabelConfig = document.querySelector(".tabelConfig") as HTMLDivElement;
  const tabelConfigH = tabelConfig && tabelConfig.offsetHeight;
  useScreenWidth();

  return (
    <Box
      overflow={"auto"}
      w={"100%"}
      h={[
        `calc(100vh - 318px - ${tabelConfigH}px)`,
        null,
        `calc(100vh - 304px - ${tabelConfigH}px)`,
      ]}
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
