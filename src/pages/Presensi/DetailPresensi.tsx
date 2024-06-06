import {
  Avatar,
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import ComponentSpinner from "../../components/independent/ComponentSpinner";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing, responsiveSpacing2 } from "../../const/sizes";
import formatDate from "../../lib/formatDate";
import FlexLine from "../../components/independent/FlexLine";
import JenisKaryawanBadge from "../../components/dependent/JenisKaryawanBadge";
import formatTime from "../../lib/formatTime";
import formatDuration from "../../lib/formatDuration";

export default function DetailPresensi() {
  const dummy = {
    id: 1,
    user: {
      id: 1,
      nama: "Very Very Long Name",
      username: "olgaP",
      email_verified_at: null,
      role_id: null,
      foto_profil: null,
      data_completion_step: 1,
      created_at: "2024-05-30T10:26:58.000000Z",
      updated_at: "2024-05-30T10:26:58.000000Z",
    },
    unit_kerja: {
      id: 2,
      nama_unit: "Teknologi Informasi dan Komunikasi (TIK)",
      jenis_karyawan: 1,
      created_at: "2024-04-04T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    jadwal: {
      id: 1,
      nama: "Pagi",
      jam_from: "2024-01-01 06:00:00",
      jam_to: "2024-01-01 15:00:00",
      created_at: "2024-05-30T10:26:59.000000Z",
      updated_at: "2024-05-30T10:26:59.000000Z",
    },
    jam_masuk: "2024-05-06 06:14:14",
    jam_keluar: "2024-05-06 13:27:14",
    durasi: 8 * 3600 + 348,
    lat: "33.749358",
    long: "-84.38842",
    foto: "/reza.jpg",
    absensi: "Izin",
    kategori: "Terlambat",
    created_at: "2024-05-30T10:27:14.000000Z",
    updated_at: "2024-05-30T10:27:14.000000Z",
  };

  const [data] = useState<any | null>(dummy);
  const [loading] = useState<boolean>(false);

  // SX
  const bodyColor = useBodyColor();
  const dataPresensiRef = useRef<HTMLDivElement>(null);

  return (
    <CWrapper>
      {loading && <ComponentSpinner minH={"400px"} flex={1} />}

      <Wrap spacing={responsiveSpacing} align={"stretch"}>
        {!loading && data && (
          <>
            <CContainer
              p={responsiveSpacing}
              flex={"1 1 300px"}
              bg={bodyColor}
              borderRadius={12}
            >
              <HStack flex={1} gap={responsiveSpacing}>
                <Avatar
                  w={"130px"}
                  h={"130px"}
                  size={"xl"}
                  src={data.user.foto_profil}
                  name={data.user.nama}
                />

                <Box>
                  <Text fontWeight={600} fontSize={20} mb={2}>
                    {data.user.nama}
                  </Text>
                  <Text mb={4} opacity={0.6} fontSize={14}>
                    {data.unit_kerja.nama_unit}
                  </Text>
                  <JenisKaryawanBadge data={data.unit_kerja.jenis_karyawan} />
                </Box>
              </HStack>
            </CContainer>

            <CContainer
              p={responsiveSpacing}
              flex={"1 1 350px"}
              bg={bodyColor}
              borderRadius={12}
            >
              <VStack align={"stretch"} gap={0}>
                <Text fontSize={18} fontWeight={600} mb={responsiveSpacing}>
                  Data Jadwal
                </Text>

                <VStack align={"stretch"} gap={3}>
                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Label</Text>
                    <FlexLine />
                    <Text fontWeight={500}>{data.jadwal.nama}</Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Jadwal Masuk</Text>
                    <FlexLine />
                    <Text fontWeight={500}>
                      {formatTime(data.jadwal.jam_from)}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Jadwal Keluar</Text>
                    <FlexLine />
                    <Text fontWeight={500}>
                      {formatTime(data.jadwal.jam_to)}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Tanggal Masuk</Text>
                    <FlexLine />
                    <Text fontWeight={500}>
                      {formatDate(data.jadwal.jam_from, "short")}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Tanggal Keluar</Text>
                    <FlexLine />
                    <Text fontWeight={500}>
                      {formatDate(data.jadwal.jam_to, "short")}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </CContainer>

            <CContainer
              p={responsiveSpacing}
              flex={"1 0 500px"}
              bg={bodyColor}
              borderRadius={12}
            >
              <Wrap spacing={responsiveSpacing2}>
                <Box>
                  <Text fontSize={18} fontWeight={600} mb={responsiveSpacing}>
                    Foto Presensi
                  </Text>

                  <Image
                    aspectRatio={3 / 4}
                    objectFit={"cover"}
                    maxH={dataPresensiRef?.current?.offsetHeight || "312px"}
                    src={data.foto}
                    borderRadius={4}
                  />
                </Box>

                <Box flex={1}>
                  <Text fontSize={18} fontWeight={600} mb={responsiveSpacing}>
                    Data Presensi
                  </Text>

                  <VStack align={"stretch"} gap={3} ref={dataPresensiRef}>
                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Presensi Masuk</Text>
                      <FlexLine />
                      <Text fontWeight={500}>{formatTime(data.jam_masuk)}</Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Presensi Keluar</Text>
                      <FlexLine />
                      <Text fontWeight={500}>
                        {formatTime(data.jam_keluar)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Tanggal Masuk</Text>
                      <FlexLine />
                      <Text fontWeight={500}>
                        {formatDate(data.jam_masuk, "short")}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Tanggal Keluar</Text>
                      <FlexLine />
                      <Text fontWeight={500}>
                        {formatDate(data.jam_keluar, "short")}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Durasi Kerja</Text>
                      <FlexLine />
                      <Text fontWeight={500}>
                        {formatDuration(data.durasi)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Kategori</Text>
                      <FlexLine />
                      <Text fontWeight={500}>{data.kategori || "-"}</Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Absen</Text>
                      <FlexLine />
                      <Text fontWeight={500}>{data.absensi || "-"}</Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Latitude</Text>
                      <FlexLine />
                      <Text fontWeight={500}>{data.lat || "-"}</Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Longitude</Text>
                      <FlexLine />
                      <Text fontWeight={500}>{data.long || "-"}</Text>
                    </HStack>
                  </VStack>
                </Box>
              </Wrap>
            </CContainer>
          </>
        )}
      </Wrap>
    </CWrapper>
  );
}