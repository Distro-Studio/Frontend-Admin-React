import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
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
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import SelectKaryawan from "../../dependent/_Select/SelectKaryawan";
import SelectKompensasi from "../../dependent/_Select/SelectKompensasi";
import SelectShift from "../../dependent/_Select/SelectShift";
import SelectTipeCuti from "../../dependent/_Select/SelectTipeCuti";
import FormRequired from "../../form/FormRequired";
import Textarea from "../../input/Textarea";

interface Props extends ButtonProps {}

export default function AjukanLemburModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      user_id: "",
      shift: "",
      kompensasi: "",
      tipe: "",
      durasi_jam: "" as any,
      durasi_menit: "" as any,
      catatan: "",
    },
    validationSchema: yup.object().shape({
      user_id: yup.string().required("Harus diisi"),
      shift: yup.string().required("Harus diisi"),
      kompensasi: yup.string().required("Harus diisi"),
      tipe: yup.string().required("Harus diisi"),
      durasi_jam: yup.string().required("Harus diisi"),
      durasi_menit: yup.string().required("Harus diisi"),
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
        {...props}
      >
        Ajukan Lembur
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
          <ModalHeader ref={initialRef}>Ajukan Lembur</ModalHeader>
          <ModalBody>
            <form id="ajukanLemburForm">
              <FormControl mb={4} isInvalid={!!formik.errors.user_id}>
                <FormLabel>
                  Karyawan
                  <FormRequired />
                </FormLabel>
                <SelectKaryawan
                  name="user_id"
                  formik={formik}
                  placeholder="Pilih Karyawan"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.user_id as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.shift}>
                <FormLabel>
                  Shift
                  <FormRequired />
                </FormLabel>
                <SelectShift
                  name="shift"
                  formik={formik}
                  placeholder="Pilih Shift"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.shift as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl mb={4} isInvalid={!!formik.errors.kompensasi}>
                <FormLabel>
                  Kompensasi
                  <FormRequired />
                </FormLabel>
                <SelectKompensasi
                  name="kompensasi"
                  formik={formik}
                  placeholder="Pilih Kompensasi"
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
                    <FormRequired />
                  </FormLabel>
                  <SelectTipeCuti
                    name="tipe"
                    formik={formik}
                    placeholder="Pilih Tipe"
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.tipe as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb={4} isInvalid={!!formik.errors.durasi_jam}>
                  <FormLabel>
                    Durasi
                    <FormRequired />
                  </FormLabel>
                  <HStack>
                    <Input
                      name="durasi_jam"
                      placeholder="hh"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (formik.values.durasi_jam === 0 && value === "0")
                        ) {
                          formik.setFieldValue("durasi_jam", "");
                        } else {
                          const numValue = parseInt(value);
                          if (numValue < 24) {
                            formik.setFieldValue("durasi_jam", numValue);
                          }
                        }
                      }}
                      value={
                        formik.values.durasi_jam === ""
                          ? ""
                          : formik.values.durasi_jam.toString().padStart(2, "0")
                      }
                    />

                    <Input
                      name="durasi_menit"
                      placeholder="mm"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (formik.values.durasi_menit === 0 && value === "0")
                        ) {
                          formik.setFieldValue("durasi_menit", "");
                        } else {
                          const numValue = parseInt(value);
                          if (numValue < 60) {
                            formik.setFieldValue("durasi_menit", numValue);
                          }
                        }
                      }}
                      value={
                        formik.values.durasi_menit === ""
                          ? ""
                          : formik.values.durasi_menit
                              .toString()
                              .padStart(2, "0")
                      }
                    />
                  </HStack>
                  <FormErrorMessage>
                    {formik.errors.durasi_jam as string}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={!!formik.errors.catatan}>
                <FormLabel>
                  Catatan
                  <FormRequired />
                </FormLabel>
                <Textarea
                  name="catatan"
                  formik={formik}
                  placeholder="TUlis catatan untuk karyawan"
                />
                <FormErrorMessage>
                  {formik.errors.catatan as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
