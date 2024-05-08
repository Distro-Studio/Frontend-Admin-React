import { useFormik } from "formik";
import { Pengumuman__Interface } from "../../../const/interfaces";
import * as yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import FormRequired from "../FormRequired";
import Textarea from "../../input/Textarea";

interface Props {
  data: Pengumuman__Interface;
}

export default function FormDashboardPengumumanUpdate({ data }: Props) {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: { judul: "", pengumuman: "" },
    validationSchema: yup.object().shape({
      judul: yup.string().required("Judul harus diisi"),
      pengumuman: yup.string().required("Pengumuman harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <form id="updatePengumumanForm" onSubmit={formik.handleSubmit}>
      <FormControl mb={4} isInvalid={formik.errors.judul ? true : false}>
        <FormLabel>
          Judul
          <FormRequired />
        </FormLabel>
        <Input name="judul" placeholder="Judul Pengumuman" />
        <FormErrorMessage>{formik.errors.judul}</FormErrorMessage>
      </FormControl>

      <FormControl mb={4} isInvalid={formik.errors.pengumuman ? true : false}>
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
