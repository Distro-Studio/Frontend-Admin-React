import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Dispatch } from "react";
import * as yup from "yup";
import SelectJabatan from "../../components/dependent/_Select/SelectJabatan";
import SelectKelompokGaji from "../../components/dependent/_Select/SelectKelompokGaji";
import SelectKompetensi from "../../components/dependent/_Select/SelectKompetensi";
import SelectPtkp from "../../components/dependent/_Select/SelectPtkp";
import SelectRole from "../../components/dependent/_Select/SelectRole";
import SelectStatusKaryawan from "../../components/dependent/_Select/SelectStatusKaryawan";
import SelectUnitKerja from "../../components/dependent/_Select/SelectUnitKerja";
import FormRequired from "../../components/form/FormRequired";
import DatePicker from "../../components/input/DatePicker";

const validationSchemaStep1 = yup.object({
  // nama_karyawan: yup.string().required("Harus diisi"),
  // email: yup.string().email("Email tidak valid").required("Harus diisi"),
  // no_rm: yup.string().required("Harus diisi"),
  // no_manulife: yup.string().required("Harus diisi"),
  // tgl_masuk: yup.string().required("Harus diisi"),
  // status_karyawan: yup.string().required("Harus diisi"),
  // unit_kerja: yup.string().required("Harus diisi"),
  // jabatan: yup.string().required("Harus diisi"),
  // kompetensi: yup.string(),
  // role: yup.string().required("Harus diisi"),
});

const validationSchemaStep2 = yup.object({
  kelompok_gaji: yup.mixed().required("Harus diisi"),
  no_rekening: yup.string().required("Harus diisi"),
  tunjangan_uang_lembur: yup.string().required("Harus diisi"),
  tunjangan_fungsional: yup.string().required("Harus diisi"),
  tunjangan_khusus: yup.string().required("Harus diisi"),
  tunjangan_lainnya: yup.string().required("Harus diisi"),
  uang_lembur: yup.string().required("Harus diisi"),
  uang_makan: yup.string().required("Harus diisi"),
  ptkp: yup.mixed().required("Harus diisi"),
});

const validationSchema = [validationSchemaStep1, validationSchemaStep2];

interface Props {
  activeStep: number;
  setActiveStep: Dispatch<number>;
  data: any;
}

export default function EditKaryawanForm({
  activeStep,
  setActiveStep,
  data,
}: Props) {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama_karyawan: data.user.nama,
      email: data.email,
      no_rm: data.no_rm,
      no_manulife: data.no_manulife,
      tgl_masuk: data.tgl_masuk,
      status_karyawan: {
        value: data.status_karyawan.id,
        label: data.status_karyawan.label,
      },
      unit_kerja: {
        value: data.unit_kerja.id,
        label: data.unit_kerja.nama_unit,
      },
      jabatan: {
        value: data.jabatan.id,
        label: data.jabatan.nama_jabatan,
      },
      kompetensi: {
        value: data.kompetensi.id,
        label: data.kompetensi.nama_kompetensi,
      },
      role: {
        value: data.role.id,
        label: data.role.name,
      },
      kelompok_gaji: {
        value: data.kelompok_gaji.id,
        label: data.kelompok_gaji.nama_kelompok,
      },
      no_rekening: data.no_rekening,
      tunjangan_uang_lembur: data.uang_lembur,
      tunjangan_fungsional: data.tunjangan_fungsional,
      tunjangan_khusus: data.tunjangan_khusus,
      tunjangan_lainnya: data.tunjangan_lainnya,
      uang_lembur: data.uang_lembur,
      uang_makan: data.uang_makan,
      ptkp: {
        value: data.ptkp.id,
        label: data.ptkp.kode_ptkp,
      },
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
          <FormErrorMessage>
            {formik.errors.nama_karyawan as string}
          </FormErrorMessage>
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
          <FormErrorMessage>{formik.errors.email as string}</FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.no_rm}
        >
          <FormLabel>
            RM
            <FormRequired />
          </FormLabel>
          <Input
            name="no_rm"
            placeholder="871***"
            onChange={formik.handleChange}
            value={formik.values.no_rm}
          />
          <FormErrorMessage>{formik.errors.no_rm as string}</FormErrorMessage>
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
          <FormErrorMessage>
            {formik.errors.no_manulife as string}
          </FormErrorMessage>
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
            initialDateValue={new Date(data.tgl_masuk)}
          />
          <FormErrorMessage>
            {formik.errors.tgl_masuk as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mb={4}
          flex={"1 1 300px"}
          isInvalid={!!formik.errors.status_karyawan}
        >
          <FormLabel>
            Status Karyawan
            <FormRequired />
          </FormLabel>
          <SelectStatusKaryawan
            name="status_karyawan"
            formik={formik}
            placeholder="Pilih Status Karyawan"
            initialSelected={formik.values.status_karyawan}
          />
          <FormErrorMessage>
            {formik.errors.unit_kerja as string}
            as string{" "}
          </FormErrorMessage>
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
            initialSelected={formik.values.unit_kerja}
          />
          <FormErrorMessage>
            {formik.errors.unit_kerja as string}
            as string{" "}
          </FormErrorMessage>
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
            initialSelected={formik.values.jabatan}
          />
          <FormErrorMessage>
            {formik.errors.jabatan as string as string}
          </FormErrorMessage>
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
            as string{" "}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.role}>
          <FormLabel>
            Role
            <FormRequired />
          </FormLabel>
          <SelectRole
            name="role"
            formik={formik}
            placeholder="Pilih Role"
            initialSelected={formik.values.role}
          />
          <FormErrorMessage>
            {formik.errors.role as string as string}
          </FormErrorMessage>
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
            initialSelected={formik.values.kelompok_gaji}
          />
          <FormErrorMessage>
            {formik.errors.kelompok_gaji as string}
            as string{" "}
          </FormErrorMessage>
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
          <FormErrorMessage>
            {formik.errors.no_rekening as string}
          </FormErrorMessage>
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
            {formik.errors.tunjangan_uang_lembur as string}
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
            {formik.errors.tunjangan_fungsional as string}
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
          <FormErrorMessage>
            {formik.errors.tunjangan_khusus as string}
          </FormErrorMessage>
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
          <FormErrorMessage>
            {formik.errors.tunjangan_lainnya as string}
          </FormErrorMessage>
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
          <FormErrorMessage>
            {formik.errors.uang_lembur as string}
          </FormErrorMessage>
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
          <FormErrorMessage>
            {formik.errors.uang_makan as string}
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={4} flex={"1 1 300px"} isInvalid={!!formik.errors.ptkp}>
          <FormLabel>
            PTKP
            <FormRequired />
          </FormLabel>
          <SelectPtkp
            name="ptkp"
            formik={formik}
            placeholder="Pilih PTKP"
            initialSelected={formik.values.ptkp}
          />
          <FormErrorMessage>
            {formik.errors.ptkp as string as string}
          </FormErrorMessage>
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
          type="submit"
          form="editKaryawanForm"
        >
          Simpan
        </Button>
      </ButtonGroup>
    );
  };

  const stepComponents = [Step1, Step2];
  const stepFooterComponents = [Step1Footer, Step2Footer];

  return (
    <>
      <form id="editKaryawanForm" onSubmit={formik.handleSubmit}>
        {stepComponents[activeStep]()}
      </form>

      {stepFooterComponents[activeStep]()}
    </>
  );
}
