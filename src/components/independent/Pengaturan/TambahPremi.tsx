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
import backOnClose from "../../../lib/backOnClose";
import formatNumber from "../../../lib/formatNumber";
import parseNumber from "../../../lib/parseNumber";
import useBackOnClose from "../../../lib/useBackOnClose";
import SelectJenisPremi from "../../dependent/Pengaturan/SelectJenisPremi";
import FormRequired from "../../form/FormRequired";

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
      jenis_premi: yup.number().required("Harus diisi"),
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
                  <FormRequired />
                </FormLabel>
                <Input
                  name="nama_premi"
                  placeholder="Human Resource"
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
                  <FormRequired />
                </FormLabel>
                <SelectJenisPremi
                  name="jenis_premi"
                  formik={formik}
                  placeholder="Pilih jenis kompetensi"
                  selectedValue={formik.values.jenis_premi}
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
                  <FormRequired />
                </FormLabel>
                <InputGroup>
                  {formik.values.jenis_premi === 1 && (
                    <InputLeftElement>
                      <Text>Rp</Text>
                    </InputLeftElement>
                  )}
                  <Input
                    name="besaran_premi"
                    isDisabled={formik.values.jenis_premi === ""}
                    placeholder={
                      formik.values.jenis_premi === 0 ? "80" : "4.000.000"
                    }
                    onChange={(e) => {
                      formik.setFieldValue(
                        "besaran_premi",
                        parseNumber(e.target.value)
                      );
                    }}
                    value={formatNumber(formik.values.besaran_premi)}
                  />
                  {formik.values.jenis_premi === 0 && (
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
