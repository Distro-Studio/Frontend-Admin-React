import {
  Box,
  Button,
  ButtonProps,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLayoutColumnLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { iconSize } from "../../const/sizes";
import useHideTableColumn from "../../global/useHiddenTableColumns";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import SearchComponent from "../dependent/input/SearchComponent";

interface Props extends ButtonProps {
  title?: string;
}

export default function TableColumnConfigModal({ title, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useBackOnClose(`table-column-config-modal`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const presetColumn = [
    {
      label: "Akun",
      columns: ["nik", "email", "username", "status_aktif"],
    },
    {
      label: "Keluarga",
      columns: ["nik", "email", "username", "status_aktif"],
    },
    {
      label: "Pekerja Kontrak",
      columns: ["nik", "email", "username", "status_aktif"],
    },
    {
      label: "Rekam Jejak",
      columns: ["nik", "email", "username", "status_aktif"],
    },
  ];

  const { hiddenTableColumns, setHiddenTableColumns } = useHideTableColumn();
  const [search, setSearch] = useState("");

  // SX

  return (
    <>
      <Button
        className="btn-outline clicky"
        leftIcon={<Icon as={RiLayoutColumnLine} fontSize={iconSize} />}
        _focus={{ border: "1px solid var(--p500)" }}
        flexShrink={0}
        pl={"18px !important"}
        onClick={onOpen}
        {...props}
      >
        Kolom
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        scrollBehavior="inside"
        allowPinchZoom
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius={12}>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={title || "Kolom Tabel Config"} />
            <Box px={6} mb={6}>
              <SearchComponent
                name="column-search"
                onChangeSetter={(input) => {
                  setSearch(input ? input : "");
                }}
                inputValue={search}
              />
            </Box>
          </ModalHeader>
          <ModalBody>
            <Text fontWeight={500} mb={2}>
              Preset Kolom
            </Text>
            <SimpleGrid columns={[1, 2]} gap={2}>
              {presetColumn.map((preset, i) => (
                <Button
                  key={i}
                  borderRadius={"full"}
                  className="btn-outline clicky"
                  onClick={() => {
                    setHiddenTableColumns(preset.columns);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </SimpleGrid>

            <Text fontWeight={500} mt={4} mb={2}>
              Kolom
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} className="btn-ap clicky" colorScheme="ap">
              Terapkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
