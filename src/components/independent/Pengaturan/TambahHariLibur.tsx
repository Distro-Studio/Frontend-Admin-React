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
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import backOnClose from "../../../lib/backOnClose";
import useBackOnClose from "../../../lib/useBackOnClose";
import FormRequired from "../../form/FormRequired";
import DatePicker from "../../input/DatePicker";

interface Props extends ButtonProps {}

export default function TambahHariLibur({ ...props }: Props) {
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
        Tambah Hari LIbur
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
          <ModalHeader ref={initialRef}>Tambah Hari LIbur</ModalHeader>
          <ModalBody>
            <form id="tambahUnitKerjaForm" onSubmit={formik.handleSubmit}>
              <FormControl mb={4} isInvalid={formik.errors.nama ? true : false}>
                <FormLabel>
                  Nama Hari Libur
                  <FormRequired />
                </FormLabel>
                <Input
                  name="nama"
                  placeholder="Hari Raya"
                  onChange={formik.handleChange}
                  value={formik.values.nama}
                />
                <FormErrorMessage>
                  {formik.errors.nama as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                flex={"1 1"}
                isInvalid={formik.errors.jam_from_hour ? true : false}
              >
                <FormLabel>
                  Tanggal
                  <FormRequired />
                </FormLabel>
                <DatePicker
                  name="tanggal"
                  formik={formik}
                  placeholder="Pilih tanggal hari libur"
                  noUseBackOnClose
                />

                <FormErrorMessage>
                  {formik.errors.jam_from_hour as string}
                </FormErrorMessage>
              </FormControl>
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
