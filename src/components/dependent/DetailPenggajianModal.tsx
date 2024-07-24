import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useLightDarkColor } from "../../const/colors";
import { dummyDetailKaryawan } from "../../const/dummy";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import ComponentSpinner from "../independent/ComponentSpinner";
import NoData from "../independent/NoData";
import CContainer from "../wrapper/CContainer";
import DisclosureHeader from "./DisclosureHeader";
import Retry from "./Retry";

interface Props {
  penggajian_id: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export default function DetailPenggajianModal({
  penggajian_id,
  isOpen,
  onOpen,
  onClose,
}: Props) {
  useBackOnClose(
    `detail-penggajian-modal-${penggajian_id}`,
    isOpen,
    onOpen,
    onClose
  );
  const initialRef = useRef(null);

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyDetailKaryawan,
    url: "",
    dependencies: [],
  });
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string[]>([]);

  useEffect(() => {
    const words = search.split(" ").filter((word) => word.length > 0);
    const modifiedWords = words.reduce((acc: string[], word) => {
      acc.push(word);
      if (word.toLowerCase() === "nomor") {
        acc.push("no.");
      } else if (word.toLowerCase() === "nik") {
        acc.push("no. induk karyawan");
      }
      return acc;
    }, []);
    setSearchQuery(modifiedWords);
  }, [search]);

  // SX
  const lightDarkColor = useLightDarkColor();

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
          <DisclosureHeader title={"Detail Penggajian"} />
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
                    ></CContainer>
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
