import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import TabelDetailKeluargaKaryawan from "../../components/dependent/Karyawan/Tabel/TabelDetailKeluargaKaryawan";
import ComponentSpinner from "../../components/independent/ComponentSpinner";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function DetailKeluargaKaryawan() {
  const dummy = {
    nama: "Jolitos Kurniawan",
    foto_profil: "https://bit.ly/dan-abramov",
    jumlah_keluarga: 5,
    keluarga: [
      {
        hubungan: "Ayah",
        nama: "Karlitos Kurniawan",
        pendidikan_terakhir: "S1 Teknik Sipil",
        pekerjaan: "Mandor",
        status_hidup: "Hidup",
        no_hp: "098172637162",
        email: "emailBapak@gmail.com",
      },
      {
        hubungan: "Ibu",
        nama: "Sri Lanxka",
        pendidikan_terakhir: "SMA",
        pekerjaan: "Ibu Rumah Tangga",
        status_hidup: "Hidup",
        no_hp: "09198276334",
        email: "emailIbu@gmail.com",
      },
      {
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
              <Avatar size={"xl"} src={data.foto_profil} name={data.nama} />

              <Box>
                <Text fontSize={14} opacity={0.6}>
                  Nama Karyawan
                </Text>
                <Text fontWeight={500} mb={2}>
                  {data.nama}
                </Text>

                <Text fontSize={14} opacity={0.6}>
                  Jumlah Keluarga
                </Text>
                <Text fontWeight={500}>
                  {data.jumlah_keluarga}{" "}
                  <span style={{ opacity: 0.6 }}>Anggota</span>
                </Text>
              </Box>
            </HStack>

            <TabelDetailKeluargaKaryawan data={data.keluarga} />
          </>
        )}
      </CContainer>
    </CWrapper>
  );
}
