import {
  Badge,
  Button,
  ButtonProps,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import formatNumber from "../../../lib/formatNumber";
import useBackOnClose from "../../../lib/useBackOnClose";
import MultiSelectKaryawan from "../../dependent/_Select/MultiSelectKaryawan";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";

interface Props extends ButtonProps {}

export default function RunThr({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { karyawan_list: [], tanggal: "" },
    validationSchema: yup.object().shape({
      karyawan_list: yup.array().min(1, "Harus diisi").required("Harus diisi"),
      tanggal: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
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
        Run THR
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
          <ModalHeader ref={initialRef}>Run THR</ModalHeader>
          <ModalBody>
            <Checkbox colorScheme="ap" mb={4}>
              Semua Karyawan
            </Checkbox>

            <form id="runThrForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={!!formik.errors.karyawan_list}>
                <FormLabel>
                  Karyawan
                  <FormRequired />
                </FormLabel>
                <VStack align={"stretch"}>
                  {formik.values.karyawan_list.length > 0 && (
                    <HStack>
                      {formik.values.karyawan_list.map(
                        (karyawan: any, i: number) => {
                          const ok = i < 3;
                          return (
                            ok && (
                              <HStack
                                flex={"1 1 0"}
                                textAlign={"center"}
                                key={i}
                                borderRadius={8}
                                bg={"var(--p500a4)"}
                                h={26}
                                px={2}
                                justify={"center"}
                              >
                                <Text
                                  fontSize={14}
                                  noOfLines={1}
                                  color={"p.500"}
                                  fontWeight={500}
                                  mb={"1px"}
                                >
                                  {karyawan.nama}
                                </Text>
                              </HStack>
                            )
                          );
                        }
                      )}
                      {formik.values.karyawan_list.length > 3 && (
                        <Badge colorScheme="ap">
                          +
                          {formatNumber(formik.values.karyawan_list.length - 3)}
                        </Badge>
                      )}
                    </HStack>
                  )}
                  <MultiSelectKaryawan
                    formik={formik}
                    name="karyawan_list"
                    placeholder="Pilih Karyawan"
                    initialSelected={formik.values.karyawan_list}
                    noUseBackOnClose
                  />
                </VStack>
                <FormErrorMessage>
                  {formik.errors.karyawan_list as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formik.errors.tanggal}>
                <FormLabel>
                  Tanggal
                  <FormRequired />
                </FormLabel>
                <DatePicker
                  formik={formik}
                  name="tanggal"
                  dateValue={formik.values.tanggal}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.tanggal as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="runThrForm"
              w={"100%"}
              className="btn-ap clicky"
              colorScheme="ap"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
