import {
  Box,
  Button,
  ButtonProps,
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
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowUpDownLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import SelectKaryawan from "../../dependent/_Select/SelectKaryawan";
import SelectShiftKaryawan from "../../dependent/_Select/SelectShiftKaryawan";
import FormRequired from "../../form/FormRequired";

interface Props extends ButtonProps {}

export default function AjukanPenukaranJadwalModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      user_pengajuan: "",
      jadwal_pengajuan: "",
      user_ditukar: "",
      jadwal_ditukar: "",
    },
    validationSchema: yup.object().shape({
      user_pengajuan: yup.string().required("Harus diisi"),
      jadwal_pengajuan: yup.string().required("Harus diisi"),
      user_ditukar: yup.string().required("Harus diisi"),
      jadwal_ditukar: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <>
      <Button
        colorScheme="ap"
        className="btn-ap clicky"
        onClick={onOpen}
        {...props}
      >
        Ajukan Penukaran Jadwal
      </Button>

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
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Ajukan Penukaran Jadwal</ModalHeader>
          <ModalBody>
            <form id="ajukanPenukaranJadwalForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.user_pengajuan ? true : false}
              >
                <FormLabel>
                  Karyawan Pengajuan
                  <FormRequired />
                </FormLabel>
                <SelectKaryawan
                  name="user_pengajuan"
                  formik={formik}
                  placeholder="Pilih Karyawan"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.user_pengajuan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.jadwal_pengajuan ? true : false}
              >
                <FormLabel>
                  Jadwal Pengajuan
                  <FormRequired />
                </FormLabel>
                <SelectShiftKaryawan
                  name="jadwal_pengajuan"
                  formik={formik}
                  placeholder="Pilih Shift Karyawan"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.jadwal_pengajuan as string}
                </FormErrorMessage>
              </FormControl>

              <HStack my={8}>
                <Box w={"100%"} h={"2px"} bg={"var(--divider2)"} />
                <Icon
                  as={RiArrowUpDownLine}
                  fontSize={20}
                  color={"p.500"}
                  // opacity={0.6}
                  // transform={"rotate(90deg)"}
                />
                <Box w={"100%"} h={"2px"} bg={"var(--divider2)"} />
              </HStack>

              <FormControl
                mb={4}
                isInvalid={formik.errors.user_ditukar ? true : false}
              >
                <FormLabel>
                  Karyawan Ditukar
                  <FormRequired />
                </FormLabel>
                <SelectKaryawan
                  name="user_ditukar"
                  formik={formik}
                  placeholder="Pilih Karyawan"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.user_ditukar as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.jadwal_ditukar ? true : false}
              >
                <FormLabel>
                  Jadwal Ditukar
                  <FormRequired />
                </FormLabel>
                <SelectShiftKaryawan
                  name="jadwal_ditukar"
                  formik={formik}
                  placeholder="Pilih Shift Karyawan"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.jadwal_ditukar as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type={"submit"}
              form="ajukanPenukaranJadwalForm"
              w={"100%"}
              colorScheme="ap"
              className="btn-ap clicky"
            >
              Tukar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
