import { Box, BoxProps } from "@chakra-ui/react";
import useScreenHeight from "../../lib/useScreenHeight";
import useScreenWidth from "../../lib/useScreenWidth";

interface Props extends BoxProps {
  children: any;
  noFooterConfig?: boolean;
  noTopNavs?: boolean;
}

export default function TabelContainer({
  children,
  noFooterConfig,
  noTopNavs,
  ...props
}: Props) {
  const sh = useScreenHeight();
  const sw = useScreenWidth();
  const spacings = sw < 768 ? 16 : 24;
  const baseReducer = 88 + spacings * 4;
  const noFooterConfigReducer = noFooterConfig ? 0 : spacings + 40;
  const noTopNavsReducer = noTopNavs ? 0 : spacings + 32;

  return (
    <Box
      className={"tabelContainer scrollX scrollY"}
      overflow={"auto"}
      w={"100%"}
      minH={sh < 500 ? "400px" : "max-content !important"}
      // maxH={[
      //   `calc(100vh - 318px - ${tabelConfigH}px)`,
      //   null,
      //   `calc(100vh - 304px - ${tabelConfigH}px)`,
      // ]}
      maxH={`calc(100vh - 40px - ${baseReducer}px - ${noFooterConfigReducer}px - ${noTopNavsReducer}px)`}
      border={"1px solid var(--divider3)"}
      borderRadius={8}
      {...props}
    >
      {children}
    </Box>
  );
}
