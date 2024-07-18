import {
  Avatar,
  Box,
  BoxProps,
  Button,
  HStack,
  Icon,
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
import { RiErrorWarningFill } from "@remixicon/react";
import { useRef } from "react";
import { dummyDetailKeluargaKaryawan } from "../../const/dummy";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import ComponentSpinner from "../independent/ComponentSpinner";
import NoData from "../independent/NoData";
import CContainer from "../wrapper/CContainer";
import DisclosureHeader from "./DisclosureHeader";
import Retry from "./Retry";
import TabelDetailKeluargaKaryawan from "./TabelDetailKeluargaKaryawan";

interface Props extends BoxProps {
  karyawan_id: number;

  children?: any;
}
export default function DetailKeluargaKaryawanModalDisclosure({
  karyawan_id,

  children,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useBackOnClose(
    `detail-keluarga-karyawan-modal-${karyawan_id}`,
    isOpen,
    onOpen,
    onClose
  );
  const initialRef = useRef(null);

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyDetailKeluargaKaryawan,
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
            <DisclosureHeader title={"Detail Keluarga Karyawan"} />
          </ModalHeader>
          <ModalBody>
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
                        <CContainer borderRadius={12}>
                          {loading && (
                            <ComponentSpinner minH={"400px"} flex={1} />
                          )}

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
                                    {data.data_karyawan.data_keluargas.length}{" "}
                                    Anggota
                                  </Text>
                                </VStack>

                                <HStack ml={"auto"}>
                                  <Button
                                    leftIcon={
                                      <Icon
                                        as={RiErrorWarningFill}
                                        fontSize={iconSize}
                                      />
                                    }
                                    pl={5}
                                    pr={6}
                                    className="btn-ap clicky"
                                    colorScheme="ap"
                                  >
                                    Persetujuan
                                  </Button>
                                </HStack>
                              </Wrap>

                              <TabelDetailKeluargaKaryawan
                                data={data.data_karyawan.data_keluargas}
                              />
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