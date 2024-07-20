import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  useDisclosure,
  useSteps,
} from "@chakra-ui/react";
import { RiAddFill } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import SelectJabatan from "../../components/dependent/_Select/SelectJabatan";
import SelectKelompokGaji from "../../components/dependent/_Select/SelectKelompokGaji";
import SelectKompetensi from "../../components/dependent/_Select/SelectKompetensi";
import SelectPtkp from "../../components/dependent/_Select/SelectPtkp";
import SelectRole from "../../components/dependent/_Select/SelectRole";
import SelectStatusKaryawan from "../../components/dependent/_Select/SelectStatusKaryawan";
import SelectUnitKerja from "../../components/dependent/_Select/SelectUnitKerja";
import DatePickerModal from "../../components/dependent/input/DatePickerModal";
import RequiredForm from "../../components/form/RequiredForm";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import { iconSize } from "../../constant/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import useScreenWidth from "../../lib/useScreenWidth";
import CContainer from "../wrapper/CContainer";
import DisclosureHeader from "./DisclosureHeader";

const validationSchemaStep1 = yup.object({
  // nama_karyawan: yup.string().required("Harus diisi"),
  // email: yup.string().email("Email tidak valid").required("Harus diisi"),
  // no_rm: yup.string().required("Harus diisi"),
  // no_manulife: yup.string().required("Harus diisi"),
  // tgl_masuk: yup.string().required("Harus diisi"),
  // status_karyawan: yup.mixed().required("Harus diisi"),
  // unit_kerja: yup.mixed().required("Harus diisi"),
  // jabatan: yup.mixed().required("Harus diisi"),
  // kompetensi: yup.mixed(),
  // role: yup.mixed().required("Harus diisi"),
});

const validationSchemaStep2 = yup.object({
  // kelompok_gaji: yup.mixed().required("Harus diisi"),
  // no_rekening: yup.string().required("Harus diisi"),
  // tunjangan_uang_lembur: yup.string().required("Harus diisi"),
  // tunjangan_fungsional: yup.string().required("Harus diisi"),
  // tunjangan_khusus: yup.string().required("Harus diisi"),
  // tunjangan_lainnya: yup.string().required("Harus diisi"),
  // uang_lembur: yup.string().required("Harus diisi"),
  // uang_makan: yup.string().required("Harus diisi"),
  // ptkp: yup.mixed().required("Harus diisi"),
});

const validationSchemaStep3 = yup.object({
  username: yup.string().required("Harus diisi"),
  password: yup.string().required("Harus diisi"),
});

const validationSchema = [
  validationSchemaStep1,
  validationSchemaStep2,
  validationSchemaStep3,
];

interface Props extends ButtonProps {}

