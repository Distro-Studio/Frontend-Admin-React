import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
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
import backOnClose from "../../lib/backOnCloseOld";
import useBackOnClose from "../../lib/useBackOnCloseOld";
import SelectKaryawan from "../dependent/_Select/SelectKaryawan";
import SelectKompensasi from "../dependent/_Select/SelectKompensasi";
import SelectShift from "../dependent/_Select/SelectShift";
import SelectTipeCuti from "../dependent/_Select/SelectTipeCuti";
import RequiredForm from "../form/RequiredForm";
import Textarea from "../input/Textarea";
import TimeInput from "../input/TimeInput";
import DatePickerModal from "../dependent/input/DatePickerModal";
import { RiCalendarScheduleFill } from "@remixicon/react";
import { iconSize } from "../../const/sizes";

interface Props extends ButtonProps {}

export default function AjukanLemburModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      karyawan: undefined,
      tgl_pengajuan: "" as any,
      shift: "" as any,
      kompensasi: "" as any,
      tipe: "" as any,
      durasi: "" as any,
      catatan: "",
    },
    validationSchema: yup.object().shape({
      karyawan: yup.object().required("Harus diisi"),
      tgl_pengajuan: yup.string().required("Harus diisi"),
      shift: yup.object().required("Harus diisi"),
      kompensasi: yup.object().required("Harus diisi"),
      tipe: yup.object().required("Harus diisi"),
      durasi: yup.string().required("Harus diisi"),
      catatan: yup.string().required("Harus diisi"),
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
        leftIcon={<Icon as={RiCalendarScheduleFill} fontSize={iconSize} />}
        {...props}
      >
        Ajukan Lembur
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
          <ModalHeader ref={initialRef}>Ajukan Lembur</ModalHeader>
          <ModalBody>
            <form id="ajukanLemburForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.karyawan}>
                <FormLabel>
                  Karyawan
                  <RequiredForm />
                </FormLabel>
                <SelectKaryawan
                  name="karyawan"
                  onConfirm={(input) => {
                    formik.setFieldValue("karyawan", input);
                  }}
                  inputValue={formik.values.karyawan}
                />
                <FormErrorMessage>
                  {formik.errors.karyawan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.tgl_pengajuan}>
                <FormLabel>
                  Tanggal Pengajuan
                  <RequiredForm />
                </FormLabel>
                <DatePickerModal
                  id="ajukan-lembur-tgl-pengajuan"
                  name="tgl_pengajuan"
                  onConfirm={(input) => {
                    formik.setFieldValue("tgl_pengajuan", input);
                  }}
                  inputValue={
                    formik.values.tgl_pengajuan
                      ? new Date(formik.values.tgl_pengajuan)
                      : undefined
                  }
                />
                <FormErrorMessage>
                  {formik.errors.tgl_pengajuan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.shift}>
                <FormLabel>
                  Shift
                  <RequiredForm />
                </FormLabel>
                <SelectShift
                  name="shift"
                  placeholder="Pilih Jadwal"
                  onConfirm={(input) => {
                    formik.setFieldValue("shift", input);
                  }}
                  inputValue={formik.values.shift}
                />
                <FormErrorMessage>
                  {formik.errors.shift as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.kompensasi}>
                <FormLabel>
                  Kompensasi
                  <RequiredForm />
                </FormLabel>
                <SelectKompensasi
                  name="kompensasi"
                  formik={formik}
                  placeholder="Pilih Kompensasi"
                  initialSelected={formik.values.kompensasi}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.kompensasi as string}
                </FormErrorMessage>
              </FormControl>

              <SimpleGrid columns={[1, 2]} gap={4}>
                <FormControl mb={4} isInvalid={!!formik.errors.tipe}>
                  <FormLabel>
                    Tipe
                    <RequiredForm />
                  </FormLabel>
                  <SelectTipeCuti
                    name="tipe"
                    onConfirm={(input) => {
                      formik.setFieldValue("tipe", input);
                    }}
                    inputValue={formik.values.tipe}
                  />
                  <FormErrorMessage>
                    {formik.errors.tipe as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb={4} isInvalid={!!formik.errors.durasi}>
                  <FormLabel>
                    Durasi
                    <RequiredForm />
                  </FormLabel>
                  <TimeInput
                    value={formik.values.durasi}
                    onChange={(newValue) => {
                      formik.setFieldValue("durasi", newValue);
                    }}
                  />
                  <FormErrorMessage>
                    {formik.errors.durasi as string}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={!!formik.errors.catatan}>
                <FormLabel>
                  Catatan
                  <RequiredForm />
                </FormLabel>
                <Textarea
                  name="catatan"
                  formik={formik}
                  placeholder="Catatan untuk Karyawan"
                />
                <FormErrorMessage>
                  {formik.errors.catatan as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="ajukanLemburForm"
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
