import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
} from "@chakra-ui/react";
import { RiEditFill } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";
import FileInput from "../../input/FileInput";
import Textarea from "../../input/Textarea";
import SelectJabatan from "../_Select/SelectJabatan";
import SelectTipeTransfer from "../_Select/SelectTipeTransfer";
import SelectUnitKerja from "../_Select/SelectUnitKerja";
import { iconSize } from "../../../const/sizes";
import SelectKelompokGaji from "../_Select/SelectKelompokGaji";

interface Props {
  data: any;
}

export default function EditTransferKaryawanModal({ data }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      tgl_mulai: data.tgl_mulai,
      tipe: {
        value: data.tipe.id,
        label: data.tipe.label,
      } as any,
      unit_kerja_tujuan: {
        value: data.unit_kerja_tujuan.id,
        label: data.unit_kerja_tujuan.nama_unit,
      } as any,
      jabatan_tujuan: {
        value: data.jabatan_tujuan.id,
        label: data.jabatan_tujuan.nama_jabatan,
      } as any,
      kelompok_gaji_tujuan: {
        value: data.kelompok_gaji_tujuan.id,
        label: data.kelompok_gaji_tujuan.nama_kelompok,
      } as any,
      dokumen: data.dokumen as File[],
      alasan: data.alasan,
      beri_tahu_manager_direktur: data.beri_tahu_manajer,
      beri_tahu_karyawan: data.beri_tahu_karyawan,
    },
    validationSchema: yup.object().shape({
      tgl_mulai: yup.string().required("Harus diisi"),
      tipe: yup.mixed().required("Harus diisi"),
      unit_kerja_tujuan: yup.mixed().required("Harus diisi"),
      jabatan_tujuan: yup.mixed().required("Harus diisi"),
      kelompok_gaji_tujuan: yup.mixed().required("Harus diisi"),
      dokumen: yup.array().min(1, "Harus diisi"),
      alasan: yup.string().required("Harus diisi"),
      beri_tahu_manager_direktur: yup.boolean(),
      beri_tahu_karyawan: yup.boolean(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <>
      <Button
        colorScheme="ap"
        variant={"ghost"}
        className=" clicky"
        leftIcon={<Icon as={RiEditFill} fontSize={iconSize} />}
        onClick={onOpen}
      >
        Edit
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
                    defaultDateSelected={new Date(formik.values.tgl_mulai)}
                    dateFormatOptions={{
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
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

              <FormControl mb={4} isInvalid={!!formik.errors.unit_kerja_tujuan}>
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

              <FormControl
                mb={4}
                isInvalid={!!formik.errors.kelompok_gaji_tujuan}
              >
                <FormLabel>
                  Kelompok Gaji Tujuan
                  <FormRequired />
                </FormLabel>
                <SelectKelompokGaji
                  name="kelompok_gaji_tujuan"
                  formik={formik}
                  placeholder="Pilih Kelompok Gaji"
                  initialSelected={formik.values.kelompok_gaji_tujuan}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.kelompok_gaji_tujuan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.dokumen}>
                <FormLabel>
                  Dokumen
                  <FormRequired />
                </FormLabel>
                <FileInput name="dokumen" formik={formik} />
                <Text
                  mt={1}
                  opacity={0.6}
                  fontSize={14}
                >{`Dokumen sebelumnya : ${data.initialDokumenName}`}</Text>
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
              form="editTransferKaryawanForm"
              w={"100%"}
              className="btn-ap clicky"
              colorScheme="ap"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
