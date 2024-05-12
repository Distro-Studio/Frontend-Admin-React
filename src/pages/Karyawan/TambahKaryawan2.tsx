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
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import FormRequired from "../../components/form/FormRequired";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function TambahKaryawan2() {
  const steps = [
    { title: "Data Karyawan" },
    { title: "Penggajian" },
    { title: "Akun Karywan" },
  ];
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      kelompok_gaji: "",
      no_rekening: "",
      tunjangan_uang_lembur: "",
      tunjangan_fungsional: "",
      tunjangan_khusus: "",
      tunjangan_lainnya: "",
      uang_lembur: "",
      unag_makan: "",
      //TODO lagi ditanyakan PTKP
      PTKP: "",
    },
    validationSchema: yup.object().shape({
      kelompok_gaji: yup.string().required("Harus diisi"),
      no_rekening: yup.string().required("Harus diisi"),
      tunjangan_uang_lembur: yup.string().required("Harus diisi"),
      tunjangan_fungsional: yup.string().required("Harus diisi"),
      tunjangan_khusus: yup.string().required("Harus diisi"),
      tunjangan_lainnya: yup.string().required("Harus diisi"),
      uang_lembur: yup.string().required("Harus diisi"),
      unag_makan: yup.string().required("Harus diisi"),
      PTKP: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      //TODO api post tambah karyawan step 1
    },
  });

  return (
    <CWrapper maxW={"800px"} mx={"auto"} mt={12}>
      <Stepper index={1} colorScheme="ap" mb={6}>
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
              <StepTitle>
                <Text fontWeight={600}>{step.title}</Text>
              </StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
        <Text fontSize={22} fontWeight={600}>
          Penggajian
        </Text>

        <Text opacity={0.6} mb={6}>
          Silahkan Isi Semua Data Informasi Dasar Karyawan
        </Text>

        <form id="tambahKaryawanForm1" onSubmit={formik.handleSubmit}>
          <Wrap spacingX={4}>
            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.kelompok_gaji ? true : false}
            >
              <FormLabel>
                Kelompok Gaji
                <FormRequired />
              </FormLabel>
              <Input
                name="kelompok_gaji"
                placeholder="Jolitos Kurniawan"
                onChange={formik.handleChange}
                value={formik.values.kelompok_gaji}
              />
              <FormErrorMessage>{formik.errors.kelompok_gaji}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.no_rekening ? true : false}
            >
              <FormLabel>
                No. Rekening
                <FormRequired />
              </FormLabel>
              <Input
                name="no_rekening"
                placeholder="jolitos@gmail.com"
                onChange={formik.handleChange}
                value={formik.values.no_rekening}
              />
              <FormErrorMessage>{formik.errors.no_rekening}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.tunjangan_uang_lembur ? true : false}
            >
              <FormLabel>
                Tunjangan uang_lembur
                <FormRequired />
              </FormLabel>
              <Input
                name="rm"
                placeholder="871***"
                onChange={formik.handleChange}
                value={formik.values.tunjangan_uang_lembur}
              />
              <FormErrorMessage>
                {formik.errors.tunjangan_uang_lembur}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.tunjangan_fungsional ? true : false}
            >
              <FormLabel>
                Tunjangan Fungsional
                <FormRequired />
              </FormLabel>
              <Input
                name="tunjangan_fungsional"
                placeholder="019***"
                onChange={formik.handleChange}
                value={formik.values.tunjangan_fungsional}
              />
              <FormErrorMessage>
                {formik.errors.tunjangan_fungsional}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.tunjangan_khusus ? true : false}
            >
              <FormLabel>
                Tunjangan Khusus
                <FormRequired />
              </FormLabel>
              <Input
                name="tunjangan_khusus"
                placeholder="date picker"
                onChange={formik.handleChange}
                value={formik.values.tunjangan_khusus}
              />
              <FormErrorMessage>
                {formik.errors.tunjangan_khusus}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.tunjangan_lainnya ? true : false}
            >
              <FormLabel>
                Tunjangan Lainnya
                <FormRequired />
              </FormLabel>
              <Input
                name="tunjangan_lainnya"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.tunjangan_lainnya}
              />
              <FormErrorMessage>
                {formik.errors.tunjangan_lainnya}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.uang_lembur ? true : false}
            >
              <FormLabel>
                Uang Lembur
                <FormRequired />
              </FormLabel>
              <Input
                name="uang_lembur"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.uang_lembur}
              />
              <FormErrorMessage>{formik.errors.uang_lembur}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.unag_makan ? true : false}
            >
              <FormLabel>
                Uang Makan
                <FormRequired />
              </FormLabel>
              <Input
                name="unag_makan"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.unag_makan}
              />
              <FormErrorMessage>{formik.errors.unag_makan}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.PTKP ? true : false}
            >
              <FormLabel>
                PTKP
                <FormRequired />
              </FormLabel>
              <Input
                name="PTKP"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.PTKP}
              />
              <FormErrorMessage>{formik.errors.PTKP}</FormErrorMessage>
            </FormControl>
          </Wrap>
        </form>

        <ButtonGroup mt={2}>
          <Button
            h={"50px"}
            w={"100%"}
            className="btn-solid clicky"
            as={Link}
            to={"/karyawan/tambah-karyawan-1"}
          >
            Kembali
          </Button>
          <Button
            type="submit"
            form="tambahKaryawanForm1"
            h={"50px"}
            w={"100%"}
            colorScheme="ap"
            className="btn-ap clicky"
            as={Link}
            to={"/karyawan/tambah-karyawan-3"}
          >
            Lanjut
          </Button>
        </ButtonGroup>
      </CContainer>
    </CWrapper>
  );
}
