import { Avatar, Box, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import TabelDetailKeluargaKaryawan from "../../components/dependent/Karyawan/Tabel/TabelDetailKeluargaKaryawan";
import ComponentSpinner from "../../components/independent/ComponentSpinner";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import { RiEditBoxLine } from "@remixicon/react";

export default function DetailKeluargaKaryawan() {
  const dummy = {
    nama: "Jolitos Kurniawan",
    foto_profil: "https://bit.ly/dan-abramov",
    jumlah_keluarga: 3,
    keluarga: [
      {
        id: 1,
        hubungan: "Ayah",
        nama: "Karlitos Kurniawan",
        pendidikan_terakhir: "S1 Teknik Sipil",
        pekerjaan: "Mandor",
        status_hidup: "Hidup",
        no_hp: "098172637162",
        email: "emailBapak@gmail.com",
      },
      {
        id: 2,
        hubungan: "Ibu",
        nama: "Sri Lanxka",
        pendidikan_terakhir: "SMA",
        pekerjaan: "Ibu Rumah Tangga",
        status_hidup: "Hidup",
        no_hp: "09198276334",
        email: "emailIbu@gmail.com",
      },
      {
        id: 3,
        hubungan: "Anak",
        nama: "Jolitos Junior I",
        pendidikan_terakhir: "SMA",
        pekerjaan: "Pelajar",
        status_hidup: "Hidup",
        no_hp: "08076175623",
        email: "jolijubior@gmail.com",
      },
    ],
  };

  const [data] = useState<any | null>(dummy);
  const [loading] = useState<boolean>(false);

  return (
    <CWrapper>
      <CContainer bg={useBodyColor()} p={responsiveSpacing} borderRadius={12}>
        {loading && <ComponentSpinner minH={"400px"} flex={1} />}

        {!loading && data && (
          <>
            <HStack gap={responsiveSpacing} mb={responsiveSpacing}>
              <Avatar size={"lg"} src={data.foto_profil} name={data.nama} />

              <Box>
                <Text fontSize={14} opacity={0.6}>
                  Nama Karyawan
                </Text>
                <Text fontWeight={500}>{data.nama}</Text>
              </Box>

              <Box>
                <Text fontSize={14} opacity={0.6}>
                  Jumlah Keluarga
                </Text>
                <Text fontWeight={500}>{data.jumlah_keluarga} Anggota</Text>
              </Box>

              <HStack ml={"auto"}>
                <Button
                  leftIcon={<Icon as={RiEditBoxLine} fontSize={iconSize} />}
                  pl={5}
                  pr={6}
                  className="btn-ap clicky"
                  colorScheme="ap"
                >
                  Ubah Data Keluarga
                </Button>
              </HStack>
            </HStack>

            <TabelDetailKeluargaKaryawan data={data.keluarga} />
          </>
        )}
      </CContainer>
    </CWrapper>
  );
}
