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
import { Dispatch, useRef, useState } from "react";
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

  const [loading, setLoading] = useState<boolean>(false);

  function filterData() {
    setLoading(true);
  }

  //TODO post api filter data karyawan

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
        variant={""}
      >
        <ModalOverlay />

        <ModalContent ref={initialRef}>
          <ModalCloseButton />
          <ModalHeader>Filter</ModalHeader>

          <ModalBody>
            <Accordion allowMultiple>
              <FilterUnitKerja
                filterConfig={filterConfig}
                setFilterConfig={setFilterConfig}
              />

              <FilterStatusKaryawan
                filterConfig={filterConfig}
                setFilterConfig={setFilterConfig}
              />
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
                isDisabled={loading}
              >
                Reset
              </Button>

              <Button
                onClick={filterData}
                isLoading={loading}
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
