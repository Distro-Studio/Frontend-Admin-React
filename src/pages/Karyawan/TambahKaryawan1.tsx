import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
import * as yup from "yup";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import FormRequired from "../../components/form/FormRequired";
import { Link } from "react-router-dom";

export default function TambahKaryawan1() {
  const steps = [
    { title: "Data Karyawan" },
    { title: "Penggajian" },
    { title: "Akun Karywan" },
  ];
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama_karyawan: "",
      email: "",
      rm: "",
      no_manulife: "",
      tgl_masuk: "",
      unit_kerja: "",
      jabatan: "",
      kompetensi: "",
      role: "",
    },
    validationSchema: yup.object().shape({
      nama_karyawan: yup.string().required("Harus diisi"),
      email: yup.string().required("Harus diisi"),
      rm: yup.string().required("Harus diisi"),
      no_manulife: yup.string().required("Harus diisi"),
      tgl_masuk: yup.string().required("Harus diisi"),
      unit_kerja: yup.string().required("Harus diisi"),
      jabatan: yup.string().required("Harus diisi"),
      kompetensi: yup.string().required("Harus diisi"),
      role: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      //TODO api post tambah karyawan step 1
    },
  });

  return (
    <CWrapper maxW={"800px"} mx={"auto"} mt={12}>
      <Stepper index={0} colorScheme="ap" mb={6}>
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

      <CContainer
        p={responsiveSpacing}
        bg={useBodyColor()}
        borderRadius={12}
        overflowY={"auto"}
        flex={1}
      >
        <Text fontSize={22} fontWeight={600}>
          Data Karyawan
        </Text>

        <Text opacity={0.6} mb={6}>
          Silahkan Isi Semua Data Informasi Dasar Karyawan
        </Text>

        <form id="tambahKaryawanForm1" onSubmit={formik.handleSubmit}>
          <Wrap spacingX={4}>
            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.nama_karyawan ? true : false}
            >
              <FormLabel>
                Nama Karyawan
                <FormRequired />
              </FormLabel>
              <Input
                name="nama_karyawan"
                placeholder="Jolitos Kurniawan"
                onChange={formik.handleChange}
                value={formik.values.nama_karyawan}
              />
              <FormErrorMessage>{formik.errors.nama_karyawan}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.email ? true : false}
            >
              <FormLabel>
                Email
                <FormRequired />
              </FormLabel>
              <Input
                name="email"
                placeholder="jolitos@gmail.com"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              <FormHelperText opacity={0.4}>
                Email ini digunakan untuk masuk (login)
              </FormHelperText>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.rm ? true : false}
            >
              <FormLabel>
                RM
                <FormRequired />
              </FormLabel>
              <Input
                name="rm"
                placeholder="871***"
                onChange={formik.handleChange}
                value={formik.values.rm}
              />
              <FormErrorMessage>{formik.errors.rm}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.no_manulife ? true : false}
            >
              <FormLabel>
                No. Manulife
                <FormRequired />
              </FormLabel>
              <Input
                name="no_manulife"
                placeholder="019***"
                onChange={formik.handleChange}
                value={formik.values.no_manulife}
              />
              <FormErrorMessage>{formik.errors.no_manulife}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.tgl_masuk ? true : false}
            >
              <FormLabel>
                Tanggal Masuk
                <FormRequired />
              </FormLabel>
              <Input
                name="tgl_masuk"
                placeholder="date picker"
                onChange={formik.handleChange}
                value={formik.values.tgl_masuk}
              />
              <FormErrorMessage>{formik.errors.tgl_masuk}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.unit_kerja ? true : false}
            >
              <FormLabel>
                Unit Kerja
                <FormRequired />
              </FormLabel>
              <Input
                name="unit_kerja"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.unit_kerja}
              />
              <FormErrorMessage>{formik.errors.unit_kerja}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.jabatan ? true : false}
            >
              <FormLabel>
                Jabatan
                <FormRequired />
              </FormLabel>
              <Input
                name="jabatan"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.jabatan}
              />
              <FormErrorMessage>{formik.errors.jabatan}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.kompetensi ? true : false}
            >
              <FormLabel>
                KompetensiProfesi
                <FormRequired />
              </FormLabel>
              <Input
                name="kompetensi"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.kompetensi}
              />
              <FormHelperText opacity={0.4}>
                Jika karyawan tidak memiliki kompetensi atau profesi pilih tidak
                ada
              </FormHelperText>
              <FormErrorMessage>{formik.errors.kompetensi}</FormErrorMessage>
            </FormControl>

            <FormControl
              mb={4}
              flex={"1 1 300px"}
              isInvalid={formik.errors.role ? true : false}
            >
              <FormLabel>
                Role
                <FormRequired />
              </FormLabel>
              <Input
                name="role"
                placeholder="pilih"
                onChange={formik.handleChange}
                value={formik.values.role}
              />
              <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
            </FormControl>
          </Wrap>
        </form>

        <Button
          type="submit"
          form="tambahKaryawanForm1"
          mt={2}
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
          h={"50px"}
          as={Link}
          to={"/karyawan/tambah-karyawan-2"}
        >
          Lanjut
        </Button>
      </CContainer>
    </CWrapper>
  );
}
