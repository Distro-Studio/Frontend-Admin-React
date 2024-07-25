import {
  Box,
  BoxProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { dummyDetailKeluargaKaryawan } from "../../const/dummy";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import PengaturanKeizinan from "../../pages/Pengaturan/PengaturanKeizinan";
import ComponentSpinner from "../independent/ComponentSpinner";
import NoData from "../independent/NoData";
import CContainer from "../wrapper/CContainer";
import DisclosureHeader from "./DisclosureHeader";
import Retry from "./Retry";

interface Props extends BoxProps {
  role_id: number;
  role_name: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export default function DetailKelolaRoleModal({
  role_id,
  role_name,
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
                      overflowY={"auto"}
                      className="scrollY"
                      borderRadius={12}
                      flex={1}
                      pb={6}
                    >
                      <PengaturanKeizinan
                        role_id={role_id}
                        role_name={role_name}
                      />
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
