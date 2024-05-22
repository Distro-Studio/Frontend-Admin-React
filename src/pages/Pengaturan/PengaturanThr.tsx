import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { RiCircleLine, RiRecordCircleLine } from "@remixicon/react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import FormRequired from "../../components/form/FormRequired";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import pengaturanTopNavs from "../../const/pengaturanTopNavs";
import { responsiveSpacing } from "../../const/sizes";
import formatNumber from "../../lib/formatNumber";
import parseNumber from "../../lib/parseNumber";

export default function PengaturanThr() {
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      perhitungan: "" as any,
      // nominal_satu: "" as any,
      nominal_dua: "" as any,
      potongan: "" as any,
      kriteria_karyawan_kontrak_tahun: "" as any,
      kriteria_karyawan_kontrak_bulan: "" as any,
    },
    validationSchema: yup.object().shape({
      perhitungan: yup.string().required("Harus diisi"),
      // nominal_satu: yup.number().required("Harus diisi"),
      nominal_dua: yup.number().required("Harus diisi"),
      potongan: yup.number().required("Harus diisi"),
      kriteria_karyawan_kontrak_tahun: yup.number().required("Harus diisi"),
      kriteria_karyawan_kontrak_bulan: yup.number().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //TODO simpan pengaturan thr
      // const kriteria_karyawan_kontrak =
      //   values.kriteria_karyawan_kontrak_bulan +
      //   values.kriteria_karyawan_kontrak_tahun * 12;
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
                className={i === 3 ? "btn-apa clicky" : "btn clicky"}
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
            <form id="pengaturanThrForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={formik.values.perhitungan === 2 ? 4 : 6}
                isInvalid={formik.errors.perhitungan ? true : false}
              >
                <FormLabel>
                  Perhitungan THR
                  <FormRequired />
                </FormLabel>

                <Wrap>
                  <Button
                    className="btn-solid clicky"
                    leftIcon={
                      <Icon
                        as={
                          formik.values.perhitungan === 1
                            ? RiRecordCircleLine
                            : RiCircleLine
                        }
                        fontSize={20}
                        color={formik.values.perhitungan === 1 ? "p.500" : ""}
                      />
                    }
                    onClick={() => {
                      formik.setFieldValue("perhitungan", 1);
                    }}
                  >
                    Berdasarkan Gaji Pokok + Tunjangan
                  </Button>

                  <Button
                    className="btn-solid clicky"
                    leftIcon={
                      <Icon
                        as={
                          formik.values.perhitungan === 2
                            ? RiRecordCircleLine
                            : RiCircleLine
                        }
                        fontSize={20}
                        color={formik.values.perhitungan === 2 ? "p.500" : ""}
                      />
                    }
                    onClick={() => {
                      formik.setFieldValue("perhitungan", 2);
                    }}
                  >
                    Berdasarkan Gaji Pokok + Custom Nominal
                  </Button>

                  <Button
                    isDisabled
                    className="btn-solid clicky"
                    leftIcon={
                      <Icon
                        as={
                          formik.values.perhitungan === 3
                            ? RiRecordCircleLine
                            : RiCircleLine
                        }
                        fontSize={20}
                        color={formik.values.perhitungan === 3 ? "p.500" : ""}
                      />
                    }
                    onClick={() => {
                      formik.setFieldValue("perhitungan", 3);
                    }}
                  >
                    Custom
                  </Button>
                </Wrap>

                <FormErrorMessage>
                  {formik.errors.perhitungan as string}
                </FormErrorMessage>
              </FormControl>

              {formik.values.perhitungan === 2 && (
                <FormControl
                  mb={6}
                  isInvalid={formik.errors.nominal_dua ? true : false}
                  w={"fit-content"}
                >
                  <HStack>
                    <Text flexShrink={0}>Berdasarkan Gaji Pokok Karyawan</Text>
                    <Text>+</Text>
                    <InputGroup>
                      <InputLeftElement>
                        <Text>Rp</Text>
                      </InputLeftElement>
                      <Input
                        name="nominal_dua"
                        onChange={(e) => {
                          formik.setFieldValue(
                            "nominal_dua",
                            parseNumber(e.target.value)
                          );
                        }}
                        value={formatNumber(formik.values.nominal_dua)}
                      />
                    </InputGroup>
                  </HStack>
                  <FormErrorMessage>
                    {formik.errors.nominal_dua as string}
                  </FormErrorMessage>
                </FormControl>
              )}

              <FormControl
                mb={6}
                isInvalid={formik.errors.potongan ? true : false}
              >
                <FormLabel>
                  Pajak dan Premi
                  <FormRequired />
                </FormLabel>

                <Wrap>
                  <Button
                    className="btn-solid clicky"
                    leftIcon={
                      <Icon
                        as={
                          formik.values.potongan === 1
                            ? RiRecordCircleLine
                            : RiCircleLine
                        }
                        fontSize={20}
                        color={formik.values.potongan === 1 ? "p.500" : ""}
                      />
                    }
                    onClick={() => {
                      formik.setFieldValue("potongan", 1);
                    }}
                  >
                    Termasuk Pajak
                  </Button>

                  <Button
                    className="btn-solid clicky"
                    leftIcon={
                      <Icon
                        as={
                          formik.values.potongan === 2
                            ? RiRecordCircleLine
                            : RiCircleLine
                        }
                        fontSize={20}
                        color={formik.values.potongan === 2 ? "p.500" : ""}
                      />
                    }
                    onClick={() => {
                      formik.setFieldValue("potongan", 2);
                    }}
                  >
                    Termasuk Premi
                  </Button>

                  <Button
                    className="btn-solid clicky"
                    leftIcon={
                      <Icon
                        as={
                          formik.values.potongan === 3
                            ? RiRecordCircleLine
                            : RiCircleLine
                        }
                        fontSize={20}
                        color={formik.values.potongan === 3 ? "p.500" : ""}
                      />
                    }
                    onClick={() => {
                      formik.setFieldValue("potongan", 3);
                    }}
                  >
                    Termasuk Pajak dan Premi
                  </Button>

                  <Button
                    className="btn-solid clicky"
                    leftIcon={
                      <Icon
                        as={
                          formik.values.potongan === 4
                            ? RiRecordCircleLine
                            : RiCircleLine
                        }
                        fontSize={20}
                        color={formik.values.potongan === 4 ? "p.500" : ""}
                      />
                    }
                    onClick={() => {
                      formik.setFieldValue("potongan", 4);
                    }}
                  >
                    Tidak Termasuk Pajak dan Premi
                  </Button>
                </Wrap>

                <FormErrorMessage>
                  {formik.errors.potongan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={6}
                isInvalid={
                  formik.errors.kriteria_karyawan_kontrak_tahun ||
                  formik.errors.kriteria_karyawan_kontrak_bulan
                    ? true
                    : false
                }
              >
                <FormLabel>
                  THR Karyawan Kontrak
                  <FormRequired />
                </FormLabel>

                <Wrap align={"center"}>
                  <Text>
                    Untuk karyawan kontrak yang telah bergabung selama
                  </Text>
                  <Input
                    name="kriteria_karyawan_kontrak_tahun"
                    textAlign="center"
                    w="50px"
                    overflow="hidden"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "kriteria_karyawan_kontrak_tahun",
                        parseNumber(e.target.value)
                      );
                    }}
                    value={formatNumber(
                      formik.values.kriteria_karyawan_kontrak_tahun
                    )}
                  />
                  <Text>Tahun, </Text>
                  <Input
                    name="kriteria_karyawan_kontrak_bulan"
                    textAlign="center"
                    w="50px"
                    overflow="hidden"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "kriteria_karyawan_kontrak_bulan",
                        parseNumber(e.target.value)
                      );
                    }}
                    value={formatNumber(
                      formik.values.kriteria_karyawan_kontrak_bulan
                    )}
                  />
                  <Text>Bulan </Text>
                </Wrap>

                <FormErrorMessage>
                  {(formik.errors.kriteria_karyawan_kontrak_tahun as string) ||
                    (formik.errors.kriteria_karyawan_kontrak_bulan as string)}
                </FormErrorMessage>
              </FormControl>
            </form>

            <Button
              ml={"auto"}
              w={"120px"}
              className="btn-ap clicky"
              colorScheme="ap"
              type="submit"
              form="pengaturanThrForm"
            >
              Simpan
            </Button>
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
