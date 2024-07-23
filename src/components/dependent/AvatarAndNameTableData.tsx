import { Avatar, HStack, StackProps, Text, Tooltip } from "@chakra-ui/react";
import {
  Interface__DetailKaryawan,
  Interface__Karyawan,
} from "../../const/interfaces";
import DetailKaryawanModalDisclosure from "./DetailKaryawanModalDisclosure";

interface Props extends StackProps {
  data: Interface__Karyawan | Interface__DetailKaryawan;
}

export default function AvatarAndNameTableData({ data, ...props }: Props) {
  return (
    <HStack
      w={"180px"}
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...props}
    >
      <DetailKaryawanModalDisclosure karyawan_id={data.id}>
        <Avatar
          cursor={"pointer"}
          src={data.user.foto_profil || ""}
          name={data.user.nama}
          size={"sm"}
        />
      </DetailKaryawanModalDisclosure>
      <Tooltip label={data.user.nama} placement="right">
        <Text
          w={"100%"}
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
