import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useSteps,
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import SelectJabatan from "../../components/dependent/_Select/SelectJabatan";
import SelectKelompokGaji from "../../components/dependent/_Select/SelectKelompokGaji";
import SelectKompetensi from "../../components/dependent/_Select/SelectKompetensi";
import SelectPtkp from "../../components/dependent/_Select/SelectPtkp";
import SelectRole from "../../components/dependent/_Select/SelectRole";
import SelectUnitKerja from "../../components/dependent/_Select/SelectUnitKerja";
import FormRequired from "../../components/form/FormRequired";
import DatePicker from "../../components/input/DatePicker";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";
const validationSchemaStep1 = yup.object({
  // nama_karyawan: yup.string().required("Harus diisi"),
  // email: yup.string().email("Email tidak valid").required("Harus diisi"),
  // rm: yup.string().required("Harus diisi"),
  // no_manulife: yup.string().required("Harus diisi"),
  // tgl_masuk: yup.string().required("Harus diisi"),
  // unit_kerja: yup.string().required("Harus diisi"),
  // jabatan: yup.string().required("Harus diisi"),
  // kompetensi: yup.string(),
  // role: yup.string().required("Harus diisi"),
});

const validationSchemaStep2 = yup.object({
  // kelompok_gaji: yup.string().required("Harus diisi"),
  // no_rekening: yup.string().required("Harus diisi"),
  // tunjangan_uang_lembur: yup.string().required("Harus diisi"),
  // tunjangan_fungsional: yup.string().required("Harus diisi"),
  // tunjangan_khusus: yup.string().required("Harus diisi"),
  // tunjangan_lainnya: yup.string().required("Harus diisi"),
  // uang_lembur: yup.string().required("Harus diisi"),
  // uang_makan: yup.string().required("Harus diisi"),
  // PTKP: yup.string().required("Harus diisi"),
});

const validationSchemaStep3 = yup.object({
  username: yup.string().required("Harus diisi"),
  password: yup.string().required("Harus diisi"),
});

