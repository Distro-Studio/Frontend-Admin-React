import {
  Accordion,
  Button,
  ButtonGroup,
  ButtonProps,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiEqualizer3Line } from "@remixicon/react";
import { useRef, useState } from "react";
import { useLightDarkColor } from "../../const/colors";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import formatNumber from "../../lib/formatNumber";
import { iconSize } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import FilterStatusKaryawan from "../dependent/_FilterOptions/FilterStatusKaryawan";
import FilterUnitKerja from "../dependent/_FilterOptions/FilterUnitKerja";
import DisclosureHeader from "../dependent/DisclosureHeader";
import FilterMasaKerja from "../dependent/_FilterOptions/FilterMasaKerja";
import FilterStatusAktif from "../dependent/_FilterOptions/FilterStatusAktif";
import FilterTglMasuk from "../dependent/_FilterOptions/FilterTglMasuk";

interface Props extends ButtonProps {}

export default function FilterKaryawan({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("filter-karyawan", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const { defaultFilterKaryawan, filterKaryawan, setFilterKaryawan } =
    useFilterKaryawan();

  const [localFilterConfig, setLocalFilterConfig] = useState<any | null>(
    defaultFilterKaryawan
  );

  function filterData() {
    setFilterKaryawan(localFilterConfig);
    backOnClose();
  }

  function filterCount(values: any) {
    let count = 0;

    if (values.unit_kerja && values.unit_kerja.length > 0) {
      count += values.unit_kerja.length;
    }
    if (values.status_karyawan && values.status_karyawan.length > 0) {
      count += values.status_karyawan.length;
    }
    if (values.masa_kerja && values.masa_kerja.length > 0) {
      count += values.masa_kerja.length;
    }
    if (values.status_aktif && values.status_aktif.length > 0) {
      count += values.status_aktif.length;
    }
    if (values.tgl_masuk && values.tgl_masuk.length > 0) {
      count += values.tgl_masuk.length;
    }
    return count;
  }

  // SX
  const lightDarkColor = useLightDarkColor();

  // console.log(filterKaryawan);

  return (
    <>
      <Button
        variant={"outline"}
        colorScheme="ap"
        className="clicky"
        rightIcon={<Icon as={RiEqualizer3Line} fontSize={iconSize} />}
        flexShrink={0}
        pr={3}
        onClick={onOpen}
        {...props}
      >
        <HStack>
          {filterCount(filterKaryawan) && (
            <Center
              position={"absolute"}
              right={"-6px"}
              top={"-6px"}
              flexShrink={0}
              minW={"20px"}
              h={"20px"}
              borderRadius={"full"}
              bg={"p.500"}
              ml={"auto"}
            >
              <Text color={lightDarkColor} fontSize={12} fontWeight={600}>
                {formatNumber(filterCount(filterKaryawan))}
              </Text>
            </Center>
          )}

          <Text>Filter</Text>
        </HStack>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
          setLocalFilterConfig(filterKaryawan);
        }}
        initialFocusRef={initialRef}
        isCentered
        // scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent minW={"328px"}>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title="Filter Karyawan" />
          </ModalHeader>

          <ModalBody>
            <Accordion allowToggle>
              <FilterUnitKerja
                filterConfig={localFilterConfig}
                setFilterConfig={setLocalFilterConfig}
              />

              <FilterStatusKaryawan
                filterConfig={localFilterConfig}
                setFilterConfig={setLocalFilterConfig}
              />

              <FilterMasaKerja
                filterConfig={localFilterConfig}
                setFilterConfig={setLocalFilterConfig}
              />

              <FilterStatusAktif
                filterConfig={localFilterConfig}
                setFilterConfig={setLocalFilterConfig}
              />

              <FilterTglMasuk
                filterConfig={localFilterConfig}
                setFilterConfig={setLocalFilterConfig}
              />
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                w={"50%"}
                className="btn-solid clicky"
                onClick={() => {
                  setLocalFilterConfig(defaultFilterKaryawan);
                }}
              >
                Reset
              </Button>

              <Button
                onClick={filterData}
                w={"50%"}
                colorScheme="ap"
                className="btn-ap clicky"
              >
                Terapkan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
