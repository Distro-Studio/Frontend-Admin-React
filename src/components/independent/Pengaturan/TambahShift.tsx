import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";

interface Props extends ButtonProps {}

export default function TambahShift({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nama: "",
      jam_from_hour: "" as any,
      jam_from_minute: "" as any,
      jam_to_hour: "" as any,
      jam_to_minute: "" as any,
    },
    validationSchema: yup.object().shape({
      nama: yup.string().required("Harus diisi"),
      jam_from_hour: yup.number().required("Harus diisi"),
      jam_from_minute: yup.number().required("Harus diisi"),
      jam_to_hour: yup.number().required("Harus diisi"),
      jam_to_minute: yup.number().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      const jam_from = new Date(
        Date.UTC(0, 0, 0, values.jam_from_hour, values.jam_from_minute)
      );
      const jam_to = new Date(
        Date.UTC(0, 0, 0, values.jam_to_hour, values.jam_to_minute)
      );

      const payload = new FormData();
      payload.append("nama", values.nama);
      payload.append("jam_from", jam_from.toString());
      payload.append("jam_to", jam_to.toString());

      //TODO api tambah kelompok gaji
    },
  });

  return (
    <>
      <Button
        className="btn-ap clicky"
        colorScheme="ap"
        onClick={onOpen}
        {...props}
      >
        Tambah Shift
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}> Tambah Shift</ModalHeader>
          <ModalBody>
            <form id="tambahUnitKerjaForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={formik.errors.nama ? true : false}>
                <FormLabel>
                  Nama Shift
                  <FormRequired />
                </FormLabel>
                <Input
                  name="nama"
                  placeholder="Pagi 1"
                  onChange={formik.handleChange}
                  value={formik.values.nama}
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>

              <FormLabel>
                Jam Kerja
                <FormRequired />
              </FormLabel>
              <Wrap spacing={4}>
                <FormControl
                  flex={"1 1"}
                  isInvalid={
                    !!formik.errors.jam_from_hour ||
                    !!formik.errors.jam_from_minute
                  }
                >
                  <HStack>
                    <Input
                      name="jam_from_hour"
                      placeholder="hh"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (formik.values.jam_from_hour === 0 && value === "0")
                        ) {
                          formik.setFieldValue("jam_from_hour", "");
                        } else {
                          const numValue = parseInt(value);
                          if (numValue < 24) {
                            formik.setFieldValue("jam_from_hour", numValue);
                          }
                        }
                      }}
                      value={
                        formik.values.jam_from_hour === ""
                          ? ""
                          : formik.values.jam_from_hour
                              .toString()
                              .padStart(2, "0")
                      }
                    />

                    <Input
                      name="jam_from_minute"
                      placeholder="mm"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (formik.values.jam_from_minute === 0 && value === "0")
                        ) {
                          formik.setFieldValue("jam_from_minute", "");
                        } else {
                          const numValue = parseInt(value);
                          if (numValue < 60) {
                            formik.setFieldValue("jam_from_minute", numValue);
                          }
                        }
                      }}
                      value={
                        formik.values.jam_from_minute === ""
                          ? ""
                          : formik.values.jam_from_minute
                              .toString()
                              .padStart(2, "0")
                      }
                    />
                  </HStack>

                  <FormErrorMessage>
                    {(formik.errors.jam_from_hour as string) ||
                      (formik.errors.jam_from_minute as string)}
                  </FormErrorMessage>
                </FormControl>

                <Text mt={"5px"} textAlign={"center"}>
                  -
                </Text>

                <FormControl
                  flex={"1 1"}
                  isInvalid={
                    !!formik.errors.jam_to_hour || !!formik.errors.jam_to_minute
                  }
                >
                  <HStack>
                    <Input
                      name="jam_to_hour"
                      placeholder="hh"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (formik.values.jam_to_hour === 0 && value === "0")
                        ) {
                          formik.setFieldValue("jam_to_hour", "");
                        } else {
                          const numValue = parseInt(value);
                          if (numValue < 24) {
                            formik.setFieldValue("jam_to_hour", numValue);
                          }
                        }
                      }}
                      value={
                        formik.values.jam_to_hour === ""
                          ? ""
                          : formik.values.jam_to_hour
                              .toString()
                              .padStart(2, "0")
                      }
                    />

                    <Input
                      name="jam_to_minute"
                      placeholder="mm"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          value === "" ||
                          (formik.values.jam_to_minute === 0 && value === "0")
                        ) {
                          formik.setFieldValue("jam_to_minute", "");
                        } else {
                          const numValue = parseInt(value);
                          if (numValue < 60) {
                            formik.setFieldValue("jam_to_minute", numValue);
                          }
                        }
                      }}
                      value={
                        formik.values.jam_to_minute === ""
                          ? ""
                          : formik.values.jam_to_minute
                              .toString()
                              .padStart(2, "0")
                      }
                    />
                  </HStack>
                  <FormErrorMessage>
                    {(formik.errors.jam_to_hour as string) ||
                      (formik.errors.jam_to_minute as string)}
                  </FormErrorMessage>
                </FormControl>
              </Wrap>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="tambahUnitKerjaForm"
              className="btn-ap clicky"
              colorScheme="ap"
              w={"100%"}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
