import {
  Badge,
  Button,
  ButtonGroup,
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
  SimpleGrid,
  useDisclosure,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";
import SelectShift from "../../dependent/Jadwal/SelectShift";

interface Props extends ButtonProps {}

export default function TerapkanJadwalModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const dummy = [
    {
      id: 1,
      nama: "Jolitos Kurniawan",
    },
    {
      id: 2,
      nama: "Wazawsky",
    },
    {
      id: 3,
      nama: "Rini Kasih",
    },
    {
      id: 4,
      nama: "Sambo",
    },
    {
      id: 5,
      nama: "Samyang",
    },
    {
      id: 6,
      nama: "Danarhadi",
    },
  ];

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      karyawan_list: dummy,
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
              <FormControl
                mb={4}
                isInvalid={formik.errors.karyawan_list ? true : false}
              >
                <FormLabel>
                  Karywaan
                  <FormRequired />
                </FormLabel>
                <VStack align={"stretch"}>
                  <Wrap>
                    {formik.values.karyawan_list.map((karyawan, i) => {
                      const ok = i < 3;
                      return (
                        ok && (
                          <Badge colorScheme="ap" key={i}>
                            {karyawan.nama}
                          </Badge>
                        )
                      );
                    })}
                  </Wrap>
                  <Input
                    name="karyawan_list"
                    placeholder="Cari karyawan"
                    onChange={(e) => {}}
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

              <FormControl isInvalid={formik.errors.shift ? true : false}>
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
