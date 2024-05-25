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
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FormRequired from "../../form/FormRequired";

interface Props extends ButtonProps {}

export default function AjukanTransferKaryawan({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama: "",
      tanggal: "",
      tipe: "",
      unit_kerja: "",
      jabatan: "",
      dokumen: "",
      alasan: "",
      beri_tahu_manager_direktur: "",
      beri_tahu_karyawan: "",
    },
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      tanggal: yup.string().required("Harus diisi"),
      tipe: yup.string().required("Harus diisi"),
      unit_kerja: yup.string().required("Harus diisi"),
      jabatan: yup.string().required("Harus diisi"),
      dokumen: yup.string().required("Harus diisi"),
      alasan: yup.string().required("Harus diisi"),
      beri_tahu_manager_direktur: yup.string().required("Harus diisi"),
      beri_tahu_karyawan: yup.string().required("Harus diisi"),
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
        Ajukan Transfer
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Ajukan Transfer Karyawan</ModalHeader>
          <ModalBody>
            <form id="transferKaryawanForm" onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.errors.nama ? true : false}>
                <FormLabel>
                  Nama Karyawan
                  <FormRequired />
                </FormLabel>
                <Input
                  name="nama"
                  placeholder="Jolitos Kurniawan"
                  onChange={formik.handleChange}
                  value={formik.values.nama}
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
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
