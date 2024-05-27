import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
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
import { RiEditBoxLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import { useBodyColor, useWhiteDarkColor } from "../../../const/colors";
import { responsiveSpacing } from "../../../const/sizes";
import backOnClose from "../../../lib/backOnClose";
import formatDate from "../../../lib/formatDate";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";
import SelectShift from "../Jadwal/SelectShift";

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
            <VStack gap={responsiveSpacing} px={1} flexShrink={0} mb={4}>
              <Avatar
                mb={"auto"}
                size={"xl"}
                src={data.foto_profil}
                name={data.nama}
              />

              <VStack align={"stretch"} w={"100%"} gap={3}>
                <HStack justify={"space-between"}>
                  <Text fontSize={14} w={"120px"} opacity={0.6}>
                    Nama
                  </Text>
                  <Text textAlign={"right"} fontWeight={500}>
                    {data.nama}
                  </Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text fontSize={14} w={"120px"} opacity={0.6}>
                    Tanggal
                  </Text>
                  <Text textAlign={"right"}>{formatDate(tgl as string)}</Text>
                </HStack>

                <HStack justify={"space-between"}>
                  <Text fontSize={14} w={"120px"} opacity={0.6}>
                    Jenis Karyawan
                  </Text>
                  <Badge
                    ml={"auto"}
                    colorScheme={
                      data.unit_kerja.jenis_karyawan === 1 ? "ap" : "gray"
                    }
                  >
                    {data.unit_kerja.jenis_karyawan === 1
                      ? "Shift"
                      : "Non-Shift"}
                  </Badge>
                </HStack>
              </VStack>
            </VStack>

            <FormControl mt={6} isInvalid={formik.errors.shift ? true : false}>
              <FormLabel>
                Shift
                <FormRequired />
              </FormLabel>
              <SelectShift
                formik={formik}
                name="shift"
                placeholder="Pilih shift"
                selectedValue={formik.values.shift}
                noUseBackOnClose
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
