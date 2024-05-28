import {
  Badge,
  Button,
  ButtonGroup,
  ButtonProps,
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
  SimpleGrid,
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
import SelectShift from "../../dependent/_Select/SelectShift";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";

interface Props extends ButtonProps {}

export default function TerapkanJadwalModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      karyawan_list: [],
      tgl_mulai: "",
      tgl_selesai: "",
      shift: "",
    },
    validationSchema: yup.object().shape({
      karyawan_list: yup.array().min(1, "Harus diisi").required("Harus diisi"),
      tgl_mulai: yup.string().required("Harus diisi"),
      tgl_selesai: yup.string(),
      shift: yup.string().required("Harus diisi"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <>
      <Button
        colorScheme="ap"
        className="btn-ap clicky"
        onClick={onOpen}
        {...props}
      >
        Terapkan Jadwal
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
          <ModalHeader ref={initialRef}>Terapkan Jadwal</ModalHeader>
          <ModalBody>
            <form id="terapkanJadwalForm" onSubmit={formik.handleSubmit}>
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

              <SimpleGrid columns={[1, 2]} gap={4}>
                <FormControl mb={4} isInvalid={!!formik.errors.tgl_mulai}>
                  <FormLabel>
                    Tanggal Mulai
                    <FormRequired />
                  </FormLabel>
                  <DatePicker
                    formik={formik}
                    name="tgl_mulai"
                    dateValue={formik.values.tgl_mulai}
                    noUseBackOnClose
                    dateFormatOptions={{
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }}
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl_mulai as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={formik.errors.tgl_selesai ? true : false}
                >
                  <FormLabel>Tanggal Selesai</FormLabel>
                  <DatePicker
                    formik={formik}
                    name="tgl_selesai"
                    dateValue={formik.values.tgl_selesai}
                    noUseBackOnClose
                    dateFormatOptions={{
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }}
                    nullable
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl_selesai as string}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={!!formik.errors.shift}>
                <FormLabel>
                  Pilih Shift
                  <FormRequired />
                </FormLabel>
                <SelectShift
                  formik={formik}
                  name="shift"
                  placeholder="Pilih shift"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.shift as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                type="submit"
                form="terapkanJadwalForm"
                w={"100%"}
                colorScheme="ap"
                className="btn-ap clicky"
              >
                Simpan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
