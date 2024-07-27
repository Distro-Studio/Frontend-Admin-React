import { Box, Text, Tooltip } from "@chakra-ui/react";
import formatDate from "../../lib/formatDate";
import BooleanBadge from "./BooleanBadge";

interface Props {
  data: Date | string;
}
export default function StatusDihapus({ data }: Props) {
  return (
    <Tooltip
      openDelay={500}
      label={
        <>
          <Text>Dihapus {formatDate(data)}</Text>

          <Text opacity={0.4} mt={2}>
            Data yang dihapus tidak akan muncul di dafta opsi, namun akan tetap
            menjadi legacy data
          </Text>
        </>
      }
      placement="right"
    >
      <Box>
        <BooleanBadge
          w={"120px"}
          data={!!data}
          trueValue="Dihapus"
          falseValue=""
          colorScheme={data ? "red" : ""}
        />
      </Box>
    </Tooltip>
  );
}
