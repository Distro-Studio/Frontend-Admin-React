import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import Textarea from "../../input/Textarea";
import FormRequired from "../FormRequired";

export default function FormDashboardBuatPengumuman() {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: { judul: "", pengumuman: "" },
    validationSchema: yup.object().shape({
      judul: yup.string().required("Judul harus diisi"),
      pengumuman: yup.string().required("Pengumuman harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      // TODO api create pengumuman
    },
  });

  return (
    <form id="buatPengumumanForm" onSubmit={formik.handleSubmit}>
      <FormControl mb={4} isInvalid={formik.errors.judul ? true : false}>
        <FormLabel>
          Judul
          <FormRequired />
        </FormLabel>
        <Input
          name="judul"
          placeholder="Judul Pengumuman"
          onChange={formik.handleChange}
          value={formik.values.judul}
        />
        <FormErrorMessage>{formik.errors.judul}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.errors.pengumuman ? true : false}>
        <FormLabel>
          Pengumuman
          <FormRequired />
        </FormLabel>
        <Textarea
          formik={formik}
          name="pengumuman"
          placeholder="Isi pengumuman"
        />
        <FormErrorMessage>{formik.errors.pengumuman}</FormErrorMessage>
      </FormControl>
    </form>
  );
}
