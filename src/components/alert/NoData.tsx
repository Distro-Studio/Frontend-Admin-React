import { Icon, StackProps, Text, VStack } from "@chakra-ui/react";
import { RiCloseCircleLine } from "@remixicon/react";

interface Props extends StackProps {}

export default function NoData({ ...props }: Props) {
  return (
    <VStack flex={1} justify={"center"} opacity={0.2} {...props}>
      <Icon as={RiCloseCircleLine} fontSize={80} />
      <Text textAlign={"center"} fontWeight={600}>
        Tidak ada data
      </Text>
    </VStack>
  );
}
