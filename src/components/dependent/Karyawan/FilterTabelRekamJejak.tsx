import {
  Accordion,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiEqualizer3Line } from "@remixicon/react";
import { Dispatch, useRef, useState } from "react";
import { useBodyColor } from "../../../const/colors";
import { iconSize } from "../../../const/sizes";
import backOnClose from "../../../lib/backOnClose";
import formatNumber from "../../../lib/formatNumber";
import useBackOnClose from "../../../lib/useBackOnClose";
import FilterMasaKerja from "./FilterOptions/FilterMasaKerja";

interface Props {
  defaultFilterConfig: any;
  filterConfig: any;
  setFilterConfig: Dispatch<any>;
}

export default function FilterTabelRekamJejak({
  defaultFilterConfig,
  filterConfig,
  setFilterConfig,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const [localFilterConfig, setLocalFilterConfig] = useState<any | null>(
    defaultFilterConfig
  );

  function filterData() {
    setFilterConfig(localFilterConfig);
    backOnClose(onClose);
  }

  // SX
  const bodyColor = useBodyColor();
  const adaFilter =
    filterConfig &&
    ((filterConfig.masa_kerja && filterConfig.masa_kerja.length > 0) ||
      (filterConfig.promosi && filterConfig.promosi.length > 0));

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
      >
        <HStack>
          {adaFilter && (
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
              <Text color={bodyColor} fontSize={12} fontWeight={600}>
                {formatNumber(
                  filterConfig.masa_kerja.length + filterConfig.promosi.length
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
          backOnClose(onClose);
          setLocalFilterConfig(defaultFilterConfig);
        }}
        initialFocusRef={initialRef}
        isCentered
        scrollBehavior="inside"
        variant={""}
      >
        <ModalOverlay />

        <ModalContent ref={initialRef} minW={"328px"}>
          <ModalCloseButton />
          <ModalHeader>Filter</ModalHeader>

          <ModalBody>
            <Accordion allowMultiple>
              <FilterMasaKerja
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
                  setLocalFilterConfig(defaultFilterConfig);
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
