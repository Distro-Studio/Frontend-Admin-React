import {
  Button,
  ButtonGroup,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
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
import backOnClose from "../../../lib/backOnCloseOld";
import useBackOnClose from "../../../lib/useBackOnClose";
import MultiSelectKaryawan from "../../dependent/_Select/MultiSelectKaryawan";
import SelectShift from "../../dependent/_Select/SelectShift";
import DisclosureHeader from "../../dependent/DisclosureHeader";
import DatePickerModal from "../../dependent/input/DatePickerModal";
import RequiredForm from "../../form/RequiredForm";

interface Props extends ButtonProps {}

export default function TerapkanJadwalModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      karyawan_list: [],
      tgl_mulai: "",
      tgl_selesai: "",
      shift: "" as any,
    },
    validationSchema: yup.object().shape({
      karyawan_list: yup.array().min(1, "Harus diisi").required("Harus diisi"),
      tgl_mulai: yup.string().required("Harus diisi"),
      tgl_selesai: yup.string().required("Harus diisi"),
      shift: yup.object().required("Harus diisi"),
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
        Terapkan Jadwal
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
          <ModalHeader p={0} ref={initialRef}>
            <DisclosureHeader title="Terapkan Jadwal" />
          </ModalHeader>
          <ModalBody>
            <form id="terapkanJadwalForm" onSubmit={formik.handleSubmit}>
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
                />
                <FormErrorMessage>
                  {formik.errors.karyawan_list as string}
                </FormErrorMessage>
              </FormControl>

              <SimpleGrid columns={[1, 2]} gap={4}>
                <FormControl mb={4} isInvalid={!!formik.errors.tgl_mulai}>
                  <FormLabel>
                    Tanggal Mulai
                    <RequiredForm />
                  </FormLabel>
                  <DatePickerModal
                    id="terapkan-jadwal-tanggal-mulai"
                    name="tgl_mulai"
                    onConfirm={(input) => {
                      formik.setFieldValue("tgl_mulai", input);
                    }}
                    inputValue={
                      formik.values.tgl_mulai
                        ? new Date(formik.values.tgl_mulai)
                        : undefined
                    }
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl_mulai as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={formik.errors.tgl_selesai ? true : false}
                >
                  <FormLabel>
                    Tanggal Selesai
                    <RequiredForm />
                  </FormLabel>
                  <DatePickerModal
                    id="terapkan-jadwal-tgl-selesai"
                    name="tgl_selesai"
                    onConfirm={(input) => {
                      formik.setFieldValue("tgl_selesai", input);
                    }}
                    inputValue={
                      formik.values.tgl_selesai
                        ? new Date(formik.values.tgl_selesai)
                        : undefined
                    }
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl_selesai as string}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={!!formik.errors.shift}>
                <FormLabel>
                  Pilih Shift
                  <RequiredForm />
                </FormLabel>
                <SelectShift
                  formik={formik}
                  name="shift"
                  placeholder="Pilih shift"
                  initialSelected={formik.values.shift}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.shift as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                type="submit"
                form="terapkanJadwalForm"
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
              >
                Simpan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
