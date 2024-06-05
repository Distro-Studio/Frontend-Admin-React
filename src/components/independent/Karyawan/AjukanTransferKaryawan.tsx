import {
  Button,
  ButtonProps,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import SelectJabatan from "../../dependent/_Select/SelectJabatan";
import SelectKaryawan from "../../dependent/_Select/SelectKaryawan";
import SelectTipeTransfer from "../../dependent/_Select/SelectTipeTransfer";
import SelectUnitKerja from "../../dependent/_Select/SelectUnitKerja";
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
      tgl_mulai: "",
      tipe: "" as any,
      unit_kerja_tujuan: "" as any,
      jabatan_tujuan: "" as any,
      dokumen: "",
      alasan: "",
      beri_tahu_manager_direktur: false,
      beri_tahu_karyawan: false,
    },
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      tgl_mulai: yup.string().required("Harus diisi"),
      tipe: yup.mixed().required("Harus diisi"),
      unit_kerja_tujuan: yup.mixed().required("Harus diisi"),
      jabatan_tujuan: yup.mixed().required("Harus diisi"),
      dokumen: yup.array().min(1, "Harus diisi").required("Harus diisi"),
      alasan: yup.string().required("Harus diisi"),
      beri_tahu_manager_direktur: yup.boolean().required("Harus diisi"),
      beri_tahu_karyawan: yup.boolean().required("Harus diisi"),
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
          formik.resetForm();
        }}
        initialFocusRef={initialRef}
        isCentered
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
                <SelectKaryawan
                  name="nama"
                  formik={formik}
                  placeholder="Pilih Karyawan"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>

              <SimpleGrid columns={[1, 2]} gap={4}>
                <FormControl mb={4} isInvalid={!!formik.errors.tgl_mulai}>
                  <FormLabel>
                    Tanggal Mulai
                    <FormRequired />
                  </FormLabel>
                  <DatePicker
                    name="tgl_mulai"
                    formik={formik}
                    dateValue={formik.values.tgl_mulai}
                    dateFormatOptions={{
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }}
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl_mulai as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb={4} isInvalid={!!formik.errors.tipe}>
                  <FormLabel>
                    Tipe Transfer
                    <FormRequired />
                  </FormLabel>
                  <SelectTipeTransfer
                    name="tipe"
                    formik={formik}
                    placeholder="Pilih Tipe Transfer"
                    initialSelected={formik.values.tipe}
                    noSearch
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.tipe as string}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={[1, 2]} gap={4}>
                <FormControl
                  mb={4}
                  isInvalid={!!formik.errors.unit_kerja_tujuan}
                >
                  <FormLabel>
                    Unit Kerja Tujuan
                    <FormRequired />
                  </FormLabel>
                  <SelectUnitKerja
                    name="unit_kerja_tujuan"
                    formik={formik}
                    placeholder="Pilih Unit Kerja"
                    initialSelected={formik.values.unit_kerja_tujuan}
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.unit_kerja_tujuan as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb={4} isInvalid={!!formik.errors.jabatan_tujuan}>
                  <FormLabel>
                    Jabatan Tujuan
                    <FormRequired />
                  </FormLabel>
                  <SelectJabatan
                    name="jabatan_tujuan"
                    formik={formik}
                    placeholder="Pilih Jabatan"
                    initialSelected={formik.values.jabatan_tujuan}
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.jabatan_tujuan as string}
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

              <FormControl
                mb={4}
                isInvalid={formik.errors.alasan ? true : false}
              >
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
                  {formik.errors.alasan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={2}>
                <Checkbox colorScheme="ap">
                  <Text fontSize={14}>
                    Beritahu Manajer Karyawan dan Direktur Melalui Email
                  </Text>
                </Checkbox>
                <FormErrorMessage>
                  {formik.errors.beri_tahu_manager_direktur as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <Checkbox colorScheme="ap" className="checkbox">
                  <Text fontSize={14}>Beritahu Karyawan Melalui Email</Text>
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
