import {
  Button,
  ButtonProps,
  Checkbox,
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
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";
import FileInput from "../../input/FileInput";
import Textarea from "../../input/Textarea";

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
        isCentered
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Ajukan Transfer Karyawan</ModalHeader>
          <ModalBody>
            <form id="transferKaryawanForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.nama}>
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

              <SimpleGrid columns={[1, 2]} gap={4}>
                <FormControl mb={4} isInvalid={!!formik.errors.tanggal}>
                  <FormLabel>
                    Tanggal
                    <FormRequired />
                  </FormLabel>
                  <DatePicker
                    name="tanggal"
                    formik={formik}
                    dateValue={formik.values.tanggal}
                  />
                  <FormErrorMessage>
                    {formik.errors.tanggal as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb={4} isInvalid={!!formik.errors.tipe}>
                  <FormLabel>
                    Tipe
                    <FormRequired />
                  </FormLabel>
                  <Input />
                  <FormErrorMessage>
                    {formik.errors.tipe as string}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <FormControl mb={4} isInvalid={!!formik.errors.dokumen}>
                <FormLabel>
                  Dokumen
                  <FormRequired />
                </FormLabel>
                <FileInput name="dokumen" formik={formik} />
                <FormErrorMessage>
                  {formik.errors.dokumen as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={formik.errors.nama ? true : false}>
                <FormLabel>
                  Alesan
                  <FormRequired />
                </FormLabel>
                <Textarea
                  name="alasan"
                  formik={formik}
                  placeholder="Jolitos Kurniawan"
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={!!formik.errors.beri_tahu_manager_direktur}
              >
                <Checkbox
                  colorScheme="ap"
                  isInvalid={!!formik.errors.beri_tahu_manager_direktur}
                >
                  Beritahu Manajer Karyawan dan Direktur Melalui Email
                </Checkbox>
                <FormErrorMessage>
                  {formik.errors.beri_tahu_manager_direktur as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formik.errors.beri_tahu_karyawan}>
                <Checkbox
                  colorScheme="ap"
                  isInvalid={!!formik.errors.beri_tahu_karyawan}
                >
                  Beritahu Karyawan Melalui Email
                </Checkbox>
                <FormErrorMessage>
                  {formik.errors.beri_tahu_karyawan as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="transferKaryawanForm"
              w={"100%"}
              colorScheme="ap"
              className="btn-ap clicky"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
