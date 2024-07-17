import {
  Button,
  ButtonProps,
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
import { RiUploadLine } from "@remixicon/react";
import { useRef } from "react";
import { iconSize } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import DisclosureHeader from "./DisclosureHeader";
import backOnClose from "../../lib/backOnClose";

interface Props extends ButtonProps {
  url: string;
}

export default function ExportModal({ url, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`export-modal-${1}`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <Button
        flex={"1 1 110px"}
        variant={"outline"}
        colorScheme="ap"
        className="clicky"
        rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
        onClick={onOpen}
        {...props}
      >
        Export
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={"Export"} />
          </ModalHeader>
          <ModalBody>
            <Text>Apakah anda yakin akan export tabel ini?</Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              onClick={backOnClose}
            >
              Tidak
            </Button>
            <Button w={"100%"} className="btn-ap clicky" colorScheme="ap">
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
