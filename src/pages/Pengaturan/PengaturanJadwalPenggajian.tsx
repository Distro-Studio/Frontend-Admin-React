import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import FormRequired from "../../components/form/FormRequired";
import DatePicker from "../../components/input/DatePicker";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import pengaturanTopNavs from "../../const/pengaturanTopNavs";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanJadwalPenggajian() {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: { tanggal: "" },
    validationSchema: yup
      .object()
      .shape({ tanggal: yup.string().required("Harus diisi") }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //TODO simpan jadwal penggajian
    },
  });
  return (
    <>
      <CWrapper>
        <Wrap w={"100%"} spacing={responsiveSpacing} align={"flex-start"}>
          <CContainer
            p={4}
            bg={useBodyColor()}
            borderRadius={12}
            w={"230px"}
            flexShrink={0}
            gap={2}
          >
            {pengaturanTopNavs[2].subNavs?.map((nav, i) => (
              <Button
                key={i}
                justifyContent={"flex-start"}
                className={i === 2 ? "btn-apa clicky" : "btn clicky"}
                fontWeight={500}
                as={Link}
                to={nav.link}
                h={"50px"}
              >
                {nav.label}
              </Button>
            ))}
          </CContainer>

          <CContainer
            p={responsiveSpacing}
            bg={useBodyColor()}
            borderRadius={12}
            flex={"1 1 600px"}
            overflowX={"auto"}
          >
            <form
              id="pengaturanJadwalPenggajianForm"
              onSubmit={formik.handleSubmit}
            >
              <FormControl
                mb={4}
                isInvalid={formik.errors.tanggal ? true : false}
              >
                <FormLabel>
                  Tanggal Penggajian
                  <FormRequired />
                </FormLabel>
                <DatePicker
                  name="tanggal"
                  placeholder="Pilih tanggal penggajian"
                  formik={formik}
                />
                <FormErrorMessage>
                  {formik.errors.tanggal as string}
                </FormErrorMessage>
              </FormControl>
            </form>
            <Button
              ml={"auto"}
              w={"120px"}
              className="btn-ap clicky"
              colorScheme="ap"
              type="submit"
              form="pengaturanJadwalPenggajianForm"
            >
              Simpan
            </Button>
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
