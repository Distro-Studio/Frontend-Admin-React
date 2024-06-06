import { Avatar, Text, VStack, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import TabelDetailKeluargaKaryawan from "../../components/dependent/Karyawan/Tabel/TabelDetailKeluargaKaryawan";
import ComponentSpinner from "../../components/independent/ComponentSpinner";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { dummyDetailKeluargaKaryawan } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";

export default function DetailKaryawan() {
  const [data] = useState<any | null>(dummyDetailKeluargaKaryawan);
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
              <Avatar
                size={"lg"}
                src={data.user.foto_profil}
                name={data.user.nama}
              />

              <VStack align={"stretch"}>
                <Text fontSize={14} opacity={0.6}>
                  Nama Karyawan
                </Text>
                <Text fontWeight={500}>{data.user.nama}</Text>
              </VStack>

              <VStack align={"stretch"}>
                <Text fontSize={14} opacity={0.6}>
                  Jumlah Keluarga
                </Text>
                <Text fontWeight={500}>
                  {data.data_karyawan.data_keluargas.length} Anggota
                </Text>
              </VStack>
            </Wrap>

            <TabelDetailKeluargaKaryawan
              data={data.data_karyawan.data_keluargas}
            />
          </>
        )}
      </CContainer>
    </CWrapper>
  );
}
