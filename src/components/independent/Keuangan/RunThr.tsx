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
import { useRef, useState } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnCloseOld";
import useBackOnClose from "../../../lib/useBackOnClose";
import MultiSelectKaryawan from "../../dependent/_Select/MultiSelectKaryawan";
import RequiredForm from "../../form/RequiredForm";
import DatePickerModal from "../../dependent/input/DatePickerModal";

interface Props extends ButtonProps {}

export default function RunThr({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const [semuaKaryawan, setSemuaKaryawan] = useState<boolean>(false);

  const formik = useFormik({
    validateOnChange: semuaKaryawan,
    initialValues: { semua_karyawan: false, karyawan_list: [], tanggal: "" },
    validationSchema: yup.object().shape({
      semua_karyawan: yup.boolean(),
      karyawan_list: semuaKaryawan
        ? yup.mixed()
        : yup.array().min(1, "Harus diisi").required("Harus diisi"),
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
          formik.resetForm();
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Run THR</ModalHeader>
          <ModalBody>
            <Checkbox
              name="semua_karyawan"
              onChange={() => {
                setSemuaKaryawan((ps) => !ps);
              }}
              isChecked={semuaKaryawan}
              colorScheme="ap"
              mb={4}
            >
              Semua Karyawan
            </Checkbox>

            <form id="runThrForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.karyawan_list}>
                <FormLabel>
                  Karyawan
                  <RequiredForm />
                </FormLabel>
                <MultiSelectKaryawan
                  formik={formik}
                  name="karyawan_list"
                  placeholder="Pilih Multi Karyawan"
                  initialSelected={formik.values.karyawan_list}
                  noUseBackOnClose
                  isDisabled={formik.values.semua_karyawan}
                />
                <FormErrorMessage>
                  {formik.errors.karyawan_list as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formik.errors.tanggal}>
                <FormLabel>
                  Tanggal
                  <RequiredForm />
                </FormLabel>
                <DatePickerModal
                  id="tanggal-run-thr-date-picker"
                  name="tanggal"
                  onConfirm={(input) => {
                    formik.setFieldValue("tanggal", input);
                  }}
                  inputValue={
                    formik.values.tanggal
                      ? new Date(formik.values.tanggal)
                      : undefined
                  }
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
