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
import chartColors from "../../constant/chartColors";

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
        // variant={"outline"}
        // colorScheme="ap"
        className="btn-outline clicky"
        _focus={{ border: "1px solid var(--p500)" }}
        rightIcon={
          <Icon as={RiUploadLine} fontSize={iconSize} color={chartColors[1]} />
        }
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