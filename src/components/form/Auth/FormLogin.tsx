import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import PasswordInput from "../../dependent/input/PasswordInput";
import StringInput from "../../dependent/input/StringInput";
import RequiredForm from "../RequiredForm";

export default function FormLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    validateOnChange: false,

    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: yup.object().shape({
      username: yup.string().required("Username harus diisi"),
      password: yup.string().required("Password harus diisi"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);

      //TODO api login tod
      navigate("/dashboard");
    },
  });

  return (
    <form id="FormLogin" onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={formik.errors.username ? true : false} mb={4}>
        <FormLabel>
          Username
          <RequiredForm />
        </FormLabel>
        <StringInput
          name="username"
          placeholder={"Username"}
          onChangeSetter={(input) => {
            formik.setFieldValue("username", input);
          }}
          inputValue={formik.values.username}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.errors.password ? true : false} mb={8}>
        <FormLabel>
          Password
          <RequiredForm />
        </FormLabel>
        <PasswordInput
          name="password"
          onChangeSetter={(input) => {
            formik.setFieldValue("password", input);
          }}
          inputValue={formik.values.password}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        form="FormLogin"
        colorScheme="ap"
        className="btn-ap clicky"
        w={"100%"}
        isLoading={loading}
      >
        Login
      </Button>
    </form>
  );
}
