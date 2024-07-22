import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { RiCircleFill } from "@remixicon/react";
import formatDate from "../../lib/formatDate";
import CContainer from "../wrapper/CContainer";
import SmallLink from "./SmallLink";
import { responsiveSpacing } from "../../const/sizes";

interface Props {
  data: any;
}

export default function TabelDetailRekamJejak({ data }: Props) {
  return (
    <CContainer
      flex={1}
      overflowY={"auto"}
      className="scrollY"
      pl={"44px"}
      pr={6}
    >
      {data.map((item: any, i: number) => (
        <HStack key={i} align={"stretch"} gap={8}>
          <VStack>
            <Box flex={1} w={"1px"} bg={"var(--divider3)"} />

            <Center p={1} borderRadius={"full"} bg={"var(--p500a3)"}>
              <Icon as={RiCircleFill} color={"p.500"} />
            </Center>

            <Box
              flex={1}
              w={"1px"}
              bg={"var(--divider3)"}
              opacity={i === data.length - 1 ? 0 : 1}
            />
          </VStack>

          <Box
            pt={responsiveSpacing}
            pb={i === data.length - 1 ? 0 : responsiveSpacing}
          >
            <CContainer
              py={4}
              px={5}
              borderRadius={12}
              bg={"var(--divider)"}
              gap={3}
            >
              <Text fontWeight={600} fontSize={18}>
                {item.kategori.label}
              </Text>

              <HStack>
                <Text minW={"160px"} opacity={0.6}>
                  Tanggal Pengajuan
                </Text>
                <Text fontWeight={500}>{formatDate(item.created_at)}</Text>
              </HStack>

              <HStack>
                <Text minW={"160px"} opacity={0.6}>
                  Tanggal Mulai
                </Text>
                <Text fontWeight={500}>{formatDate(item.tgl_mulai)}</Text>
              </HStack>

              <HStack>
                <Text minW={"160px"} opacity={0.6}>
                  Unit Kerja Asal
                </Text>
                <Text fontWeight={500}>{item.unit_kerja_asal.nama_unit}</Text>
              </HStack>

              <HStack>
                <Text minW={"160px"} opacity={0.6}>
                  Unit Kerja Tujuan
                </Text>
                <Text fontWeight={500}>{item.unit_kerja_tujuan.nama_unit}</Text>
              </HStack>

              <HStack>
                <Text minW={"160px"} opacity={0.6}>
                  Jabatan Asal
                </Text>
                <Text fontWeight={500}>{item.jabatan_asal.nama_jabatan}</Text>
              </HStack>

              <HStack>
                <Text minW={"160px"} opacity={0.6}>
                  Jabatan Tujuan
                </Text>
                <Text fontWeight={500}>{item.jabatan_tujuan.nama_jabatan}</Text>
              </HStack>

              <HStack align={"start"}>
                <Text minW={"160px"} opacity={0.6}>
                  Alasan
                </Text>
                <Text fontWeight={500}>{item.alasan}</Text>
              </HStack>

              <HStack align={"start"}>
                <Text minW={"160px"} opacity={0.6}>
                  Dokumen
                </Text>
                <SmallLink to={item.dokumen} className="btn-apa">
                  Lihat
                </SmallLink>
              </HStack>
            </CContainer>
          </Box>
        </HStack>
      ))}
    </CContainer>
  );
}
