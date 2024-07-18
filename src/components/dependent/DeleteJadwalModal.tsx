import {
  Button,
  ButtonGroup,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import useBackOnClose from "../../lib/useBackOnCloseOld";
import DeletePermanentWarning from "../independent/DeletePermanentWarning";

interface Props extends ButtonProps {
  data: any;
  noUseBackOnClose?: boolean;
}

export default function DeleteJadwalModal({
  data,
  noUseBackOnClose,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backOnCloseHook = useBackOnClose;
  if (!noUseBackOnClose) {
    backOnCloseHook(isOpen, onClose);
  }
  const handleOnClose = () => {
    onClose();
    if (!noUseBackOnClose) {
      window.history.back();
    }
  };
  const initialRef = useRef(null);

  return (
    <>
      <Button
        w={"100%"}
        className="clicky"
        colorScheme="red"
        variant={"ghost"}
        onClick={onOpen}
        // isDisabled={loadingUpdate}
        bg={"var(--reda)"}
        _hover={{ bg: "var(--reda)" }}
        {...props}
      >
        Hapus
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Hapus Jadwal</ModalHeader>
          <ModalBody>
            <VStack w={"100%"} align={"stretch"}>
              <Text textAlign={"center"}>
                Apakah anda yakin menghapus jadwal untuk karyawan ini?
              </Text>

              <DeletePermanentWarning mb={2} mt={4} />

              <ButtonGroup w={"100%"}>
                <Button
                  w={"50%"}
                  className="clicky"
                  colorScheme="red"
                  onClick={handleOnClose}
                  // isDisabled={loadingDelete}
                >
                  Tidak
                </Button>
                <Button
                  w={"50%"}
                  className="clicky"
                  variant={"ghost"}
                  colorScheme="red"
                  bg={"var(--reda)"}
                  _hover={{ bg: "var(--reda)" }}
                  // isLoading={loadingDelete}
                  // onClick={deleteJadwal}
                >
                  Ya
                </Button>
              </ButtonGroup>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
