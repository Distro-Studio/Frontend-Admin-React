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
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { RiLayoutColumnLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { iconSize } from "../../const/sizes";
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
        pl={"18px !important"}
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
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius={12}>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={title || "Kolom Tabel Config"} />
          </ModalHeader>

          <ModalBody className="scrollY">
            <Text fontWeight={500} mb={2} opacity={0.4}>
              Preset Kolom
            </Text>
            <Wrap gap={2}>
              {presetColumn.map((preset, i) => (
                <Button
                  key={i}
                  borderRadius={"full"}
                  className="btn-solid clicky"
                  onClick={() => {
                    setSelected(preset.columns);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </Wrap>

            <Text fontWeight={500} mt={4} mb={2} opacity={0.4}>
              Kolom
            </Text>
            <Wrap>
              {allColumns.map((option, i) => {
                const ok = i !== 0;
                return (
                  ok && (
                    <Button
                      key={i}
                      borderRadius={"full"}
                      className={"btn-outline clicky"}
                      borderColor={
                        selected && selected.some((item) => item === i)
                          ? "var(--p500a2)"
                          : ""
                      }
                      bg={
                        selected && selected.some((item) => item === i)
                          ? "var(--p500a4) !important"
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
                      {option.label}
                    </Button>
                  )
                );
              })}
            </Wrap>
          </ModalBody>

          <ModalFooter>
            <CContainer>
              <Text fontWeight={500} mb={2} opacity={0.4}>
                Urutan Kolom (dari kiri ke kanan)
              </Text>
              <Wrap>
                {selected.length === 0 && (
                  <Text opacity={0.4}>Tidak ada kolom yang dipilih</Text>
                )}
                {selected.map((columnIndex, i) => (
                  <Badge
                    textTransform={"none"}
                    bg={"var(--divider)"}
                    fontWeight={400}
                    key={i}
                  >
                    {allColumns[columnIndex].label}
                  </Badge>
                ))}
              </Wrap>

              <ButtonGroup mt={6}>
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
                  isDisabled={selected.length === 0}
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
