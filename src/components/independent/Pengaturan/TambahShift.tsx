import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import formatNumber from "../../../lib/formatNumber";
import parseNumber from "../../../lib/parseNumber";
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
                  isInvalid={formik.errors.jam_from_hour ? true : false}
                >
                  <Input
                    name="jam_from_hour"
                    placeholder={"4.000.000"}
                    type="time"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "jam_from_hour",
                        parseNumber(e.target.value)
                      );
                    }}
                    value={formatNumber(formik.values.jam_from_hour)}
                  />
                  <FormErrorMessage>
                    {formik.errors.jam_from_hour as string}
                  </FormErrorMessage>
                </FormControl>

                <Text mt={"5px"} textAlign={"center"}>
                  -
                </Text>

                <FormControl
                  flex={"1 1"}
                  isInvalid={formik.errors.jam_to_hour ? true : false}
                >
                  <Input
                    name="jam_to_hour"
                    type="time"
                    placeholder={"hh:mm"}
                    onChange={(e) => {
                      formik.setFieldValue(
                        "jam_to_hour",
                        parseNumber(e.target.value)
                      );
                    }}
                    value={formatNumber(formik.values.jam_to_hour)}
                  />
                  <FormErrorMessage>
                    {formik.errors.jam_to_hour as string}
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
