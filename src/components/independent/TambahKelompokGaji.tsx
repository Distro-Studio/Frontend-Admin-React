import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiAddCircleFill } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import { iconSize } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";
import NumberInput from "../dependent/input/NumberInput";
import RequiredForm from "../form/RequiredForm";

interface Props extends ButtonProps {}

export default function TambahKelompokGaji({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("tambah-kelompok-gaji-modal", isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { nama_kelompok: undefined, besaran_gaji: undefined as any },
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
        leftIcon={<Icon as={RiAddCircleFill} fontSize={iconSize} />}
        pl={5}
        {...props}
      >
        Tambah Kelompok Gaji
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose();
          formik.resetForm();
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ref={initialRef}>
            <DisclosureHeader title="Tambah Kelompok Gaji" />
          </ModalHeader>
          <ModalBody>
            <form id="tambahKelompokGajiForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.nama_kelompok ? true : false}
              >
                <FormLabel>
                  Nama Kelompok
                  <RequiredForm />
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
                  <RequiredForm />
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pl={4}>
                    <Text>Rp</Text>
                  </InputLeftElement>
                  <NumberInput
                    pl={12}
                    name="besaran_gaji"
                    placeholder="5.500.000"
                    onChangeSetter={(input) => {
                      formik.setFieldValue("besaran_gaji", input);
                    }}
                    inputValue={formik.values.besaran_gaji}
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
