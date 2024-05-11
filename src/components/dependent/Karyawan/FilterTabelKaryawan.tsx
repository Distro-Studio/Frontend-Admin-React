import {
  Accordion,
  Button,
  ButtonGroup,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiEqualizer3Line } from "@remixicon/react";
import { Dispatch, useRef } from "react";
import { iconSize } from "../../../const/sizes";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FilterStatusKaryawan from "./FilterStatusKaryawan";
import FilterUnitKerja from "./FilterUnitKerja";

interface Props {
  filterConfig: any;
  setFilterConfig: Dispatch<any>;
}

export default function FilterTabelKaryawan({
  filterConfig,
  setFilterConfig,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

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
        Filter
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent ref={initialRef}>
          <ModalCloseButton />
          <ModalHeader>Filter</ModalHeader>

          <ModalBody>
            <Accordion allowToggle>
              <form id="filterKaryawanForm">
                <FilterUnitKerja
                  filterConfig={filterConfig}
                  setFilterConfig={setFilterConfig}
                />

                <FilterStatusKaryawan
                  filterConfig={filterConfig}
                  setFilterConfig={setFilterConfig}
                />
              </form>
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                w={"50%"}
                className="btn-solid clicky"
                onClick={() => {
                  setFilterConfig({
                    search: "",
                    unit_kerja: null,
                    status_karyawan: null,
                  });
                }}
              >
                Reset
              </Button>
              <Button w={"50%"} colorScheme="ap" className="btn-ap clicky">
                Terapkan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
