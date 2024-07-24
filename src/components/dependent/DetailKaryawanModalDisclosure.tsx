import { Box, BoxProps, useDisclosure } from "@chakra-ui/react";
import DetailKaryawanModal from "./DetailKaryawanModal";

interface Props extends BoxProps {
  karyawan_id: number;
  children: any;
}

export default function DetailKaryawanModalDisclosure({
  karyawan_id,
  children,
  ...props
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        cursor={"pointer"}
        {...props}
      >
        {children}
      </Box>

      <DetailKaryawanModal
        karyawan_id={karyawan_id}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
