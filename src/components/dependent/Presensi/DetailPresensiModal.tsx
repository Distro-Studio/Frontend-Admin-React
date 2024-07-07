import {
  Button,
  ButtonProps,
  HStack,
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
import backOnClose from "../../../lib/backOnCloseOld";
import useBackOnClose from "../../../lib/useBackOnClose";
import MiniKaryawanPresensiProfile from "../MiniKaryawanPresensiProfile";
import formatTime from "../../../lib/formatTime";
import FlexLine from "../../independent/FlexLine";
import formatDuration from "../../../lib/formatDuration";
interface Props extends ButtonProps {
  data: any;
}

export default function DetailPresensiModal({ data, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  return (
    <>
      <Button
        colorScheme="ap"
        variant={"ghost"}
        className="clicky"
        w={"100%"}
        onClick={onOpen}
        {...props}
      >
        Detail
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
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Detail Presensi</ModalHeader>
          <ModalBody>
            <MiniKaryawanPresensiProfile data={data} mb={3} />

            <VStack align={"stretch"} gap={3}>
              <HStack justify={"space-between"}>
                <Text opacity={0.6} fontSize={14}>
                  Jadwal masuk
                </Text>
                <FlexLine />
                <Text>{formatTime(data.jadwal.jam_from)}</Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text opacity={0.6} fontSize={14}>
                  Jadwal keluar
                </Text>
                <FlexLine />
                <Text>{formatTime(data.jadwal.jam_to)}</Text>
              </HStack>

              <HStack justify={"space-between"}>
                <Text opacity={0.6} fontSize={14}>
                  Lembur
                </Text>
                <FlexLine />
                <Text>{formatDuration(null)}</Text>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
