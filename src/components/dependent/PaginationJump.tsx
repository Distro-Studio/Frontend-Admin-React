import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import formatNumber from "../../lib/formatNumber";
import parseNumber from "../../lib/parseNumber";
import useBackOnClose from "../../lib/useBackOnCloseOld";
import DisclosureHeader from "./DisclosureHeader";

type Props = {
  page: any;
  setPage: (n: number) => void;
  pagination: any;
};
export default function PaginationJump({ page, setPage, pagination }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const handleOnClose = () => {
    onClose();
    window.history.back();
  };
  const initialFocusRef = useRef(null);
  const [data, setData] = useState<number | null>(page);

  const validation = () => {
    if (data && data > 0 && data <= pagination.last_page) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (data && data > 0 && data <= pagination.last_page) {
      setPage(data);
    }
  };

  return (
    <>
      <Center
        className="btn-outline clicky"
        color={"p.500"}
        w={"32px"}
        h={"32px"}
        borderRadius={8}
        cursor={"pointer"}
        transition={"200ms"}
        onClick={onOpen}
      >
        <Text fontWeight={600}>{page}</Text>
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        initialFocusRef={initialFocusRef}
        isCentered
        size={"sm"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title="Lompat Halaman Ke - " />
          </ModalHeader>

          <ModalBody>
            <Text mb={4}>{`Halaman terakhir : ${pagination.last_page}`}</Text>
            <form id={"jumpToPageForm"} onSubmit={handleSubmit}>
              <FormControl isInvalid={!validation()}>
                <Input
                  ref={initialFocusRef}
                  placeholder="Masukkan halaman ke -"
                  onChange={(e) => {
                    setData(parseNumber(e.target.value));
                  }}
                  value={formatNumber(data)}
                />
                <FormErrorMessage>{`Input harus lebih dari 0 dan kurang dari/sama dengan halaman terakhir`}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              className="btn-ap clicky"
              colorScheme="ap"
              type="submit"
              form="jumpToPageForm"
              isDisabled={!validation()}
              w={"100%"}
            >
              Lompat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
