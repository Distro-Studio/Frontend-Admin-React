import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
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

export default function TambahKelompokGaji({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  // id;
  // nama_kelompok;
  // besaran_gaji;
  // created_at;
  // updated_at;

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { nama_kelompok: "", besaran_gaji: "" as any },
    validationSchema: yup.object().shape({
      nama_kelompok: yup.string().required("Harus diisi"),
      besaran_gaji: yup.number().required("Harus diisi"),
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
        Tambah Kelompok Gaji
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
          <ModalHeader ref={initialRef}> Tambah Kelompok Gaji</ModalHeader>
          <ModalBody>
            <form id="tambahKelompokGajiForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.nama_kelompok ? true : false}
              >
                <FormLabel>
                  Nama Kelompok
                  <FormRequired />
                </FormLabel>
                <Input
                  name="nama_kelompok"
                  placeholder="Human Resource"
                  onChange={formik.handleChange}
                  value={formik.values.nama_kelompok}
                />
                <FormErrorMessage>
                  {formik.errors.nama_kelompok as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={formik.errors.besaran_gaji ? true : false}
              >
                <FormLabel>
                  Besaran Gaji
                  <FormRequired />
                </FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Text>Rp</Text>
                  </InputLeftElement>
                  <Input
                    name="besaran_gaji"
                    placeholder="4.000.000"
                    onChange={(e) => {
                      const newValue = parseNumber(e.target.value);
                      if (newValue && newValue > 0) {
                        formik.setFieldValue("besaran_gaji", newValue);
                      } else {
                        formik.setFieldValue("besaran_gaji", "");
                      }
                    }}
                    value={
                      formik.values.besaran_gaji === 0 ||
                      formik.values.besaran_gaji === ""
                        ? ""
                        : formatNumber(formik.values.besaran_gaji)
                    }
                  />
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.besaran_gaji as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="tambahKelompokGajiForm"
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
