import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiUser2Fill } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import { iconSize } from "../../const/sizes";
import backOnClose from "../../lib/backOnCloseOld";
import useBackOnClose from "../../lib/useBackOnCloseOld";
import SelectKategoriDiklat from "../dependent/_Select/SelectKategoriDiklat";
import DisclosureHeader from "../dependent/DisclosureHeader";
import RequiredForm from "../form/RequiredForm";
import TimeInput from "../input/TimeInput";

interface Props extends ButtonProps {}

export default function TambahAcaraDiklat({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama: "",
      kategori: undefined,
      tgl: undefined,
      tempat: "",
      waktu: "",
    },
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      kategori: yup.object().required("Harus diisi"),
      tgl: yup.string().required("Harus diisi"),
      tempat: yup.string().required("Harus diisi"),
      waktu: yup.string().required("Harus diisi"),
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
        leftIcon={<Icon as={RiUser2Fill} fontSize={iconSize} />}
        pl={5}
        {...props}
      >
        Buat Acara Diklat
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
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title="Buat Acara Diklat" />
          </ModalHeader>
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

              <FormControl mb={4} isInvalid={!!formik.errors.kategori}>
                <FormLabel>
                  Kategori
                  <RequiredForm />
                </FormLabel>
                <SelectKategoriDiklat
                  name="kategori"
                  onConfirm={(input) => {
                    formik.setFieldValue("kaergori", input);
                  }}
                  inputValue={formik.values.kategori}
                />
                <FormErrorMessage>
                  {formik.errors.kategori as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formik.errors.tgl}>
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

              <FormControl mb={4} isInvalid={!!formik.errors.tempat}>
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

              <FormControl mb={4} isInvalid={!!formik.errors.waktu}>
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
