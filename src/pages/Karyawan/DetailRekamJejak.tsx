import { Avatar, Box, Text, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import TabelDetailRekamJejak from "../../components/dependent/Karyawan/TabelDetailRekamJejak";
import ComponentSpinner from "../../components/independent/ComponentSpinner";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import formatDate from "../../lib/formatDate";
import formatMasaKerja from "../../lib/formatMasaKerja";

export default function DetailRekamJejak() {
  const dummy = {
    nama: "Jolitos Kurniawan",
    foto_profil: "https://bit.ly/dan-abramov",
    jumlah_keluarga: 4,
    tgl_masuk: new Date(),
    tgl_keluar: null,
    masa_kerja: 27,
    rekam_jejak: [
      {
        id: 1,
        tgl_mulai: "2024-06-01",
        promosi: "Undefined",
        mutasi: "Kepala Ruang",
        penghargaan: "S1 Teknik Sipil",
      },
      {
        id: 2,
        tgl_mulai: "2024-05-16",
        promosi: "Undefined",
        mutasi: "Manager",
        penghargaan: "S1 Teknik Akuntansi",
      },
      {
        id: 3,
        tgl_mulai: "2024-02-12",
        promosi: "Undefined",
        mutasi: "Karlitos Kurniawan",
        penghargaan: "S1 Teknik Elektro",
      },
      {
        id: 3,
        tgl_mulai: "2024-08-23",
        promosi: "Undefined",
        mutasi: "Karlitos Kurniawan",
        penghargaan: "S1 Teknik Hewan",
      },
      {
        id: 3,
        tgl_mulai: "2024-06-06",
        promosi: "Undefined",
        mutasi: "Karlitos Kurniawan",
        penghargaan: "S1 Teknik THT",
      },
    ],
  };

  const [data] = useState<any | null>(dummy);
  const [loading] = useState<boolean>(false);

  // SX

  return (
    <CWrapper>
      <CContainer
        p={responsiveSpacing}
        flex={0}
        bg={useBodyColor()}
        borderRadius={12}
      >
        {loading && <ComponentSpinner minH={"400px"} flex={1} />}

        {!loading && data && (
          <>
            <Wrap
              spacing={responsiveSpacing}
              mb={responsiveSpacing}
              align={"center"}
            >
              <Avatar size={"lg"} src={data.foto_profil} name={data.nama} />

              <Box>
                <Text fontSize={14} opacity={0.6}>
                  Nama Karyawan
                </Text>
                <Text fontWeight={500}>{data.nama}</Text>
              </Box>

              <Box>
                <Text fontSize={14} opacity={0.6}>
                  Tanggal Masuk
                </Text>
                <Text fontWeight={500}>{formatDate(data.tgl_masuk)}</Text>
              </Box>

              <Box>
                <Text fontSize={14} opacity={0.6}>
                  Tanggal Keluar
                </Text>
                <Text fontWeight={500}>{formatDate(data.tgl_keluar)}</Text>
              </Box>

              <Box>
                <Text fontSize={14} opacity={0.6}>
                  Masa Kerja
                </Text>
                <Text fontWeight={500}>{formatMasaKerja(data.masa_kerja)}</Text>
              </Box>
            </Wrap>

            <TabelDetailRekamJejak data={data.rekam_jejak} />
          </>
        )}
      </CContainer>
    </CWrapper>
  );
}
