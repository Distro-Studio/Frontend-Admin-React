import {
  Avatar,
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
import SelectShift from "../_Select/SelectShift";
import JenisKaryawanBadge from "../JenisKaryawanBadge";

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
    initialValues: { shift: "" as any },
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
        w={"100%"}
        h={"74px"}
        cursor={"pointer"}
        bg={bodyColor}
        color={whiteDarkColor}
        className="btn-ap clicky"
        onClick={onOpen}
        justify={"center"}
        // border={"1px solid var(--divider3) !important"}
      >
        <Icon as={RiEditBoxLine} fontSize={20} />
        <Text>Terapkan</Text>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
          formik.resetForm();
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
                  <JenisKaryawanBadge data={data.unit_kerja.jenis_karyawan} />
                </HStack>
              </VStack>
            </VStack>

            <form
              id="terapkanJadwalKaryawanTerpilihForm"
              onSubmit={formik.handleSubmit}
            >
              <FormControl
                mt={6}
                isInvalid={formik.errors.shift ? true : false}
              >
                <FormLabel>
                  Shift
                  <FormRequired />
                </FormLabel>
                <SelectShift
                  formik={formik}
                  name="shift"
                  placeholder="Pilih shift"
                  initialSelected={formik.values.shift}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.shift as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                type="submit"
                form="terapkanJadwalKaryawanTerpilihForm"
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
              >
                Simpan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
