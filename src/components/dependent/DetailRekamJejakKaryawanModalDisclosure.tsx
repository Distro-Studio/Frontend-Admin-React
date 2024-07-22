import {
  Avatar,
  Box,
  BoxProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useRef } from "react";
import { dummyTransferKaryawan } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import formatMasaKerja from "../../lib/formatMasaKerja";
import ComponentSpinner from "../independent/ComponentSpinner";
import NoData from "../independent/NoData";
import CContainer from "../wrapper/CContainer";
import DisclosureHeader from "./DisclosureHeader";
import Retry from "./Retry";
import TabelDetailRekamJejak from "./TabelDetailRekamJejak";

interface Props extends BoxProps {
  karyawan_id: number;
  children?: any;
}
export default function DetailRekamJejakKaryawanModalDisclosure({
  karyawan_id,
  children,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useBackOnClose(
    `detail-rekam-jejak-karyawan-modal-${karyawan_id}`,
    isOpen,
    onOpen,
    onClose
  );
  const initialRef = useRef(null);

  const dummy = {
    nama: "Jolitos Kurniawan",
    foto_profil: "https://bit.ly/dan-abramov",
    jumlah_keluarga: 4,
    tgl_masuk: new Date(),
    tgl_keluar: null,
    masa_kerja: 27,
    rekam_jejak: dummyTransferKaryawan.slice(0, 3),
  };

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummy,
    url: "",
    dependencies: [],
  });

  // SX

  return (
    <>
      <Box onClick={onOpen} {...props}>
        {children}
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        size={"full"}
        scrollBehavior="inside"
        allowPinchZoom
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius={12} minH={"calc(100vh - 32px)"}>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={"Detail Rekam Jejak Karyawan"} />
          </ModalHeader>
          <ModalBody mb={6} className="scrollY">
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
                      <>
                        <CContainer flex={0} borderRadius={12}>
                          {loading && (
                            <ComponentSpinner minH={"400px"} flex={1} />
                          )}

                          {!loading && data && (
                            <>
                              <Wrap
                                align={"center"}
                                spacing={responsiveSpacing}
                                mb={responsiveSpacing}
                              >
                                <Avatar
                                  size={"lg"}
                                  src={data.foto_profil}
                                  name={data.nama}
                                />

                                <VStack align={"stretch"}>
                                  <Text fontSize={14} opacity={0.6}>
                                    Nama Karyawan
                                  </Text>
                                  <Text fontWeight={500}>{data.nama}</Text>
                                </VStack>

                                <VStack align={"stretch"}>
                                  <Text fontSize={14} opacity={0.6}>
                                    Tanggal Masuk
                                  </Text>
                                  <Text fontWeight={500}>
                                    {formatDate(data.tgl_masuk)}
                                  </Text>
                                </VStack>

                                <VStack align={"stretch"}>
                                  <Text fontSize={14} opacity={0.6}>
                                    Tanggal Keluar
                                  </Text>
                                  <Text fontWeight={500}>
                                    {formatDate(data.tgl_keluar)}
                                  </Text>
                                </VStack>

                                <VStack align={"stretch"}>
                                  <Text fontSize={14} opacity={0.6}>
                                    Masa Kerja
                                  </Text>
                                  <Text fontWeight={500}>
                                    {formatMasaKerja(data.masa_kerja)}
                                  </Text>
                                </VStack>
                              </Wrap>

                              <TabelDetailRekamJejak data={data.rekam_jejak} />
                            </>
                          )}
                        </CContainer>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
