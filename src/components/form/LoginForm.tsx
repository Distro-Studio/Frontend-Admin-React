import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import RequiredForm from "./RequiredForm";

export default function LoginForm() {
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
    <form id="loginForm" onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={formik.errors.username ? true : false} mb={4}>
        <FormLabel>
          Username
          <RequiredForm />
        </FormLabel>
        <Input
          name="username"
          placeholder={"Username"}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.errors.password ? true : false} mb={8}>
        <FormLabel>
          Password
          <RequiredForm />
        </FormLabel>
        <PasswordInput
          formik={formik}
          name="password"
          placeholder={"Password"}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        form="loginForm"
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
