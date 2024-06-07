import {
  Avatar,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import JenisKaryawanBadge from "../../components/dependent/JenisKaryawanBadge";
import ComponentSpinner from "../../components/independent/ComponentSpinner";
import FlexLine from "../../components/independent/FlexLine";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { dummyDetailKaryawan } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";
import formatDate from "../../lib/formatDate";
import formatMasaKerja from "../../lib/formatMasaKerja";
import formatNumber from "../../lib/formatNumber";
import SImpleLink from "../../components/dependent/SImpleLink";
export default function DetailKaryawan() {
  const [data] = useState<any | null>(dummyDetailKaryawan);
  const [loading] = useState<boolean>(false);

  // SX
  const bodyColor = useBodyColor();

  return (
    <CWrapper>
      {loading && <ComponentSpinner minH={"400px"} flex={1} />}

      <Wrap spacing={responsiveSpacing} align={"stretch"}>
        {!loading && data && (
          <>
            <CContainer
              p={responsiveSpacing}
              flex={"1 1 350px"}
              bg={bodyColor}
              borderRadius={12}
            >
              <VStack flex={1}>
                <Avatar
                  w={"250px"}
                  h={"250px"}
                  size={"xxl"}
                  fontSize={"80px !important"}
                  src={data.user.foto_profil}
                  name={data.user.nama}
                  mb={2}
                />

                <Text
                  fontWeight={600}
                  fontSize={22}
                  maxW={"280px"}
                  textAlign={"center"}
                  mb={1}
                >
                  {data.user.nama}
                </Text>

                <JenisKaryawanBadge
                  data={data.unit_kerja.jenis_karyawan}
                  mb={responsiveSpacing}
                />

                <VStack align={"stretch"} w={"100%"} gap={4}>
                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>No. Induk Karyawan</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.nik}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>NIK KTP</Text>
                    <FlexLine />
                    <HStack>
                      <SImpleLink to="#">Lihat</SImpleLink>
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.nik_ktp}
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>No. KK</Text>
                    <FlexLine />
                    <HStack>
                      <SImpleLink to="#">Lihat</SImpleLink>
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.no_kk}
                      </Text>
                    </HStack>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>No. HP</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.no_hp}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Email</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.email}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Tempat Lahir</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.tempat_lahir}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Tanggal Lahir</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {formatDate(data.tgl_lahir)}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Jenis Kelamin</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.jenis_kelamin.toLowerCase() === "p"
                        ? "Perempuan"
                        : "Laki - laki"}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Agama</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.agama}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Gelar Depan</Text>
                    <FlexLine />
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.gelar_depan}
                    </Text>
                  </HStack>

                  <HStack justify={"space-between"}>
                    <Text opacity={0.6}>Alamat</Text>
                    <FlexLine />
                    <Popover>
                      <PopoverTrigger>
                        <Text
                          fontWeight={500}
                          noOfLines={1}
                          maxW={"180px"}
                          cursor={"pointer"}
                        >
                          {data.alamat}
                        </Text>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            <Text fontWeight={500} textAlign={"right"}>
                              {data.alamat}
                            </Text>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </Popover>
                  </HStack>
                </VStack>
              </VStack>
            </CContainer>

            <Wrap
              flex={"1 1 350px"}
              spacing={responsiveSpacing}
              align={"center"}
            >
              <CContainer
                p={responsiveSpacing}
                bg={bodyColor}
                borderRadius={12}
              >
                <VStack align={"stretch"} gap={0}>
                  <Text fontSize={20} fontWeight={600} mb={responsiveSpacing}>
                    Data Kesehatan
                  </Text>

                  <VStack align={"stretch"} gap={4}>
                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>No. Rekam Medis</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.no_rm}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>No. Manulife</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.no_manulife}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>No. BPJS Kesehatan</Text>
                      <FlexLine />
                      <HStack>
                        <SImpleLink to="#">Lihat</SImpleLink>
                        <Text fontWeight={500} textAlign={"right"}>
                          {data.no_bpjsksh}
                        </Text>
                      </HStack>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>No. BPJS Ketenagakerjaan</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.no_bpjsktk}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Tinggi Badan</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.tinggi_badan} cm
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Berat Badan</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.berat_badan} kg
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Golongan Darah</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.golongan_darah}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </CContainer>

              <CContainer
                flex={"1 1 350px"}
                p={responsiveSpacing}
                bg={bodyColor}
                borderRadius={12}
              >
                <VStack align={"stretch"} gap={0}>
                  <Text fontSize={20} fontWeight={600} mb={responsiveSpacing}>
                    Data Pekerjaan
                  </Text>

                  <VStack align={"stretch"} gap={4}>
                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Tanggal Masuk</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {formatDate(data.tgl_masuk)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Tanggal Keluar</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {formatDate(data.tgl_keluar)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Tanggal Diangkat</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {formatDate(data.tgl_diangkat)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Masa Kerja</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {formatMasaKerja(data.masa_kerja)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Unit Kerja</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.unit_kerja.nama_unit}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Jabatan</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.jabatan.nama_jabatan}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Kompetensi</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.kompetensi.nama_kompetensi}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Status Karyawan</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {data.status_karyawan}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Tanggal Berakhir PKS</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {formatDate(data.tgl_berakhir_pks)}
                      </Text>
                    </HStack>

                    <HStack justify={"space-between"}>
                      <Text opacity={0.6}>Masa Diklat</Text>
                      <FlexLine />
                      <Text fontWeight={500} textAlign={"right"}>
                        {formatMasaKerja(data.masa_diklat)}
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </CContainer>
            </Wrap>

            <CContainer
              p={responsiveSpacing}
              flex={"1 0 350px"}
              bg={bodyColor}
              borderRadius={12}
            >
              <Text fontSize={20} fontWeight={600} mb={responsiveSpacing}>
                Data Pendidikan dan Sertifikat
              </Text>

              <VStack align={"stretch"} gap={4}>
                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>No. Ijazah</Text>
                  <FlexLine />
                  <HStack>
                    <SImpleLink to="#">Lihat</SImpleLink>
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.no_ijazah}
                    </Text>
                  </HStack>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Tahun Lulus</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    {data.tahun_lulus}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>No. STR</Text>
                  <FlexLine />
                  <HStack>
                    <SImpleLink to="#">Lihat</SImpleLink>
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.no_str}
                    </Text>
                  </HStack>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Masa Berlaku STR</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    {formatDate(data.masa_berlaku_str)}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>No. SIP</Text>
                  <FlexLine />
                  <HStack>
                    <SImpleLink to="#">Lihat</SImpleLink>
                    <Text fontWeight={500} textAlign={"right"}>
                      {data.no_sip}
                    </Text>
                  </HStack>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Masa Berlaku SIP</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    {formatDate(data.masa_berlaku_sip)}
                  </Text>
                </HStack>
              </VStack>
            </CContainer>

            <CContainer
              p={responsiveSpacing}
              flex={"1 0 350px"}
              bg={bodyColor}
              borderRadius={12}
            >
              <Text fontSize={20} fontWeight={600} mb={responsiveSpacing}>
                Data Keuangan
              </Text>

              <VStack align={"stretch"} gap={4}>
                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Kelompok Gaji</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    {data.kelompok_gaji.nama_kelompok}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Gaji</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    Rp {formatNumber(data.kelompok_gaji.besaran_gaji)}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>NPWP</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    {data.npwp}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>No. Rekening</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    {data.no_rekening}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Kode PTKP</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    {data.ptkp.kode_ptkp}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Uang Makan</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    Rp {formatNumber(data.uang_makan)}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Uang Lembur</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    Rp {formatNumber(data.uang_lembur)}
                  </Text>
                </HStack>
              </VStack>
            </CContainer>

            <CContainer
              p={responsiveSpacing}
              flex={"1 0 350px"}
              bg={bodyColor}
              borderRadius={12}
            >
              <Text fontSize={20} fontWeight={600} mb={responsiveSpacing}>
                Data Tunjangan
              </Text>

              <VStack align={"stretch"} gap={4}>
                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Jabatan</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    Rp {formatNumber(data.tunjangan_jabatan)}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Fungsional</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    Rp {formatNumber(data.tunjangan_fungsional)}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Khusus</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    Rp {formatNumber(data.tunjangan_khusus)}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text opacity={0.6}>Lainnya</Text>
                  <FlexLine />
                  <Text fontWeight={500} textAlign={"right"}>
                    Rp {formatNumber(data.tunjangan_lainnya)}
                  </Text>
                </HStack>
              </VStack>
            </CContainer>
          </>
        )}
      </Wrap>
    </CWrapper>
  );
}
