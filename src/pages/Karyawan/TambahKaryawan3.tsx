import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import FormRequired from "../../components/form/FormRequired";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";

export default function TambahKaryawan3() {
  const steps = [
    { title: "Data Karyawan" },
    { title: "Penggajian" },
    { title: "Akun Karywan" },
  ];
  const activeStepText = steps[2].title;
  const sw = useScreenWidth();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Harus diisi"),
      password: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      //TODO api post tambah karyawan step 1
    },
  });

  return (
    <CWrapper maxW={"800px"} mx={"auto"} mt={12}>
      <Stepper index={2} colorScheme="ap" mb={6}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{sw >= 768 && <Text>{step.title}</Text>}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {sw < 768 && (
        <Text mb={6}>
          Step 3 : <b>{activeStepText}</b>
        </Text>
      )}

      <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
        <Text fontSize={22} fontWeight={600}>
          Penggajian
        </Text>

        <Text opacity={0.6} mb={6}>
          Silahkan Isi Semua Data Informasi Dasar Karyawan
        </Text>

        <form id="tambahKaryawanForm1" onSubmit={formik.handleSubmit}>
          <FormControl
            mb={4}
            flex={"1 1 300px"}
            isInvalid={formik.errors.username ? true : false}
          >
            <FormLabel>
              Username
              <FormRequired />
            </FormLabel>
            <Input
              name="username"
              placeholder="Jolitos Kurniawan"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl
            mb={4}
            flex={"1 1 300px"}
            isInvalid={formik.errors.password ? true : false}
          >
            <FormLabel>
              Kata Sandi
              <FormRequired />
            </FormLabel>
            <Input
              name="password"
              placeholder="jolitos@gmail.com"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
        </form>

        <ButtonGroup mt={2}>
          <Button
            w={"100%"}
            h={"50px"}
            className="btn-solid clicky"
            as={Link}
            to={"/karyawan/tambah-karyawan-2"}
          >
            Kembali
          </Button>
          <Button
            h={"50px"}
            type="submit"
            form="tambahKaryawanForm1"
            w={"100%"}
            colorScheme="ap"
            className="btn-ap clicky"
          >
            Simpan
          </Button>
        </ButtonGroup>
      </CContainer>
    </CWrapper>
  );
}
