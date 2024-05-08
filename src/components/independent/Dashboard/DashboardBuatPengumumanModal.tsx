import {
  Button,
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
import { RiAddLine } from "@remixicon/react";
import { useRef } from "react";
import { iconSize } from "../../../const/sizes";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormDashboardPengumumanBuat from "../../form/Dashboard/FormDashboardPengumumanBuat";

export default function DashboardBuatPengumumanModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  useBackOnClose(isOpen, onClose);

  return (
    <>
      <Button
        size={"xs"}
        leftIcon={<Icon as={RiAddLine} fontSize={iconSize} />}
        pl={2}
        className="btn-clear clicky"
        color={"p.500"}
        onClick={onOpen}
      >
        Buat Pengumuman
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent ref={initialRef}>
          <ModalCloseButton />
          <ModalHeader>Buat Pengumuman</ModalHeader>
          <ModalBody>
            <FormDashboardPengumumanBuat />
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="buatPengumumanForm"
              w={"100%"}
              colorScheme="ap"
              className="btn-ap clicky"
            >
              Buat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
