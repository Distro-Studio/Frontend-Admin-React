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
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnCloseOld";
import useBackOnClose from "../../../lib/useBackOnClose";
import RequiredForm from "../../form/RequiredForm";
import Textarea from "../../input/Textarea";
import TimeInput from "../../input/TimeInput";

interface Props extends ButtonProps {}

export default function TambahAcaraDiklat({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama: "",
      jenis: "",
      tgl: "",
      tempat: "",
      waktu: "",
      penanggung_jawab: "",
      peserta: "",
    },
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      jenis: yup.string().required("Harus diisi"),
      tgl: yup.string().required("Harus diisi"),
      tempat: yup.string().required("Harus diisi"),
      waktu: yup.string().required("Harus diisi"),
      penanggung_jawab: yup.string().required("Harus diisi"),
      peserta: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      //TODO api tambah cuti
    },
  });

  console.log(formik.values.waktu);

  return (
    <>
      <Button
        className="btn-ap clicky"
        colorScheme="ap"
        onClick={onOpen}
        {...props}
      >
        Tambah Acara Diklat
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
          <ModalHeader ref={initialRef}>Tambah Acara Diklat</ModalHeader>
          <ModalBody>
            <form id="tambahAcaraDiklatForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.nama}>
                <FormLabel>
                  Nama Acara
                  <RequiredForm />
                </FormLabel>
                <Input
                  name="nama"
                  placeholder="Pendidikan & Latihan"
                  onChange={formik.handleChange}
                  value={formik.values.nama}
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>

              <Wrap spacing={4} mb={4}>
                <FormControl flex={"1 1"} isInvalid={!!formik.errors.jenis}>
                  <FormLabel>
                    Jenis Acara
                    <RequiredForm />
                  </FormLabel>
                  <Input
                    name="jenis"
                    placeholder="Pendidikan & Latihan"
                    onChange={formik.handleChange}
                    value={formik.values.jenis}
                  />
                  <FormErrorMessage>
                    {formik.errors.jenis as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl flex={"1 1"} isInvalid={!!formik.errors.tgl}>
                  <FormLabel>
                    Tanggal
                    <RequiredForm />
                  </FormLabel>
                  <Input
                    name="tgl"
                    placeholder="Pendidikan & Latihan"
                    onChange={formik.handleChange}
                    value={formik.values.tgl}
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl as string}
                  </FormErrorMessage>
                </FormControl>
              </Wrap>

              <Wrap spacing={4} mb={4}>
                <FormControl flex={"1 1"} isInvalid={!!formik.errors.tempat}>
                  <FormLabel>
                    Tempat
                    <RequiredForm />
                  </FormLabel>
                  <Input
                    name="tempat"
                    placeholder="Gedung Serba Guna"
                    onChange={formik.handleChange}
                    value={formik.values.tempat}
                  />
                  <FormErrorMessage>
                    {formik.errors.tempat as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl flex={"1 1"} isInvalid={!!formik.errors.waktu}>
                  <FormLabel>
                    Waktu
                    <RequiredForm />
                  </FormLabel>
                  <TimeInput
                    value={formik.values.waktu}
                    onChange={(newValue) => {
                      formik.setFieldValue("waktu", newValue);
                    }}
                  />
                  <FormErrorMessage>
                    {formik.errors.waktu as string}
                  </FormErrorMessage>
                </FormControl>
              </Wrap>

              <FormControl mb={4} isInvalid={!!formik.errors.penanggung_jawab}>
                <FormLabel>
                  Penanggung Jawab
                  <RequiredForm />
                </FormLabel>
                <Input
                  name="penanggung_jawab"
                  placeholder="Jolitos Kurniawan"
                  onChange={formik.handleChange}
                  value={formik.values.penanggung_jawab}
                />
                <FormErrorMessage>
                  {formik.errors.penanggung_jawab as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.peserta}>
                <FormLabel>
                  Peserta
                  <RequiredForm />
                </FormLabel>
                <Textarea
                  name="peserta"
                  placeholder="Tulis Daftar Peserta"
                  formik={formik}
                />
                <FormErrorMessage>
                  {formik.errors.peserta as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="tambahAcaraDiklatForm"
              className="btn-ap clicky"
              colorScheme="ap"
              w={"100%"}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
