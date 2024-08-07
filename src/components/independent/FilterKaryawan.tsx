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
import { RiEqualizer3Fill } from "@remixicon/react";
import { useRef, useState } from "react";
import { useLightDarkColor } from "../../const/colors";
import { iconSize } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import formatNumber from "../../lib/formatNumber";
import FilterMasaKerja from "../dependent/_FilterOptions/FilterMasaKerja";
import FilterStatusAktif from "../dependent/_FilterOptions/FilterStatusAktif";
import FilterStatusKaryawan from "../dependent/_FilterOptions/FilterStatusKaryawan";
import FilterTglMasuk from "../dependent/_FilterOptions/FilterTglMasuk";
import FilterUnitKerja from "../dependent/_FilterOptions/FilterUnitKerja";
import DisclosureHeader from "../dependent/DisclosureHeader";

interface Props extends ButtonProps {
  title?: string;
}

export default function FilterKaryawan({ title, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("filter-karyawan", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const { defaultFilterKaryawan, filterKaryawan, setFilterKaryawan } =
    useFilterKaryawan();

  const [localFilterConfig, setLocalFilterConfig] = useState<any | null>(
    defaultFilterKaryawan
  );

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

  function filterData() {
    setFilterKaryawan(localFilterConfig);
    backOnClose();
  }

  // SX
  const lightDarkColor = useLightDarkColor();

  // console.log(filterKaryawan);

  return (
    <>
      <Button
        // variant={"outline"}
        // colorScheme="ap"
        className="btn-outline clicky"
        _focus={{ border: "1px solid var(--p500)" }}
        leftIcon={
          <Icon
            as={RiEqualizer3Fill}
            fontSize={iconSize}
            // color={chartColors[0]}
            // opacity={0.4}
          />
        }
        flexShrink={0}
        pl={5}
        onClick={() => {
          onOpen();
          setLocalFilterConfig(filterKaryawan);
        }}
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
        onClose={backOnClose}
        initialFocusRef={initialRef}
        isCentered
        size={"lg"}
        // scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent minW={"328px"}>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={title || "Filter Karyawan"} />
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
                Clear
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
