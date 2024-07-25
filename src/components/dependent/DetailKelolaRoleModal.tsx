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
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useRef } from "react";
import { dummyDetailKeluargaKaryawan } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";
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
  role_id: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export default function DetailKelolaRoleModal({
  role_id,
  isOpen,
  onOpen,
  onClose,
  ...props
}: Props) {
  useBackOnClose(
    `detail-keluarga-karyawan-modal-${role_id}`,
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
                    <CContainer
                      overflowY={"auto"}
                      className="scrollY"
                      borderRadius={12}
                      flex={1}
                      pb={6}
                    >
                      <Wrap
                        spacing={responsiveSpacing}
                        mb={responsiveSpacing}
                        align={"center"}
                      >
                        <Avatar
                          size={"md"}
                          w={"55px"}
                          h={"55px"}
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
                            {data.jumlah_keluarga || 0}
                          </Text>
                        </VStack>

                        {/* <HStack ml={"auto"}>
                            <Button
                              leftIcon={
                                <Icon as={RiCheckboxFill} fontSize={iconSize} />
                              }
                              pl={5}
                              className="btn-ap clicky"
                              colorScheme="ap"
                            >
                              Persetujuan
                            </Button>
                          </HStack> */}
                      </Wrap>

                      <TabelDetailKeluargaKaryawan data={data.data_keluarga} />
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
