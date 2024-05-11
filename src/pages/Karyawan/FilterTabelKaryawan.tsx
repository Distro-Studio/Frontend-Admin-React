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
import FilterItemWrapper from "../../components/wrapper/FilterItemWrapper";
import { iconSize } from "../../const/sizes";
import backOnClose from "../../lib/backOnClose";
import useBackOnClose from "../../lib/useBackOnClose";

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
      >
        <ModalOverlay />
        <ModalContent ref={initialRef}>
          <ModalCloseButton />
          <ModalHeader>Filter</ModalHeader>

          <ModalBody>
            <Accordion allowToggle>
              <form id="filterKaryawanForm">
                <FilterItemWrapper title="Unit Kerja">
                  <>
                    <Button
                      onClick={() => {
                        setFilterConfig((ps: any) => ({
                          ...ps,
                          unit_kerja: 1,
                        }));
                      }}
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Asisten Pribadi Bos
                    </Button>
                    <Button
                      onClick={() => {
                        setFilterConfig((ps: any) => ({
                          ...ps,
                          unit_kerja: 1,
                        }));
                      }}
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Dokter Hewan
                    </Button>
                    <Button
                      onClick={() => {
                        setFilterConfig((ps: any) => ({
                          ...ps,
                          unit_kerja: 1,
                        }));
                      }}
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Dokter Kulit
                    </Button>
                    <Button
                      onClick={() => {
                        setFilterConfig((ps: any) => ({
                          ...ps,
                          unit_kerja: 1,
                        }));
                      }}
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Perawat Sakit Jiwa
                    </Button>
                    <Button
                      onClick={() => {
                        setFilterConfig((ps: any) => ({
                          ...ps,
                          unit_kerja: 1,
                        }));
                      }}
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Office Boi
                    </Button>
                    <Button
                      onClick={() => {
                        setFilterConfig((ps: any) => ({
                          ...ps,
                          unit_kerja: 1,
                        }));
                      }}
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Kantin
                    </Button>
                    <Button
                      onClick={() => {
                        setFilterConfig((ps: any) => ({
                          ...ps,
                          unit_kerja: 1,
                        }));
                      }}
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Janitor
                    </Button>
                  </>
                </FilterItemWrapper>

                <FilterItemWrapper title="Status Karyawan">
                  <>
                    <Button
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Tetap
                    </Button>
                    <Button
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Kontrak
                    </Button>
                    <Button
                      opacity={0.6}
                      justifyContent={"flex-start"}
                      fontWeight={400}
                      className="btn"
                      flexShrink={0}
                    >
                      Magang
                    </Button>
                  </>
                </FilterItemWrapper>
              </form>
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button w={"50%"} className="btn-solid clicky">
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
