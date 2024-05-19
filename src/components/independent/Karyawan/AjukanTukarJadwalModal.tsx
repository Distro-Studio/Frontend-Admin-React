import {
  Box,
  Button,
  ButtonProps,
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
  useDisclosure,
} from "@chakra-ui/react";
import { RiRepeatLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";

interface Props extends ButtonProps {}

export default function AjukanTukarJadwalModal({ ...props }: Props) {
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
        }}
        initialFocusRef={initialRef}
        isCentered
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent ref={initialRef}>
          <ModalCloseButton />
          <ModalHeader>Ajukan Penukaran Jadwal</ModalHeader>
          <ModalBody>
            <form id="penukaranJadwalForm">
              <FormControl
                mb={4}
                isInvalid={formik.errors.user_pengajuan ? true : false}
              >
                <FormLabel>
                  Karyawan Pengajuan
                  <FormRequired />
                </FormLabel>
                <Input
                  name="user_pengajuan"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.user_pengajuan}
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
                <Input
                  name="jadwal_pengajuan"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.jadwal_pengajuan}
                />
                <FormErrorMessage>
                  {formik.errors.jadwal_pengajuan as string}
                </FormErrorMessage>
              </FormControl>

              <HStack my={8}>
                <Box w={"100%"} h={"2px"} bg={"var(--divider3)"} />
                <Icon
                  as={RiRepeatLine}
                  fontSize={20}
                  opacity={0.6}
                  transform={"rotate(90deg)"}
                />
                <Box w={"100%"} h={"2px"} bg={"var(--divider3)"} />
              </HStack>

              <FormControl
                mb={4}
                isInvalid={formik.errors.user_ditukar ? true : false}
              >
                <FormLabel>
                  Karyawan Ditukar
                  <FormRequired />
                </FormLabel>
                <Input
                  name="user_ditukar"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.user_ditukar}
                />
                <FormErrorMessage>
                  {formik.errors.user_ditukar as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.jadwal_ditukar ? true : false}
              >
                <FormLabel>
                  Jadwal Ditukar
                  <FormRequired />
                </FormLabel>
                <Input
                  name="jadwal_ditukar"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.jadwal_ditukar}
                />
                <FormErrorMessage>
                  {formik.errors.jadwal_ditukar as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
              Tukar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}