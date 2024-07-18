import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
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
import backOnClose from "../../lib/backOnCloseOld";
import formatNumber from "../../lib/formatNumber";
import parseNumber from "../../lib/parseNumber";
import useBackOnClose from "../../lib/useBackOnCloseOld";
import SelectJenisPremi from "../dependent/_Select/SelectJenisPremi";
import RequiredForm from "../form/RequiredForm";

interface Props extends ButtonProps {}

export default function TambahPremi({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama_premi: "",
      jenis_premi: "" as any,
      besaran_premi: "" as any,
    },
    validationSchema: yup.object().shape({
      nama_premi: yup.string().required("Harus diisi"),
      jenis_premi: yup.object().required("Harus diisi"),
      besaran_premi: yup.number().required("Harus diisi"),
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
        Tambah Premi
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
          <ModalHeader ref={initialRef}>Tambah Premi</ModalHeader>
          <ModalBody>
            <form id="tambahJabatanForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.nama_premi ? true : false}
              >
                <FormLabel>
                  Nama Premi
                  <RequiredForm />
                </FormLabel>
                <Input
                  name="nama_premi"
                  placeholder="Tapera"
                  onChange={formik.handleChange}
                  value={formik.values.nama_premi}
                />
                <FormErrorMessage>
                  {formik.errors.nama_premi as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.jenis_premi ? true : false}
              >
                <FormLabel>
                  Jenis Premi
                  <RequiredForm />
                </FormLabel>
                <SelectJenisPremi
                  name="jenis_premi"
                  formik={formik}
                  placeholder="Pilih Jenis Premi"
                  initialSelected={formik.values.jenis_premi}
                  noUseBackOnClose
                  noSearch
                />
                <FormErrorMessage>
                  {formik.errors.jenis_premi as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.besaran_premi ? true : false}
              >
                <FormLabel>
                  Besaran Premi
                  <RequiredForm />
                </FormLabel>
                <InputGroup>
                  {formik.values.jenis_premi.value === 1 && (
                    <InputLeftElement>
                      <Text>Rp</Text>
                    </InputLeftElement>
                  )}
                  <Input
                    name="besaran_premi"
                    isDisabled={formik.values.jenis_premi === ""}
                    placeholder={
                      formik.values.jenis_premi.value === 0
                        ? "80"
                        : formik.values.jenis_premi.value === 1
                        ? "4.000.000"
                        : "Pilih jenis premi dahulu"
                    }
                    onChange={(e) => {
                      const numValue = parseNumber(e.target.value);
                      if (formik.values.jenis_premi.value === 0) {
                        if (numValue === null) {
                          formik.setFieldValue("besaran_premi", "");
                        } else if (numValue <= 100) {
                          formik.setFieldValue("besaran_premi", numValue);
                        }
                      } else {
                        formik.setFieldValue("besaran_premi", numValue);
                      }
                    }}
                    value={formatNumber(formik.values.besaran_premi)}
                  />
                  {formik.values.jenis_premi.value === 0 && (
                    <InputRightElement>
                      <Text>%</Text>
                    </InputRightElement>
                  )}
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.besaran_premi as string}
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
