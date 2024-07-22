import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { RiCircleFill } from "@remixicon/react";
import formatDate from "../../lib/formatDate";
import CContainer from "../wrapper/CContainer";
import SmallLink from "./SmallLink";

interface Props {
  data: any;
}

export default function TabelDetailRekamJejak({ data }: Props) {
  // const formattedHeader = [
  //   {
  //     th: "No. Induk Karyawan",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Kategori Transfer",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Tanggal Pengajuan",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Tanggal Mulai",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Unit Kerja Asal",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Unit Kerja Tujuan",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Jabatan Asal",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Jabatan Tujuan",
  //     isSortable: true,
  //   },
  //   {
  //     th: "Alasan",
  //   },
  //   {
  //     th: "Dokumen",
  //     isSortable: true,
  //   },
  // ];
  // const formattedData = data.map((item: any) => ({
  //   id: item.id,
  //   rows: [
  //     {
  //       value: item.nik,
  //       td: item.nik,
  //       isNumeric: true,
  //     },
  //     {
  //       value: item.kategori.label,
  //       td: item.kategori.label,
  //     },
  //     {
  //       value: item.created_at,
  //       td: formatDate(item.created_at),
  //     },
  //     {
  //       value: item.tgl_mulai,
  //       td: formatDate(item.tgl_mulai),
  //     },
  //     {
  //       value: item.unit_kerja_asal.nama_unit,
  //       td: item.unit_kerja_asal.nama_unit,
  //     },
  //     {
  //       value: item.unit_kerja_tujuan.nama_unit,
  //       td: item.unit_kerja_tujuan.nama_unit,
  //     },
  //     {
  //       value: item.jabatan_asal.nama_jabatan,
  //       td: item.jabatan_asal.nama_jabatan,
  //     },
  //     {
  //       value: item.jabatan_tujuan.nama_jabatan,
  //       td: item.jabatan_tujuan.nama_jabatan,
  //     },
  //     {
  //       value: item.alasan,
  //       td: (
  //         <Tooltip label={item.alasan}>
  //           <Text
  //             maxW={"200px"}
  //             overflow={"hidden"}
  //             whiteSpace={"nowrap"}
  //             textOverflow={"ellipsis"}
  //           >
  //             {item.alasan}
  //           </Text>
  //         </Tooltip>
  //       ),
  //     },
  //     {
  //       value: "-",
  //       td: "-",
  //     },
  //   ],
  // }));

  return (
    <CContainer gap={2}>
      {data.map((item: any, i: number) => (
        <HStack key={i} align={"stretch"}>
          <VStack>
            <Center p={1} borderRadius={"full"} bg={"var(--p500a3)"}>
              <Icon as={RiCircleFill} color={"p.500"} />
            </Center>

            {i !== data.length - 1 && (
              <Box flex={1} w={"1px"} bg={"var(--divider3)"} />
            )}
          </VStack>

          <CContainer px={4} pb={i !== data.length - 1 ? 8 : ""} gap={3}>
            <Text fontWeight={600} fontSize={18}>
              {item.kategori.label}
            </Text>

            <HStack>
              <Text minW={"160px"} opacity={0.6}>
                Tanggal Pengajuan
              </Text>
              <Text>{formatDate(item.created_at)}</Text>
            </HStack>

            <HStack>
              <Text minW={"160px"} opacity={0.6}>
                Tanggal Mulai
              </Text>
              <Text>{formatDate(item.tgl_mulai)}</Text>
            </HStack>

            <HStack>
              <Text minW={"160px"} opacity={0.6}>
                Unit Kerja Asal
              </Text>
              <Text>{item.unit_kerja_asal.nama_unit}</Text>
            </HStack>

            <HStack>
              <Text minW={"160px"} opacity={0.6}>
                Unit Kerja Tujuan
              </Text>
              <Text>{item.unit_kerja_tujuan.nama_unit}</Text>
            </HStack>

            <HStack>
              <Text minW={"160px"} opacity={0.6}>
                Jabatan Asal
              </Text>
              <Text>{item.jabatan_asal.nama_jabatan}</Text>
            </HStack>

            <HStack>
              <Text minW={"160px"} opacity={0.6}>
                Jabatan Tujuan
              </Text>
              <Text>{item.jabatan_tujuan.nama_jabatan}</Text>
            </HStack>

            <HStack align={"start"}>
              <Text minW={"160px"} opacity={0.6}>
                Alasan
              </Text>
              <Text>{item.alasan}</Text>
            </HStack>

            <HStack align={"start"}>
              <Text minW={"160px"} opacity={0.6}>
                Dokumen
              </Text>
              <SmallLink to={item.dokumen}>Lihat</SmallLink>
            </HStack>
          </CContainer>
        </HStack>
      ))}
    </CContainer>
  );
}
