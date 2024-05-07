import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiAddLine } from "@remixicon/react";
import { iconSize } from "../../const/sizes";
import useBackOnClose from "../../lib/useBackOnClose";

export default function AddFamily() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onOpen);
  function handleOnClose() {
    window.history.back();
    onClose();
  }

  return (
    <>
      <Button
        leftIcon={<Icon as={RiAddLine} fontSize={iconSize} />}
        pl={3}
        w={"100%"}
        colorScheme="ap"
        variant={"outline"}
        className="clicky"
        onClick={onOpen}
      >
        Tambah
      </Button>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>Tambah Keluarga</ModalHeader>
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
