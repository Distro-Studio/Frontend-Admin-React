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
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnCloseOld";
import formatNumber from "../../../lib/formatNumber";
import parseNumber from "../../../lib/parseNumber";
import useBackOnClose from "../../../lib/useBackOnCloseOld";
import SelectPtkp from "../../dependent/_Select/SelectPtkp";
import RequiredForm from "../../form/RequiredForm";
import SelectKategoriTer from "../../dependent/_Select/SelectKategoriTer";

interface Props extends ButtonProps {}

export default function TambahTerPph21({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      kategori_ter: "" as any,
      ptkp: "" as any,
      from_ter: "" as any,
      to_ter: "" as any,
      percentage_ter: "" as any,
    },
    validationSchema: yup.object().shape({
      kategori_ter: yup.string().required("Harus diisi"),
      ptkp: yup.number().required("Harus diisi"),
      from_ter: yup.number().required("Harus diisi"),
      to_ter: yup.number().required("Harus diisi"),
      percentage_ter: yup.number().required("Harus diisi"),
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
        Tambah TER pph21
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
          <ModalHeader ref={initialRef}>Tambah TER pph21</ModalHeader>
          <ModalBody>
            <form id="tambahJabatanForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.kategori_ter ? true : false}
              >
                <FormLabel>
                  Kategori TER
                  <RequiredForm />
                </FormLabel>
                <SelectKategoriTer
                  name="kategori_ter"
                  formik={formik}
                  placeholder="Pilih Kategori TER"
                  initialSelected={formik.values.kategori_ter}
                  noUseBackOnClose
                  noSearch
                />
                <FormErrorMessage>
                  {formik.errors.kategori_ter as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={formik.errors.ptkp ? true : false}>
                <FormLabel>
                  PTKP
                  <RequiredForm />
                </FormLabel>
                <SelectPtkp
                  name="ptkp"
                  formik={formik}
                  placeholder="Pilih PTKP"
                  initialSelected={formik.values.ptkp}
                  noUseBackOnClose
                  noSearch
                />
                <FormErrorMessage>
                  {formik.errors.ptkp as string}
                </FormErrorMessage>
              </FormControl>

              <FormLabel>
                Penghasilan Bruto Bulanan
                <RequiredForm />
              </FormLabel>
              <Wrap spacing={4} mb={4}>
                <FormControl
                  flex={"1 1"}
                  isInvalid={formik.errors.from_ter ? true : false}
                >
                  <InputGroup>
                    <InputLeftElement>
                      <Text>Rp</Text>
                    </InputLeftElement>
                    <Input
                      name="from_ter"
                      placeholder={"4.000.000"}
                      onChange={(e) => {
                        const newValue =
                          e.target.value !== ""
                            ? parseNumber(e.target.value)
                            : "";
                        formik.setFieldValue("from_ter", newValue);
                      }}
                      value={
                        formik.values.from_ter === ""
                          ? ""
                          : formatNumber(formik.values.from_ter)
                      }
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {formik.errors.from_ter as string}
                  </FormErrorMessage>
                </FormControl>

                <Text mt={"5px"} textAlign={"center"}>
                  -
                </Text>

                <FormControl
                  flex={"1 1"}
                  isInvalid={formik.errors.to_ter ? true : false}
                >
                  <InputGroup>
                    <InputLeftElement>
                      <Text>Rp</Text>
                    </InputLeftElement>
                    <Input
                      name="to_ter"
                      placeholder={"4.000.000"}
                      onChange={(e) => {
                        const newValue = parseNumber(e.target.value);
                        if (newValue && newValue > 0) {
                          formik.setFieldValue("to_ter", newValue);
                        } else {
                          formik.setFieldValue("to_ter", "");
                        }
                      }}
                      value={
                        formik.values.to_ter === ""
                          ? ""
                          : formatNumber(formik.values.to_ter)
                      }
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {formik.errors.to_ter as string}
                  </FormErrorMessage>
                </FormControl>
              </Wrap>

              <FormControl
                flex={"1 1"}
                isInvalid={formik.errors.percentage_ter ? true : false}
              >
                <FormLabel>
                  Rate TER
                  <RequiredForm />
                </FormLabel>
                <InputGroup>
                  <Input
                    name="percentage_ter"
                    placeholder={"2.5"}
                    type="number"
                    onChange={(e) => {
                      formik.setFieldValue("percentage_ter", e.target.value);
                    }}
                    value={formik.values.percentage_ter}
                  />
                  <InputRightElement>
                    <Text>%</Text>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.percentage_ter as string}
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
