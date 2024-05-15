import { StackProps, VStack } from "@chakra-ui/react";

interface Props extends StackProps {
  children?: any;
}

export default function CContainer({ children, ...props }: Props) {
  return (
    <VStack
      className="CContainer"
      gap={0}
      align={"stretch"}
      w={"100%"}
      {...props}
    >
      {children}
    </VStack>
  );
}
