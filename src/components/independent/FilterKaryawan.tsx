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

  //TODO post api filter data karyawan

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <Button
        flex={"1 1 110px"}
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
          {filterKaryawan &&
            ((filterKaryawan.unit_kerja &&
              filterKaryawan.unit_kerja.length > 0) ||
              (filterKaryawan.status_karyawan &&
                filterKaryawan.status_karyawan.length > 0)) && (
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
                  {formatNumber(
                    filterKaryawan.unit_kerja.length +
                      filterKaryawan.status_karyawan.length
                  )}
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
