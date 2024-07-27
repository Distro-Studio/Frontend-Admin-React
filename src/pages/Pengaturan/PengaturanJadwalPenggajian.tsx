import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import DatePickerModal from "../../components/dependent/input/DatePickerModal";
import RequiredForm from "../../components/form/RequiredForm";
import CContainer from "../../components/wrapper/CContainer";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanJadwalPenggajian() {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: { tanggal: "" },
    validationSchema: yup
      .object()
      .shape({ tanggal: yup.string().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //TODO simpan jadwal penggajian
    },
  });
  return (
    <CContainer
      p={responsiveSpacing}
      bg={useBodyColor()}
      borderRadius={12}
      flex={"1 1 600px"}
      overflowX={"auto"}
      h={"100%"}
    >
      <form id="pengaturanJadwalPenggajianForm" onSubmit={formik.handleSubmit}>
        <FormControl mb={4} isInvalid={formik.errors.tanggal ? true : false}>
          <FormLabel>
            Tanggal Penggajian
            <RequiredForm />
          </FormLabel>
          <DatePickerModal
            id="date-picker-jadwal-penggajian"
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
          <FormErrorMessage>{formik.errors.tanggal as string}</FormErrorMessage>
        </FormControl>
      </form>
      <Button
        mt={"auto"}
        ml={"auto"}
        w={"120px"}
        className="btn-ap clicky"
        colorScheme="ap"
        type="submit"
        form="pengaturanJadwalPenggajianForm"
      >
        Simpan
      </Button>
    </CContainer>
  );
}