export default function TambahKaryawan() {
  const steps = [
    { title: "Data Karyawan" },
    { title: "Penggajian" },
    { title: "Akun Karyawan" },
  ];
  const { activeStep, setActiveStep } = useSteps();
  const activeStepText = steps[activeStep].title;

  const sw = useScreenWidth();

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
      kelompok_gaji: "",
      no_rekening: "",
      tunjangan_uang_lembur: "",
      tunjangan_fungsional: "",
      tunjangan_khusus: "",
      tunjangan_lainnya: "",
      uang_lembur: "",
      uang_makan: "",
      PTKP: "",
      username: "",
      password: "",
    },
    validationSchema: getValidationSchema(activeStep),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //TODO api post tambah karyawan step 1
    },
  });

  function getValidationSchema(step: number) {
    switch (step) {
      case 0:
        return validationSchemaStep1;
      case 1:
        return validationSchemaStep2;
      case 2:
        return validationSchemaStep3;
      default:
        return validationSchemaStep1;
    }
  }

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        setActiveStep(activeStep + 1);
      } else {
        const touchedErrors: Record<string, boolean> = {};
        Object.keys(errors).forEach((key) => {
          touchedErrors[key] = true;
        });
        formik.setTouched(touchedErrors);
      }
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const Step1 = () => {
    return (
      <Wrap spacingX={4}>
        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.nama_karyawan}
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
          isInvalid={!!formik.errors.email}
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
          <FormHelperText opacity={0.4}>
            Email ini digunakan untuk masuk (login)
          </FormHelperText>
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.rm}>
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
          isInvalid={!!formik.errors.no_manulife}
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
          isInvalid={!!formik.errors.tgl_masuk}
        >
          <FormLabel>
            Tanggal Masuk
            <FormRequired />
          </FormLabel>
          <DatePicker
            name="tgl_masuk"
            formik={formik}
            placeholder="Pilih tanggal"
            dateValue={formik.values.tgl_masuk}
          />
          <FormErrorMessage>{formik.errors.tgl_masuk}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.unit_kerja}
        >
          <FormLabel>
            Unit Kerja
            <FormRequired />
          </FormLabel>
          <SelectUnitKerja
            name="unit_kerja"
            formik={formik}
            placeholder="Pilih Unit kerja"
          />
          <FormErrorMessage>{formik.errors.unit_kerja}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.jabatan}
        >
          <FormLabel>
            Jabatan
            <FormRequired />
          </FormLabel>
          <SelectJabatan
            name="jabatan"
            formik={formik}
            placeholder="Pilih Jabatan"
          />
          <FormErrorMessage>{formik.errors.jabatan}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.kompetensi}
        >
          <FormLabel>Kompetensi Profesi</FormLabel>
          <SelectKompetensi
            name="kompetensi"
            formik={formik}
            placeholder="Pilih Kompetensi"
          />
          <FormHelperText opacity={0.4}>
            Jika karyawan tidak memiliki kompetensi atau profesi pilih tidak ada
          </FormHelperText>
          <FormErrorMessage>{formik.errors.kompetensi}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.role}>
          <FormLabel>
            Role
            <FormRequired />
          </FormLabel>
          <SelectRole name="role" formik={formik} placeholder="Pilih Role" />
          <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
        </FormControl>
      </Wrap>
    );
  };

  const Step1Footer = () => {
    return (
      <Button
        mt={"auto"}
        w={"100%"}
        colorScheme="ap"
        className="btn-ap clicky"
        h={"50px"}
        onClick={handleNext}
      >
        Lanjut
      </Button>
    );
  };

  const Step2 = () => {
    return (
      <Wrap spacingX={4}>
        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.kelompok_gaji}
        >
          <FormLabel>
            Kelompok Gaji
            <FormRequired />
          </FormLabel>
          <SelectKelompokGaji
            name="kelompok_gaji"
            formik={formik}
            placeholder="Pilih Kelompok Gaji"
          />
          <FormErrorMessage>{formik.errors.kelompok_gaji}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.no_rekening}
        >
          <FormLabel>
            Nomor Rekening
            <FormRequired />
          </FormLabel>
          <Input
            name="no_rekening"
            placeholder="09182*****"
            onChange={formik.handleChange}
            value={formik.values.no_rekening}
          />
          <FormErrorMessage>{formik.errors.no_rekening}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.tunjangan_uang_lembur}
        >
          <FormLabel>
            Tunjangan Uang Lembur
            <FormRequired />
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Text>Rp</Text>
            </InputLeftElement>
            <Input
              name="tunjangan_uang_lembur"
              placeholder="Rp. 500.000"
              onChange={formik.handleChange}
              value={formik.values.tunjangan_uang_lembur}
            />
          </InputGroup>
          <FormErrorMessage>
            {formik.errors.tunjangan_uang_lembur}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.tunjangan_fungsional}
        >
          <FormLabel>
            Tunjangan Fungsional
            <FormRequired />
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Text>Rp</Text>
            </InputLeftElement>
            <Input
              name="tunjangan_fungsional"
              placeholder="Rp. 500.000"
              onChange={formik.handleChange}
              value={formik.values.tunjangan_fungsional}
            />
          </InputGroup>
          <FormErrorMessage>
            {formik.errors.tunjangan_fungsional}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.tunjangan_khusus}
        >
          <FormLabel>
            Tunjangan Khusus
            <FormRequired />
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Text>Rp</Text>
            </InputLeftElement>
            <Input
              name="tunjangan_khusus"
              placeholder="Rp. 500.000"
              onChange={formik.handleChange}
              value={formik.values.tunjangan_khusus}
            />
          </InputGroup>
          <FormErrorMessage>{formik.errors.tunjangan_khusus}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.tunjangan_lainnya}
        >
          <FormLabel>
            Tunjangan Lainnya
            <FormRequired />
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Text>Rp</Text>
            </InputLeftElement>
            <Input
              name="tunjangan_lainnya"
              placeholder="Rp. 500.000"
              onChange={formik.handleChange}
              value={formik.values.tunjangan_lainnya}
            />
          </InputGroup>
          <FormErrorMessage>{formik.errors.tunjangan_lainnya}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.uang_lembur}
        >
          <FormLabel>
            Uang Lembur
            <FormRequired />
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Text>Rp</Text>
            </InputLeftElement>
            <Input
              name="uang_lembur"
              placeholder="Rp. 500.000"
              onChange={formik.handleChange}
              value={formik.values.uang_lembur}
            />
          </InputGroup>
          <FormErrorMessage>{formik.errors.uang_lembur}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.uang_makan}
        >
          <FormLabel>
            Uang Makan
            <FormRequired />
          </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Text>Rp</Text>
            </InputLeftElement>
            <Input
              name="uang_makan"
              placeholder="Rp. 500.000"
              onChange={formik.handleChange}
              value={formik.values.uang_makan}
            />
          </InputGroup>
          <FormErrorMessage>{formik.errors.uang_makan}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.PTKP}>
          <FormLabel>
            PTKP
            <FormRequired />
          </FormLabel>
          <SelectPtkp name="PTKP" formik={formik} placeholder="Pilih PTKP" />
          <FormErrorMessage>{formik.errors.PTKP}</FormErrorMessage>
        </FormControl>
      </Wrap>
    );
  };

  const Step2Footer = () => {
    return (
      <ButtonGroup mt={"auto"} w={"100%"}>
        <Button
          w={"100%"}
          className="btn-solid clicky"
          h={"50px"}
          onClick={handleBack}
        >
          Sebelumnya
        </Button>
        <Button
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
          h={"50px"}
          onClick={handleNext}
        >
          Lanjut
        </Button>
      </ButtonGroup>
    );
  };

  const Step3 = () => {
    return (
      <>
        <FormControl mb={4} isInvalid={!!formik.errors.username}>
          <FormLabel>
            Username
            <FormRequired />
          </FormLabel>
          <InputGroup>
            <HStack w={"100%"}>
              <Input
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <Button colorScheme="ap" variant={"outline"} className="clicky">
                Generate
              </Button>
            </HStack>
          </InputGroup>
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} isInvalid={!!formik.errors.password}>
          <FormLabel>
            Password
            <FormRequired />
          </FormLabel>
          <HStack w={"100%"}>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Button colorScheme="ap" variant={"outline"} className="clicky">
              Generate
            </Button>
          </HStack>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
      </>
    );
  };

  const Step3Footer = () => {
    return (
      <ButtonGroup mt={"auto"} w={"100%"}>
        <Button
          w={"100%"}
          className="btn-solid clicky"
          h={"50px"}
          onClick={handleBack}
        >
          Sebelumnya
        </Button>
        <Button
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
          h={"50px"}
          type="submit"
          form="tambahKaryawanForm"
        >
          Tambah Karyawan
        </Button>
      </ButtonGroup>
    );
  };

  const stepComponents = [Step1, Step2, Step3];
  const stepFooterComponents = [Step1Footer, Step2Footer, Step3Footer];

  return (
    <CWrapper maxW={"800px"} mx={"auto"} my={12}>
      <Stepper index={activeStep} colorScheme="ap" mb={6}>
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
          Step {activeStep + 1} : <b>{activeStepText}</b>
        </Text>
      )}

      <CContainer
        p={responsiveSpacing}
        bg={useBodyColor()}
        borderRadius={12}
        overflowY={"auto"}
        flex={1}
      >
        <Text fontSize={22} fontWeight={600}>
          {steps[activeStep].title}
        </Text>
        <Text opacity={0.6} mb={6}>
          Silahkan Isi Semua Data Informasi Dasar Karyawan
        </Text>

        <form id="tambahKaryawanForm" onSubmit={formik.handleSubmit}>
          {stepComponents[activeStep]()}
        </form>

        {stepFooterComponents[activeStep]()}
      </CContainer>
    </CWrapper>
  );
}
