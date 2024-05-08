import {
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import formatDate from "../../../lib/formatDate";
import { Pengumuman__Interface } from "../../../const/interfaces";
import useBackOnClose from "../../../lib/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import { useRef, useState } from "react";
import FormDashboardPengumumanUpdate from "../../form/Dashboard/FormDashboardPengumumanUpdate";
import DeletePermanentWarning from "../../alert/DeletePermanentWarning";

interface Props extends StackProps {
  data: Pengumuman__Interface;
}

export default function DashboardPengumumanDetail({ data, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // SX

  return (
    <>
      <VStack
        align={"stretch"}
        borderBottom={"1px solid var(--divider3)"}
        py={4}
        px={6}
        onClick={onOpen}
        cursor={"pointer"}
        _hover={{ bg: "var(--divider)" }}
        transition={"200ms"}
        {...props}
      >
        <HStack align={"flex-start"} justify={"space-between"}>
          <Text fontWeight={500}>{data.judul}</Text>
          <Text opacity={0.6} fontSize={12}>
            {formatDate(data.createdAt)}
          </Text>
        </HStack>
        <Text fontSize={14}>{data.pengumuman}</Text>
      </VStack>

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
          <ModalHeader>
            {isDeleting ? "Hapus" : "Detail"} Pengumuman
          </ModalHeader>
          <ModalBody>
            {!isDeleting && <FormDashboardPengumumanUpdate data={data} />}
          </ModalBody>
          <ModalFooter pt={isDeleting ? "0 !important" : 6}>
            {!isDeleting && (
              <ButtonGroup w={"100%"}>
                <Button
                  w={"50%"}
                  className="clicky"
                  colorScheme="red"
                  variant={"ghost"}
                  onClick={() => {
                    setIsDeleting(true);
                  }}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  form="updatePengumumanForm"
                  w={"50%"}
                  className="btn-ap clicky"
                  colorScheme="ap"
                >
                  Update
                </Button>
              </ButtonGroup>
            )}

            {isDeleting && (
              <VStack w={"100%"}>
                <Text textAlign={"center"}>
                  Apakah anda yakin menghapus pengumuman ini?
                </Text>

                <DeletePermanentWarning mb={4} />

                <ButtonGroup w={"100%"}>
                  <Button
                    w={"50%"}
                    className="btn-solid clicky"
                    onClick={() => {
                      setIsDeleting(false);
                    }}
                  >
                    Tidak
                  </Button>
                  <Button
                    w={"50%"}
                    className="clicky"
                    colorScheme="red"
                    variant={"ghost"}
                  >
                    Ya
                  </Button>
                </ButtonGroup>
              </VStack>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