export default function TambahKarsyawanModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`tambah-karyawan-modal`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

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
      no_rm: "",
      no_manulife: "",
      tgl_masuk: "",
      status_karyawan: "" as any,
      unit_kerja: "" as any,
      jabatan: "" as any,
      kompetensi: "" as any,
      role: "" as any,
      kelompok_gaji: "" as any,
      no_rekening: "",
      tunjangan_uang_lembur: "",
      tunjangan_fungsional: "",
      tunjangan_khusus: "",
      tunjangan_lainnya: "",
      uang_lembur: "",
      uang_makan: "",
      ptkp: "" as any,
      potongan: "" as any,
      username: "",
      password: "",
    },

    validationSchema: validationSchema[activeStep],

    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //TODO api post tambah karyawan step 1
    },
  });

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        if (activeStep === 2) {
          formik.submitForm();
        } else {
          setActiveStep(activeStep + 1);
        }
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
      <SimpleGrid columns={[1, 2, 3]} spacingX={4}>
        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.nama_karyawan}
        >
          <FormLabel>
            Nama Karyawan
            <RequiredForm />
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
            <RequiredForm />
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

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.no_rm}
        >
          <FormLabel>
            RM
            <RequiredForm />
          </FormLabel>
          <Input
            name="no_rm"
            placeholder="871***"
            onChange={formik.handleChange}
            value={formik.values.no_rm}
          />
          <FormErrorMessage>{formik.errors.no_rm}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.no_manulife}
        >
          <FormLabel>
            No. Manulife
            <RequiredForm />
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
            <RequiredForm />
          </FormLabel>
          <DatePickerModal
            id="tambah-karyawan-date-picker"
            name="tgl_masuk"
            placeholder="Pilih tanggal"
            onConfirm={(input) => {
              formik.setFieldValue("tgl_masuk", input);
            }}
            inputValue={
              formik.values.tgl_masuk
                ? new Date(formik.values.tgl_masuk)
                : undefined
            }
          />
          <FormErrorMessage>{formik.errors.tgl_masuk}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.status_karyawan}
        >
          <FormLabel>
            Status Karyawan
            <RequiredForm />
          </FormLabel>
          <SelectStatusKaryawan
            name="status_karyawan"
            formik={formik}
            placeholder="Pilih Status Karyawan"
            initialSelected={formik.values.status_karyawan}
            noSearch
          />
          <FormErrorMessage>
            {formik.errors.unit_kerja as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.unit_kerja}
        >
          <FormLabel>
            Unit Kerja
            <RequiredForm />
          </FormLabel>
          <SelectUnitKerja
            name="unit_kerja"
            formik={formik}
            placeholder="Pilih Unit kerja"
            initialSelected={formik.values.unit_kerja}
          />
          <FormErrorMessage>
            {formik.errors.unit_kerja as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.jabatan}
        >
          <FormLabel>
            Jabatan
            <RequiredForm />
          </FormLabel>
          <SelectJabatan
            name="jabatan"
            formik={formik}
            placeholder="Pilih Jabatan"
            initialSelected={formik.values.jabatan}
          />
          <FormErrorMessage>{formik.errors.jabatan as string}</FormErrorMessage>
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
            initialSelected={formik.values.kompetensi}
          />
          <FormHelperText opacity={0.4}>
            Jika karyawan tidak memiliki kompetensi atau profesi pilih tidak ada
          </FormHelperText>
          <FormErrorMessage>
            {formik.errors.kompetensi as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.role}>
          <FormLabel>
            Role
            <RequiredForm />
          </FormLabel>
          <SelectRole
            name="role"
            formik={formik}
            placeholder="Pilih Role"
            initialSelected={formik.values.role}
          />
          <FormErrorMessage>{formik.errors.role as string}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>
    );
  };

  const Step1Footer = () => {
    return (
      <Box mt={"auto"}>
        <Button
          mt={2}
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
          h={"50px"}
          onClick={handleNext}
        >
          Lanjut
        </Button>
      </Box>
    );
  };

  const Step2 = () => {
    return (
      <SimpleGrid columns={[1, 2, 3]} spacingX={4}>
        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.kelompok_gaji}
        >
          <FormLabel>
            Kelompok Gaji
            <RequiredForm />
          </FormLabel>
          <SelectKelompokGaji
            name="kelompok_gaji"
            formik={formik}
            placeholder="Pilih Kelompok Gaji"
            initialSelected={formik.values.kelompok_gaji}
          />
          <FormErrorMessage>
            {formik.errors.kelompok_gaji as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.no_rekening}
        >
          <FormLabel>
            Nomor Rekening
            <RequiredForm />
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
            <RequiredForm />
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
            <RequiredForm />
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
            <RequiredForm />
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
            <RequiredForm />
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
            <RequiredForm />
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
            <RequiredForm />
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

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.ptkp}>
          <FormLabel>
            PTKP
            <RequiredForm />
          </FormLabel>
          <SelectPtkp
            name="ptkp"
            formik={formik}
            placeholder="Pilih PTKP"
            initialSelected={formik.values.ptkp}
          />
          <FormErrorMessage>{formik.errors.ptkp as string}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.ptkp}>
          <FormLabel>
            Potongan
            <RequiredForm />
          </FormLabel>
          <SelectPtkp
            name="potongan"
            formik={formik}
            placeholder="Multi Pilih Potongan"
            initialSelected={formik.values.potongan}
          />
          <FormErrorMessage>
            {formik.errors.potongan as string}
          </FormErrorMessage>
        </FormControl>
      </SimpleGrid>
    );
  };

  const Step2Footer = () => {
    return (
      <ButtonGroup mt={"auto"} w={"100%"}>
        <Button
          mt={2}
          w={"100%"}
          className="btn-solid clicky"
          h={"50px"}
          onClick={handleBack}
        >
          Sebelumnya
        </Button>
        <Button
          mt={2}
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
            <RequiredForm />
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
            <RequiredForm />
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
          mt={2}
          w={"100%"}
          className="btn-solid clicky"
          h={"50px"}
          onClick={handleBack}
        >
          Sebelumnya
        </Button>
        <Button
          mt={2}
          w={"100%"}
          colorScheme="ap"
          className="btn-ap clicky"
          h={"50px"}
          onClick={handleNext}
        >
          Tambah Karyawan
        </Button>
      </ButtonGroup>
    );
  };

  const stepComponents = [Step1, Step2, Step3];
  const stepFooterComponents = [Step1Footer, Step2Footer, Step3Footer];

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <Button
        flex={"1 0 220px"}
        colorScheme="ap"
        className="btn-ap clicky"
        leftIcon={<Icon as={RiAddFill} fontSize={iconSize} />}
        onClick={onOpen}
        pl={5}
        {...props}
      >
        Tambah Karyawan
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        initialFocusRef={initialRef}
        size={"full"}
        scrollBehavior="inside"
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent borderRadius={12} minH={"calc(100vh - 32px)"}>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title={"Tambah Karyawan"} />
          </ModalHeader>

          <ModalBody px={0} pb={responsiveSpacing}>
            <Stepper
              maxW={"720px"}
              w={"100%"}
              mx={"auto"}
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
                    <StepTitle>
                      {sw >= 768 && <Text>{step.title}</Text>}
                    </StepTitle>
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
              px={responsiveSpacing}
              bg={lightDarkColor}
              borderRadius={12}
              overflowY={"auto"}
              flex={1}
              className="scrollY"
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
