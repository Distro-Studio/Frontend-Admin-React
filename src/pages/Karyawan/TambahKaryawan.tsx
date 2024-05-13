import {
  Box,
  Button,
  ButtonGroup,
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
  useSteps,
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import FormRequired from "../../components/form/FormRequired";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";

export default function TambahKaryawan() {
  const steps = [
    { title: "Data Karyawan" },
    { title: "Penggajian" },
    { title: "Akun Karywan" },
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
      unag_makan: "",
      //TODO lagi ditanyakan PTKP
      PTKP: "",
      username: "",
      password: "",
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
      kelompok_gaji: yup.string().required("Harus diisi"),
      no_rekening: yup.string().required("Harus diisi"),
      tunjangan_uang_lembur: yup.string().required("Harus diisi"),
      tunjangan_fungsional: yup.string().required("Harus diisi"),
      tunjangan_khusus: yup.string().required("Harus diisi"),
      tunjangan_lainnya: yup.string().required("Harus diisi"),
      uang_lembur: yup.string().required("Harus diisi"),
      unag_makan: yup.string().required("Harus diisi"),
      PTKP: yup.string().required("Harus diisi"),
      username: yup.string().required("Harus diisi"),
      password: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      //TODO api post tambah karyawan step 1
    },
  });

  const Step1 = () => {
    return (
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
            Jika karyawan tidak memiliki kompetensi atau profesi pilih tidak ada
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

        <Text flex={"1 1 300px"} opacity={"0"}>
          Spacer
        </Text>
      </Wrap>
    );
  };
  const Step1Footer = () => {
    return (
      <Button
        mt={2}
        w={"100%"}
        colorScheme="ap"
        className="btn-ap clicky"
        h={"50px"}
        onClick={() => {
          setActiveStep(1);
        }}
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
          <FormErrorMessage>{formik.errors.tunjangan_khusus}</FormErrorMessage>
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
          <FormErrorMessage>{formik.errors.tunjangan_lainnya}</FormErrorMessage>
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
    );
  };
  const Step2Footer = () => {
    return (
      <ButtonGroup mt={2}>
        <Button
          h={"50px"}
          w={"100%"}
          className="btn-solid clicky"
          onClick={() => {
            setActiveStep(0);
          }}
        >
          Kembali
        </Button>
        <Button
          h={"50px"}
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
          onClick={() => {
            setActiveStep(2);
          }}
        >
          Lanjut
        </Button>
      </ButtonGroup>
    );
  };

  const Step3 = () => {
    return (
      <>
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
      </>
    );
  };
  const Step3Footer = () => {
    return (
      <ButtonGroup mt={2}>
        <Button
          w={"100%"}
          h={"50px"}
          className="btn-solid clicky"
          onClick={() => {
            setActiveStep(1);
          }}
        >
          Kembali
        </Button>
        <Button
          h={"50px"}
          type={activeStep === 2 ? "submit" : "button"} // Hanya bertindak sebagai submit di langkah terakhir
          form="tambahKaryawanForm"
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
        >
          Simpan
        </Button>
      </ButtonGroup>
    );
  };

  const stepComponents = [<Step1 />, <Step2 />, <Step3 />];
  const stepFooterComponents = [
    <Step1Footer />,
    <Step2Footer />,
    <Step3Footer />,
  ];

  return (
    <CWrapper maxW={"800px"} mx={"auto"} my={12}>
      <Stepper
        // orientation="vertical"
        // h={"200px"}
        index={activeStep}
        colorScheme="ap"
        mb={6}
      >
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
          Data Karyawan
        </Text>

        <Text opacity={0.6} mb={6}>
          Silahkan Isi Semua Data Informasi Dasar Karyawan
        </Text>

        <form id="tambahKaryawanForm" onSubmit={formik.handleSubmit}>
          {stepComponents[activeStep]}
        </form>

        {stepFooterComponents[activeStep]}
      </CContainer>
    </CWrapper>
  );
}
