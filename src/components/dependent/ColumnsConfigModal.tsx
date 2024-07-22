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
import DisclosureHeader from "./DisclosureHeader";
import CContainer from "../wrapper/CContainer";
import { Interface__ColumnConfig } from "../../const/interfaces";
import NoData from "../independent/NoData";

interface Props extends ButtonProps {
  id: string;
  defaultColumns: number[];
  tableColumns: number[];
  setTableColumns: (tableColumns: number[]) => void;
  allColumns: Interface__ColumnConfig[];
  presetColumns?: { label: string; columns: number[] }[];
  title?: string;
}

export default function ColumnsConfigModal({
  id,
  defaultColumns,
  tableColumns,
  setTableColumns,
  allColumns,
  presetColumns,
  title,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useBackOnClose(id, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const [selected, setSelected] = useState<number[]>([]);

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
          setSelected(tableColumns);
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
        size={"xxl"}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius={12}>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={title || "Config Kolom Tabel"} />
          </ModalHeader>

          <ModalBody className="scrollY">
            <Wrap spacing={responsiveSpacing}>
              <CContainer flex={"1 1 300px"}>
                <Text fontWeight={500} mb={4} opacity={0.6}>
                  Kolom
                </Text>
                <SimpleGrid columns={[1, 2, null, 3]} gap={2}>
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
                {presetColumns && (
                  <SimpleGrid columns={[1, 2, 3]} gap={2}>
                    {presetColumns.map((preset, i) => (
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
                )}

                {!presetColumns && <NoData label="Tidak ada preset" />}

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
                    setSelected(defaultColumns);
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
                    setTableColumns(selected);
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
