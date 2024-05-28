import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";
import DateRangePicker from "../../input/DateRangePicker";

interface Props extends ButtonProps {}

export default function AjukanCutiModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      user_id: "",
      tipe_cuti_id: "",
      durasi: "",
    },
    validationSchema: yup.object().shape({
      user_id: yup.string().required("Harus diisi"),
      tipe_cuti_id: yup.string().required("Harus diisi"),
      durasi: yup.string().required("Harus diisi"),
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
        Ajukan Cuti
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
          <ModalHeader ref={initialRef}>Ajukan Cuti</ModalHeader>
          <ModalBody>
            <form id="ajukanCutiForm">
              <FormControl
                mb={4}
                isInvalid={formik.errors.user_id ? true : false}
              >
                <FormLabel>
                  Karyawan
                  <FormRequired />
                </FormLabel>
                <Input
                  name="user_id"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.user_id}
                />
                <FormErrorMessage>
                  {formik.errors.user_id as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.tipe_cuti_id ? true : false}
              >
                <FormLabel>
                  Tipe Cuti
                  <FormRequired />
                </FormLabel>
                <Input
                  name="tipe_cuti_id"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.tipe_cuti_id}
                />
                <FormErrorMessage>
                  {formik.errors.tipe_cuti_id as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.durasi ? true : false}>
                <FormLabel>
                  Durasi
                  <FormRequired />
                </FormLabel>
                <DateRangePicker formik={formik} name="durasi" noBackOnClose />
                <FormErrorMessage>
                  {formik.errors.durasi as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
