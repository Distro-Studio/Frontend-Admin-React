import { Avatar, HStack, StackProps, Text, Tooltip } from "@chakra-ui/react";
import {
  Interface__DetailKaryawan,
  Interface__Karyawan,
} from "../../const/interfaces";
import DetailKaryawanModalDisclosure from "./DetailKaryawanModalDisclosure";
import CContainer from "../wrapper/CContainer";
import BooleanBadge from "./BooleanBadge";

interface Props extends StackProps {
  data: Interface__Karyawan | Interface__DetailKaryawan;
  withJenisKaryawan?: boolean;
}

export default function AvatarAndNameTableData({
  data,
  withJenisKaryawan,
  ...props
}: Props) {
  return (
    <HStack
      w={"180px"}
      onClick={(e) => {
        e.stopPropagation();
      }}
      gap={3}
      {...props}
    >
      <DetailKaryawanModalDisclosure karyawan_id={data.id}>
        <Avatar
          cursor={"pointer"}
          src={data.user.foto_profil || ""}
          name={data.user.nama}
          size={withJenisKaryawan ? "md" : "sm"}
        />
      </DetailKaryawanModalDisclosure>

      <CContainer gap={2} overflow={"hidden"}>
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

        {withJenisKaryawan && (
          <BooleanBadge
            data={data.unit_kerja.jenis_karyawan}
            colorScheme={data.unit_kerja.jenis_karyawan ? "cyan" : "orange"}
            trueValue="Shift"
            falseValue="Non-Shift"
          />
        )}
      </CContainer>
    </HStack>
  );
}
