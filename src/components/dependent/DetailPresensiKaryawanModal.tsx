import {
  Avatar,
  Box,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiCircleFill } from "@remixicon/react";
import { useRef } from "react";
import { responsiveSpacing } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import formatDuration from "../../lib/formatDuration";
import formatTime from "../../lib/formatTime";
import ComponentSpinner from "../independent/ComponentSpinner";
import FlexLine from "../independent/FlexLine";
import NoData from "../independent/NoData";
import CContainer from "../wrapper/CContainer";
import BooleanBadge from "./BooleanBadge";
import DetailKaryawanModalDisclosure from "./DetailKaryawanModalDisclosure";
import DisclosureHeader from "./DisclosureHeader";
import LokasiPresensi from "./LokasiPresensi";
import Retry from "./Retry";

interface Props {
  presensi_id: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export default function DetailPresensiKaryawanModal({
  presensi_id,
  isOpen,
  onOpen,
  onClose,
}: Props) {
  useBackOnClose(
    `detail-presensi-karyawan-modal-${presensi_id}`,
    isOpen,
    onOpen,
    onClose
  );
  const initialRef = useRef(null);

  const dummy = {
    id: 1,
    user: {
      id: 1,
      nama: "Very Very Long Name",
      username: "olgaP",
      email_verified_at: null,
      role_id: null,
      foto_profil: null,
      status_aktif: true,
      data_completion_step: 1,
      created_at: "2024-05-30T10:26:58.000000Z",
      updated_at: "2024-05-30T10:26:58.000000Z",
    },
    unit_kerja: {
      id: 2,
      nama_unit: "Dokter Bedah Neurologi",
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
    foto_masuk: "/reza.jpg",
    foto_keluar: "/reza.jpg",
    absensi: "Izin",
    kategori: "Terlambat",
    created_at: "2024-05-30T10:27:14.000000Z",
    updated_at: "2024-05-30T10:27:14.000000Z",
  };

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummy,
    url: "",
    dependencies: [presensi_id],
  });

  // SX

  return (
    <Modal
      isOpen={isOpen}
      onClose={backOnClose}
      initialFocusRef={initialRef}
      size={"full"}
      scrollBehavior="inside"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius={12} minH={"calc(100vh - 32px)"}>
        <ModalHeader ref={initialRef}>
          <DisclosureHeader title={"Detail Presensi Karyawan"} />
        </ModalHeader>
        <ModalBody px={0}>
          {error && (
            <Box my={"auto"}>
              <Retry loading={loading} retry={retry} />
            </Box>
          )}
          {!error && (
            <>
              {loading && (
                <>
                  <ComponentSpinner />
                </>
              )}
              {!loading && (
                <>
                  {(!data || (data && data.length === 0)) && <NoData />}

                  {(data || (data && data.length > 0)) && (
                    <CContainer
                      h={"calc(100vh - 70px)"}
                      overflowY={"auto"}
                      className="scrollY"
                    >
                      <SimpleGrid
                        columns={[1, null, null, 2]}
                        flex={1}
                        overflowY={"auto"}
                        className="scrollY"
                        mb={responsiveSpacing}
                      >
                        <CContainer
                          gap={responsiveSpacing}
                          overflowY={[null, null, null, "auto"]}
                          className="scrollY"
                          px={responsiveSpacing}
                        >
                          <VStack
                            gap={responsiveSpacing}
                            borderRadius={12}
                            align={"center"}
                            my={"auto"}
                          >
                            <DetailKaryawanModalDisclosure
                              karyawan_id={data.user.id}
                            >
                              <Avatar
                                w={"200px"}
                                h={"200px"}
                                size={"xxl"}
                                fontSize={"64px !important"}
                                src={data.user.foto_profil}
                                name={data.user.nama}
                              />
                            </DetailKaryawanModalDisclosure>

                            <VStack gap={1}>
                              <Text
                                fontWeight={700}
                                fontSize={32}
                                lineHeight={1.3}
                              >
                                {data.user.nama}
                              </Text>

                              <HStack mb={2}>
                                <HStack opacity={0.6}>
                                  <Text>{data.email}</Text>
                                  <Icon
                                    as={RiCircleFill}
                                    fontSize={8}
                                    opacity={0.4}
                                  />
                                  <Text>{data.unit_kerja.nama_unit}</Text>
                                </HStack>
                              </HStack>

                              <HStack>
                                <BooleanBadge
                                  w={"fit-content"}
                                  borderRadius={"full"}
                                  data={data.user.status_aktif}
                                  trueValue="Aktif"
                                  falseValue="Tidak Aktif"
                                  fontSize={13}
                                />
                              </HStack>
                            </VStack>
                          </VStack>
                        </CContainer>

                        <CContainer
                          gap={responsiveSpacing}
                          overflowY={[null, null, null, "auto"]}
                          className="scrollY"
                          px={responsiveSpacing}
                        >
                          <Box>
                            <Text fontSize={20} fontWeight={600} mb={4}>
                              Data Jadwal
                            </Text>

                            <CContainer gap={4}>
                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Label</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.jadwal.nama}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Tanggal Masuk</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatDate(data.jadwal.jam_from, "short")}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Jadwal Masuk</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatTime(data.jadwal.jam_from)}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Jadwal Keluar</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatTime(data.jadwal.jam_to)}
                                </Text>
                              </HStack>
                            </CContainer>
                          </Box>

                          <Box>
                            <Text fontSize={20} fontWeight={600} mb={4}>
                              Data Presensi
                            </Text>

                            <CContainer gap={4}>
                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Presensi Masuk</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatTime(data.jam_masuk)}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Presensi Keluar</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatTime(data.jam_keluar)}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Tanggal Masuk</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatDate(data.jam_masuk, "short")}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Tanggal Keluar</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatDate(data.jam_keluar, "short")}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Durasi Kerja</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatDuration(data.durasi)}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Kategori</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.kategori || "-"}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Absen</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.absensi || "-"}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Latitude</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.lat || "-"}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                <Text opacity={0.6}>Longitude</Text>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.long || "-"}
                                </Text>
                              </HStack>
                            </CContainer>
                          </Box>

                          <Box flex={"1 1 200px"}>
                            <Text fontSize={20} fontWeight={600} mb={4}>
                              Lokasi Presensi
                            </Text>

                            <LokasiPresensi
                              center={{ lat: data.lat, lng: data.long }}
                              officeCenter={{
                                lat: data.lat,
                                lng: data.long,
                              }}
                              presence_radius={100}
                            />
                          </Box>

                          <Box flex={"1 1 200px"}>
                            <Text fontSize={20} fontWeight={600} mb={4}>
                              Foto Presensi Masuk
                            </Text>

                            <Image
                              src={
                                data.foto_masuk ||
                                "/images/defaultProfilePhoto.webp"
                              }
                              borderRadius={12}
                              aspectRatio={1}
                              objectFit={"cover"}
                            />
                          </Box>

                          <Box flex={"1 1 200px"}>
                            <Text fontSize={20} fontWeight={600} mb={4}>
                              Foto Presensi Keluar
                            </Text>

                            <Image
                              src={
                                data.foto_keluar ||
                                "/images/defaultProfilePhoto.webp"
                              }
                              borderRadius={12}
                              aspectRatio={1}
                              objectFit={"cover"}
                            />
                          </Box>
                        </CContainer>
                      </SimpleGrid>
                    </CContainer>
                  )}
                </>
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
