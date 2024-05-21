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
import { useRef } from "react";
import backOnClose from "../../../lib/backOnClose";
import { useFormik } from "formik";
import * as yup from "yup";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";
import useBackOnClose from "../../../lib/useBackOnClose";

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
      tgl_selesai: yup.string().required("Harus diisi"),
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
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Terapkan Jadwal</ModalHeader>
          <ModalBody>
            <form id="terapkanJadwalForm">
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
                    {formik.values.karyawan_list.map((karyawan, i) => (
                      <Badge colorScheme="ap" key={i}>
                        {karyawan.nama}
                      </Badge>
                    ))}
                  </Wrap>
                  <Input name="karyawan_list" placeholder="Cari karyawan" />
                </VStack>
                <FormErrorMessage>
                  {formik.errors.karyawan_list as string}
                </FormErrorMessage>
              </FormControl>

              <SimpleGrid columns={[1, 2]} gap={4}>
                <FormControl
                  mb={4}
                  isInvalid={formik.errors.tgl_mulai ? true : false}
                >
                  <FormLabel>
                    Tanggal Mulai
                    <FormRequired />
                  </FormLabel>
                  <DatePicker
                    formik={formik}
                    name="tgl_masuk"
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl_selesai as string}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mb={4}
                  isInvalid={formik.errors.tgl_selesai ? true : false}
                >
                  <FormLabel>
                    Tanggal Selesai
                    <FormRequired />
                  </FormLabel>
                  <DatePicker
                    formik={formik}
                    name="tgl_selesai"
                    noUseBackOnClose
                  />
                  <FormErrorMessage>
                    {formik.errors.tgl_selesai as string}
                  </FormErrorMessage>
                </FormControl>
              </SimpleGrid>

              <FormControl
                mb={4}
                isInvalid={formik.errors.shift ? true : false}
              >
                <FormLabel>
                  Pilih Shift
                  <FormRequired />
                </FormLabel>
                <Input
                  name="shift"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.shift}
                />
                <FormErrorMessage>
                  {formik.errors.shift as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              {/* <Button
                w={"100%"}
                className="btn-solid clicky"
                onClick={() => {
                  backOnClose(onClose);
                }}
              >
                Batal
              </Button> */}
              <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
                Simpan
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
