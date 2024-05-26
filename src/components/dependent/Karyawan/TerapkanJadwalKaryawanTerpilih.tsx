import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiEditBoxLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import { useBodyColor, useWhiteDarkColor } from "../../../const/colors";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";
import { responsiveSpacing } from "../../../const/sizes";

interface Props {
  data: any;
  tgl: Date | string;
}

export default function TerapkanJadwalKaryawanTerpilih({ data, tgl }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { shift: "" },
    validationSchema: yup
      .object()
      .shape({ shift: yup.string().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  // SX
  const bodyColor = useBodyColor();
  const whiteDarkColor = useWhiteDarkColor();

  return (
    <>
      <VStack
        p={3}
        gap={1}
        borderRadius={8}
        w={"180px"}
        h={"70px"}
        cursor={"pointer"}
        bg={bodyColor}
        color={whiteDarkColor}
        className="btn-ap clicky"
        onClick={onOpen}
        // border={"1px solid var(--divider3) !important"}
      >
        <Icon as={RiEditBoxLine} fontSize={20} />
        <Text>Terapkan</Text>
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
          <ModalHeader>Terapkan Jadwal</ModalHeader>
          <ModalBody>
            <SimpleGrid columns={[1, 2]} gap={responsiveSpacing}>
              <HStack
                gap={responsiveSpacing}
                borderRight={[null, "1px solid var(--divider3)"]}
              >
                <Avatar size={"lg"} src={data.foto_profil} name={data.nama} />

                <Box>
                  <Text fontSize={14} opacity={0.6}>
                    Nama
                  </Text>
                  <Text fontWeight={500}>{data.nama}</Text>
                </Box>
              </HStack>

              <HStack>
                <Box>
                  <Text fontSize={14} opacity={0.6}>
                    Tanggal
                  </Text>
                  {/* <Icon as={RiCalendarLine} opacity={0.6} mt={"1px"} /> */}
                  <Text>{formatDate(tgl as string)}</Text>
                </Box>
              </HStack>
            </SimpleGrid>

            <FormControl mt={6} isInvalid={formik.errors.shift ? true : false}>
              <FormLabel>
                Shift
                <FormRequired />
              </FormLabel>
              <Input
                name="shift"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.shift}
              />
              <FormErrorMessage>
                {formik.errors.shift as string}
              </FormErrorMessage>
            </FormControl>

            <form id="terapkanJadwa;KaryawanTerpilihForm"></form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              {/* <Button
                w={"100%"}
                className="btn-solid clicky"
                onClick={() => {
                  backOnClose(onClose);
                }}
              >
                Batal
              </Button> */}
              <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
                Simpan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
