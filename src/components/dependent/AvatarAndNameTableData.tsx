import { Avatar, HStack, StackProps, Text, Tooltip } from "@chakra-ui/react";
import { Interface__Karyawan } from "../../const/interfaces";

interface Props extends StackProps {
  data: Interface__Karyawan;
}

export default function AvatarAndNameTableData({ data, ...props }: Props) {
  return (
    <HStack w={"150px"} {...props}>
      <Avatar
        src={data.user.foto_profil || ""}
        name={data.user.nama}
        size={"sm"}
      />
      <Tooltip label={data.user.nama}>
        <Text
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
        >
          {data.user.nama}
        </Text>
      </Tooltip>
    </HStack>
  );
}
