import {
  Badge,
  Button,
  ButtonGroup,
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
  Wrap,
} from "@chakra-ui/react";
import { RiLayoutColumnLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useTabelKaryawanColumns from "../../global/useTabelKaryawanColumns";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import CContainer from "../wrapper/CContainer";

interface Props extends ButtonProps {
  title?: string;
}

export default function TabelKaryawanColumnConfigModal({
  title,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useBackOnClose(`table-column-config-modal`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const { tabelKaryawanColumns, setTabelKaryawanColumns } =
    useTabelKaryawanColumns();
  const [selected, setSelected] = useState<number[]>([]);

  const allColumns = [
    { column: "nama", label: "Nama" },
    { column: "nik", label: "Nik" },
    { column: "no_rm", label: "No. Rekam Medis" },
    { column: "unit_kerja", label: "Unit Kerja" },
    { column: "status_karyawan", label: "Status Karyawan" },
    { column: "email", label: "Email" },
    { column: "username", label: "Username" },
    { column: "status_aktif", label: "Status Aktif" },
    { column: "ayah", label: "Ayah" },
    { column: "ibu", label: "Ibu" },
    { column: "jumlah_keluarga", label: "Jumlah Keluarga" },
    { column: "tgl_masuk", label: "Tanggal Masuk" },
    { column: "tgl_keluar", label: "Tanggal Keluar" },
    { column: "masa_kerja", label: "Masa Kerja" },
    { column: "promosi", label: "Promosi" },
    { column: "mutasi", label: "Mutasi" },
  ];
  const presetColumn = [
    {
      label: "Semua Kolom",
      columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      label: "Karyawan",
      columns: [0, 1, 2, 3, 4],
    },
    {
      label: "Akun",
      columns: [0, 1, 5, 6, 7],
    },
    {
      label: "Keluarga",
      columns: [0, 8, 9, 10],
    },
    {
      label: "Pekerja Kontrak",
      columns: [0, 3, 11, 12, 7],
    },
    {
      label: "Rekam Jejak",
      columns: [0, 11, 12, 13, 14, 15],
    },
  ];

  // SX

  return (
    <>
      <Button
        className="btn-outline clicky"
        leftIcon={<Icon as={RiLayoutColumnLine} fontSize={iconSize} />}
        _focus={{ border: "1px solid var(--p500)" }}
        flexShrink={0}
        pl={5}
        pr={6}
        onClick={() => {
          onOpen();
          setSelected(tabelKaryawanColumns);
        }}
        {...props}
      >
        Kolom
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        // scrollBehavior="inside"
        allowPinchZoom
        size={"full"}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={12}
          minH={"fit-content"}
          maxH={"calc(100vh - 32px)"}
        >
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={title || "Kolom Tabel Config"} />
          </ModalHeader>

          <ModalBody className="scrollY">
            <Wrap spacing={responsiveSpacing}>
              <CContainer flex={"1 1 300px"}>
                <Text fontWeight={500} mb={4} opacity={0.6}>
                  Kolom
                </Text>
                <SimpleGrid columns={[3]} gap={2}>
                  {allColumns.map((option, i) => {
                    const ok = i !== 0;
                    return (
                      ok && (
                        <Button
                          key={i}
                          // flex={"1 1 0"}
                          // minW={"max-content"}
                          // borderRadius={"full"}
                          fontWeight={500}
                          className={"btn-outline clicky"}
                          borderColor={
                            selected && selected.some((item) => item === i)
                              ? "var(--p500a2)"
                              : ""
                          }
                          bg={
                            selected && selected.some((item) => item === i)
                              ? "var(--p500a5) !important"
                              : ""
                          }
                          onClick={() => {
                            const isSelected =
                              selected && selected.some((item) => item === i);
                            let newSelected = selected || [];

                            if (isSelected) {
                              // Filter out the option if it's already selected
                              newSelected = newSelected.filter(
                                (item) => item !== i
                              );
                            } else {
                              // Add the option to the selected array
                              newSelected = [...newSelected, i];
                            }

                            setSelected(newSelected);
                          }}
                        >
                          <Text
                            opacity={
                              selected && selected.some((item) => item === i)
                                ? 1
                                : 0.6
                            }
                          >
                            {option.label}
                          </Text>
                        </Button>
                      )
                    );
                  })}
                </SimpleGrid>
              </CContainer>

              <CContainer flex={"1 1 300px"}>
                <Text fontWeight={500} mb={4} opacity={0.6}>
                  Preset Kolom
                </Text>
                <SimpleGrid columns={[1, 2, 3]} gap={2}>
                  {presetColumn.map((preset, i) => (
                    <Button
                      key={i}
                      // borderRadius={"full"}
                      className="btn-solid clicky"
                      onClick={() => {
                        setSelected(preset.columns);
                      }}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </SimpleGrid>

                <Text
                  fontWeight={500}
                  mt={responsiveSpacing}
                  mb={4}
                  opacity={0.6}
                >
                  Urutan Kolom (dari kiri ke kanan)
                </Text>
                <Wrap>
                  {selected.length === 0 && (
                    <Text opacity={0.4}>Tidak ada kolom yang dipilih</Text>
                  )}
                  {selected.map((columnIndex, i) => (
                    <Badge
                      textTransform={"none"}
                      bg={"var(--p500a5)"}
                      color={"p.500"}
                      // border={"1px solid var(--p500a2)"}
                      fontWeight={450}
                      fontSize={"md"}
                      key={i}
                    >
                      {allColumns[columnIndex].label}
                    </Badge>
                  ))}
                </Wrap>
              </CContainer>
            </Wrap>
          </ModalBody>

          <ModalFooter>
            <CContainer>
              <ButtonGroup>
                <Button
                  w={"100%"}
                  className="btn-solid clicky"
                  onClick={() => {
                    setSelected([0]);
                  }}
                >
                  Clear
                </Button>
                <Button
                  w={"100%"}
                  className="btn-ap clicky"
                  colorScheme="ap"
                  isDisabled={selected.length < 2}
                  onClick={() => {
                    setTabelKaryawanColumns(selected);
                    backOnClose();
                  }}
                >
                  Terapkan
                </Button>
              </ButtonGroup>
            </CContainer>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
