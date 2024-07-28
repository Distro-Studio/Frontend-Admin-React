import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import NumberInput from "../../components/dependent/input/NumberInput";
import Textarea from "../../components/dependent/input/Textarea";
import SetLokasiPresensi from "../../components/dependent/SetLokasiPresensi";
import RequiredForm from "../../components/form/RequiredForm";
import ComponentSpinner from "../../components/independent/ComponentSpinner";
import CContainer from "../../components/wrapper/CContainer";
import { useLightDarkColor } from "../../const/colors";
import { LatLng } from "../../const/interfaces";
import { responsiveSpacing } from "../../const/sizes";
import getLocation from "../../lib/getLocation";

export default function PengaturanLokasiPresensi() {
  // SX
  const lightDarkColor = useLightDarkColor();

  const [loading, setLoading] = useState<boolean>(true);
  const [myLoc, setMyLoc] = useState<LatLng | undefined>(undefined);

  useEffect(() => {
    getLocation()
      .then(({ lat, long }) => {
        setMyLoc({ lat: lat, lng: long });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      lat: undefined,
      long: undefined,
      radius: undefined,
      alamat: undefined,
    },
    validationSchema: yup.object().shape({
      lat: yup.number().required("Harus diisi"),
      long: yup.number().required("Harus diisi"),
      radius: yup.number().required("Harus diisi"),
      alamat: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <CContainer
      p={responsiveSpacing}
      bg={lightDarkColor}
      borderRadius={12}
      flex={"1 1 600px"}
      h={"100%"}
      overflowY={"auto"}
      className="scrollY"
    >
      {loading && <ComponentSpinner my={"auto"} />}

      {!loading && (
        <>
          {myLoc && (
            <>
              <SetLokasiPresensi
                center={myLoc}
                officeCenter={
                  formik.values.lat && formik.values.long
                    ? {
                        lat: formik.values.lat,
                        lng: formik.values.long,
                      }
                    : undefined
                }
                presence_radius={formik.values.radius}
                setOfficeLoc={(input) => {
                  if (input) {
                    formik.setFieldValue("lat", input.lat);
                    formik.setFieldValue("long", input.lng);
                  }
                }}
              />
              <Text mt={2} opacity={0.4}>
                *Klik 2x pada peta untuk menentukan titik presensi
              </Text>

              <CContainer mt={responsiveSpacing}>
                <form>
                  <FormControl mb={4} isInvalid={!!formik.errors.lat}>
                    <FormLabel>
                      Latitude
                      <RequiredForm />
                    </FormLabel>
                    <Input
                      name="lat"
                      placeholder="-6.28376273"
                      onChange={formik.handleChange}
                      value={formik.values.lat || ""}
                    />
                    <FormErrorMessage>
                      {formik.errors.lat as string}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl mb={4} isInvalid={!!formik.errors.long}>
                    <FormLabel>
                      Longitude
                      <RequiredForm />
                    </FormLabel>
                    <Input
                      name="long"
                      placeholder="110.28376273"
                      onChange={formik.handleChange}
                      value={formik.values.long || ""}
                    />
                    <FormErrorMessage>
                      {formik.errors.long as string}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl mb={4} isInvalid={!!formik.errors.radius}>
                    <FormLabel>
                      Radius Presensi
                      <RequiredForm />
                    </FormLabel>
                    <InputGroup>
                      <InputRightElement pr={4}>
                        <Text>m</Text>
                      </InputRightElement>
                      <NumberInput
                        pr={12}
                        name="radius"
                        placeholder="100"
                        onChangeSetter={(input) => {
                          formik.setFieldValue("radius", input);
                        }}
                        inputValue={formik.values.radius}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {formik.errors.radius as string}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!formik.errors.radius}>
                    <FormLabel>
                      Alamat
                      <RequiredForm />
                    </FormLabel>
                    <Textarea
                      name="alamat"
                      placeholder="Jalan Soekarno Hatta no.17"
                      onChangeSetter={(input) => {
                        formik.setFieldValue("alamat", input);
                      }}
                      inputValue={formik.values.alamat}
                    />
                    <FormErrorMessage>
                      {formik.errors.radius as string}
                    </FormErrorMessage>
                  </FormControl>
                </form>

                <Button
                  mt={responsiveSpacing}
                  ml={"auto"}
                  w={"fit-content"}
                  colorScheme="ap"
                  className="btn-ap clicky"
                >
                  Simpan
                </Button>
              </CContainer>
            </>
          )}
        </>
      )}
    </CContainer>
  );
}
