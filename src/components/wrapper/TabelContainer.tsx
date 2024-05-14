import { Box, BoxProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props extends BoxProps {
  children: any;
}

export default function TabelContainer({ children, ...props }: Props) {
  const [tabelConfigH, setTabelConfigH] = useState(0);
  useEffect(() => {
    const tabelConfig = document.querySelector(
      ".tabelConfig"
    ) as HTMLDivElement;

    if (tabelConfig) {
      setTabelConfigH(tabelConfig.offsetHeight);
    }
  }, []);

  // useScreenWidth();
  // useScreenHeight();

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
