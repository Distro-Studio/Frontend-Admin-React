import { Box, BoxProps, useDisclosure } from "@chakra-ui/react";
import DetailKaryawanModal from "./DetailKaryawanModal";

interface Props extends BoxProps {
  karyawan_id: number;
  children: any;
}

export default function DisclosureDetailKaryawan({
  karyawan_id,
  children,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box {...props}>{children}</Box>

      <DetailKaryawanModal
        karyawan_id={karyawan_id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
