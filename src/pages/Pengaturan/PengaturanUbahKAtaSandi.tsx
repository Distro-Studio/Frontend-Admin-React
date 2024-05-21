import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import FormRequired from "../../components/form/FormRequired";
import PasswordInput from "../../components/input/PasswordInput";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import pengaturanTopNavs from "../../const/pengaturanTopNavs";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanUbahKataSandi() {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      password_lama: "",
      password_baru: "",
      konfirmasi_password_baru: "",
    },
    validationSchema: yup.object().shape({
      password_lama: yup.string().required("Harus diisi"),
      password_baru: yup.string().required("Harus diisi"),
      konfirmasi_password_baru: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      //TODO api simpan password baru
      console.log(values);
    },
  });

  return (
    <>
      <CWrapper>
        <Wrap spacing={responsiveSpacing} align={"flex-start"}>
          <CContainer
            p={4}
            bg={useBodyColor()}
            borderRadius={12}
            w={"230px"}
            flexShrink={0}
            gap={2}
          >
            {pengaturanTopNavs[0].subNavs?.map((nav, i) => (
              <Button
                key={i}
                justifyContent={"flex-start"}
                className={i === 1 ? "btn-apa clicky" : "btn clicky"}
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
            flex={"1 1 900px"}
          >
            <form id="ubahKataSandiForm" onSubmit={formik.handleSubmit}>
              <Text fontSize={20} fontWeight={600} mb={responsiveSpacing}>
                Ubah Kata Sandi
              </Text>

              <FormControl
                mb={4}
                isInvalid={formik.errors.password_lama ? true : false}
              >
                <FormLabel>
                  Kata Sandi Lama
                  <FormRequired />
                </FormLabel>
                <PasswordInput
                  name="password_lama"
                  placeholder="Masukkan kata sandi lama"
                  formik={formik}
                />
                <FormErrorMessage>
                  {formik.errors.password_lama as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.password_baru ? true : false}
              >
                <FormLabel>
                  Kata Sandi Baru
                  <FormRequired />
                </FormLabel>
                <PasswordInput
                  name="password_baru"
                  placeholder="Masukkan kata sandi baru"
                  formik={formik}
                />
                <FormErrorMessage>
                  {formik.errors.password_baru as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={responsiveSpacing}
                isInvalid={
                  formik.errors.konfirmasi_password_baru ? true : false
                }
              >
                <FormLabel>
                  Konfirmasi Kata Sandi Baru
                  <FormRequired />
                </FormLabel>
                <PasswordInput
                  name="konfirmasi_password_baru"
                  placeholder="Masukkan lagi kata sandi baru untuk konfirmasi"
                  formik={formik}
                />
                <FormErrorMessage>
                  {formik.errors.konfirmasi_password_baru as string}
                </FormErrorMessage>
              </FormControl>
            </form>

            <Button
              ml={"auto"}
              w={"120px"}
              className="btn-ap clicky"
              colorScheme="ap"
              type="submit"
              form="ubahKataSandiForm"
            >
              Simpan
            </Button>
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
