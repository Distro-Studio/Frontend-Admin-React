import { Box, useDisclosure } from "@chakra-ui/react";
import DetailKaryawanModal from "../../dependent/DetailKaryawanModal";

interface Props {
  id: number;
  children: any;
}

export default function DisclosureDetailKaryawan({ id, children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>{children}</Box>

      <DetailKaryawanModal
        id={id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
