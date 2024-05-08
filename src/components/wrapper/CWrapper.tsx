import { StackProps, VStack } from "@chakra-ui/react";
import useScreenWidth from "../../lib/useScreenWidth";

interface Props extends StackProps {
  children: any;
}

export default function CWrapper({ children, ...props }: Props) {
  const smScreen = useScreenWidth() <= 768;

  return (
    <VStack
      px={smScreen ? 4 : 6}
      align={"stretch"}
      overflow={"auto"}
      className="noScroll"
      gap={0}
      {...props}
    >
      {children}
    </VStack>
  );
}
