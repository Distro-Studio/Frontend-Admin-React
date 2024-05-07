import { Button, Icon, Text, VStack } from "@chakra-ui/react";
import { RiRefreshLine } from "@remixicon/react";

interface Props {
  loading: boolean;
  getData: () => void;
}

export default function Retry({ loading, getData }: Props) {
  return (
    <VStack p={4}>
      <Text mb={2} opacity={0.6}>
        Konten gagal dimuat
      </Text>
      <Button
        className="btn-solid clicky"
        isLoading={loading}
        onClick={getData}
        leftIcon={<Icon as={RiRefreshLine} />}
      >
        Muat Ulang
      </Button>
    </VStack>
  );
}
