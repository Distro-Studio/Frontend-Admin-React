import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnCloseOld";
import formatNumber from "../../../lib/formatNumber";
import parseNumber from "../../../lib/parseNumber";
import useBackOnClose from "../../../lib/useBackOnCloseOld";
import RequiredForm from "../../form/RequiredForm";
import SelectJenisKompetensi from "../../dependent/_Select/SelectJenisKompetensi";

interface Props extends ButtonProps {}

export default function TambahKompetensi({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama_jabatan: "",
      total_tunjangan: "" as any,
      jenis_kompetensi: "" as any,
    },
    validationSchema: yup.object().shape({
      nama_jabatan: yup.string().required("Harus diisi"),
      total_tunjangan: yup.number().required("Harus diisi"),
      jenis_kompetensi: yup.object().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //TODO api tambah kelompok gaji
    },
  });
  return (
    <>
      <Button
        className="btn-ap clicky"
        colorScheme="ap"
        onClick={onOpen}
        {...props}
      >
        Tambah Kompetensi
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
          <ModalHeader ref={initialRef}>Tambah Kompetensi</ModalHeader>
          <ModalBody>
            <form id="tambahJabatanForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.nama_jabatan ? true : false}
              >
                <FormLabel>
                  Nama Kompetensi
                  <RequiredForm />
                </FormLabel>
                <Input
                  name="nama_jabatan"
                  placeholder="Human Resource"
                  onChange={formik.handleChange}
                  value={formik.values.nama_jabatan}
                />
                <FormErrorMessage>
                  {formik.errors.nama_jabatan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.jenis_kompetensi ? true : false}
              >
                <FormLabel>
                  Jenis Kompetensi
                  <RequiredForm />
                </FormLabel>
                <SelectJenisKompetensi
                  name="jenis_kompetensi"
                  formik={formik}
                  placeholder="Pilih Jenis Kompetensi"
                  initialSelected={formik.values.jenis_kompetensi}
                  noUseBackOnClose
                  noSearch
                />
                <FormErrorMessage>
                  {formik.errors.jenis_kompetensi as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.total_tunjangan ? true : false}
              >
                <FormLabel>
                  Tunjangan
                  <RequiredForm />
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Text>Rp</Text>
                  </InputLeftElement>
                  <Input
                    name="total_tunjangan"
                    placeholder="4.000.000"
                    onChange={(e) => {
                      const newValue = parseNumber(e.target.value);
                      if (newValue && newValue > 0) {
                        formik.setFieldValue("total_tunjangan", newValue);
                      } else {
                        formik.setFieldValue("total_tunjangan", "");
                      }
                    }}
                    value={
                      formik.values.total_tunjangan === ""
                        ? ""
                        : formatNumber(formik.values.total_tunjangan)
                    }
                  />
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.total_tunjangan as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="tambahJabatanForm"
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
