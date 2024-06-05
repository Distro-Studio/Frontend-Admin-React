import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  MenuItem,
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
import { RiEditFill } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../../lib/backOnClose";
import useBackOnClose from "../../../../lib/useBackOnClose";
import FormRequired from "../../../form/FormRequired";
import DatePicker from "../../../input/DatePicker";
import FileInput from "../../../input/FileInput";
import Textarea from "../../../input/Textarea";
import SelectJabatan from "../../_Select/SelectJabatan";
import SelectTipeTransfer from "../../_Select/SelectTipeTransfer";
import SelectUnitKerja from "../../_Select/SelectUnitKerja";

interface Props {
  data: any;
}

export default function OptionItemEditTransferKaryawanModal({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      tgl_mulai: data.tgl_mulai,
      tipe: data.tipe as any,
      unit_kerja_tujuan: data.unit_kerja_tujuan as any,
      jabatan_tujuan: data.jabatan_tujuan as any,
      dokumen: data.dokumen as File[],
      alasan: data.alasan,
      beri_tahu_manager_direktur: data.beri_tahu_manajer,
      beri_tahu_karyawan: data.beri_tahu_karyawan,
    },
    validationSchema: yup.object().shape({
      tgl_mulai: yup.string().required("Harus diisi"),
      tipe: yup.string().required("Harus diisi"),
      unit_kerja_tujuan: yup.string().required("Harus diisi"),
      jabatan_tujuan: yup.string().required("Harus diisi"),
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
      <MenuItem onClick={onOpen}>
        <HStack justify={"center"} w={"100%"} pr={2}>
          <Icon as={RiEditFill} />
          <Text>Edit</Text>
        </HStack>
      </MenuItem>

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
          <ModalHeader ref={initialRef}>Edit Transfer Karyawan</ModalHeader>
          <ModalBody>
            <form id="editTransferKaryawanForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>
                  Nama Karyawan
                  <FormRequired />
                </FormLabel>
                <Input defaultValue={data.user.nama} isDisabled />
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
                    defaultDateSelected={formik.values.tgl_mulai}
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
                    initialSelected={{
                      value: formik.values.tipe.id,
                      label: formik.values.tipe.label,
                    }}
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
                    initialSelected={{
                      value: formik.values.unit_kerja_tujuan.id,
                      label: formik.values.unit_kerja_tujuan.nama_unit,
                    }}
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
                    initialSelected={{
                      value: formik.values.jabatan_tujuan.id,
                      label: formik.values.jabatan_tujuan.nama_jabatan,
                    }}
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
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
