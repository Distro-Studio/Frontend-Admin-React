import { Box, BoxProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Skeleton from "../independent/Skeleton";

interface Props extends BoxProps {
  children: any;
}

export default function TabelContainer({ children, ...props }: Props) {
  const [tabelConfigH, setTabelConfigH] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const tabelConfig = document.querySelector(
      ".tabelConfig"
    ) as HTMLDivElement;

    if (tabelConfig) {
      setTabelConfigH(tabelConfig.offsetHeight);
      setLoading(false);
    }
    setLoading(false);
  }, []);

  // useScreenWidth();
  // useScreenHeight();

  return !loading ? (
    <Box
      className={"tabelContainer"}
      overflow={"auto"}
      w={"100%"}
      minH={"max-content !important"}
      maxH={[
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
  ) : (
    <Skeleton flex={1} minH={"calc(100vh - 344px)"} />
  );
}
