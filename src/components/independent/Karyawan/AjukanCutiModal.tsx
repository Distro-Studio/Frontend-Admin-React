import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import useBackOnClose from "../../../lib/useBackOnClose";
import SelectKaryawan from "../../dependent/_Select/SelectKaryawan";
import SelectTipeCuti from "../../dependent/_Select/SelectTipeCuti";
import FormRequired from "../../form/FormRequired";

interface Props extends ButtonProps {}

export default function AjukanCutiModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      user_id: "",
      tipe_cuti_id: "",
      durasi: "",
    },
    validationSchema: yup.object().shape({
      user_id: yup.string().required("Harus diisi"),
      tipe_cuti_id: yup.string().required("Harus diisi"),
      durasi: yup.string().required("Harus diisi"),
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
        Ajukan Cuti
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
          <ModalHeader ref={initialRef}>Ajukan Cuti</ModalHeader>
          <ModalBody>
            <form id="ajukanCutiForm">
              <FormControl
                mb={4}
                isInvalid={formik.errors.user_id ? true : false}
              >
                <FormLabel>
                  Karyawan
                  <FormRequired />
                </FormLabel>
                <SelectKaryawan
                  name="user_id"
                  formik={formik}
                  placeholder="Pilih Karyawan"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.user_id as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.tipe_cuti_id ? true : false}
              >
                <FormLabel>
                  Tipe Cuti
                  <FormRequired />
                </FormLabel>
                <SelectTipeCuti
                  name="tipe_cuti_id"
                  formik={formik}
                  placeholder="Pilih Tipe Cuti"
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.tipe_cuti_id as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.durasi ? true : false}>
                <FormLabel>
                  Durasi
                  <FormRequired />
                </FormLabel>
                <InputGroup>
                  <Input name="durasi" placeholder="5" pr={16} />
                  <InputRightElement w={"fit-content"} flexShrink={0} px={4}>
                    <Text>Hari</Text>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {formik.errors.durasi as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} colorScheme="ap" className="btn-ap clicky">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
