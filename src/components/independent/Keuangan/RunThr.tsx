import {
  Button,
  ButtonProps,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import MultiSelectKaryawan from "../../dependent/_Select/MultiSelectKaryawan";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";

interface Props extends ButtonProps {}

export default function RunThr({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { karyawan_list: [], tanggal: "" },
    validationSchema: yup.object().shape({
      karyawan_list: yup.array().min(1, "Harus diisi").required("Harus diisi"),
      tanggal: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
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
        Run THR
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
          <ModalHeader ref={initialRef}>Run THR</ModalHeader>
          <ModalBody>
            <Checkbox colorScheme="ap" mb={4}>
              Semua Karyawan
            </Checkbox>

            <form id="runThrForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.karyawan_list}>
                <FormLabel>
                  Karyawan
                  <FormRequired />
                </FormLabel>
                <MultiSelectKaryawan
                  formik={formik}
                  name="karyawan_list"
                  placeholder="Pilih Multi Karyawan"
                  initialSelected={formik.values.karyawan_list}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.karyawan_list as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formik.errors.tanggal}>
                <FormLabel>
                  Tanggal
                  <FormRequired />
                </FormLabel>
                <DatePicker
                  formik={formik}
                  name="tanggal"
                  dateValue={formik.values.tanggal}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.tanggal as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="runThrForm"
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
