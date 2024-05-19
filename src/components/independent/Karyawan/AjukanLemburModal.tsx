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

interface Props extends ButtonProps {}

export default function AjukanLemburModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      user_id: "",
    },
    validationSchema: yup.object().shape({
      user_id: yup.string().required("Harus diisi"),
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
        Ajukan Lembur
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
        <ModalContent ref={initialRef}>
          <ModalCloseButton />
          <ModalHeader>Ajukan Lembur</ModalHeader>
          <ModalBody>
            <form id="ajukanLemburForm">
              <FormControl
                mb={4}
                isInvalid={formik.errors.user_id ? true : false}
              >
                <FormLabel>
                  Karyawan
                  <FormRequired />
                </FormLabel>
                <Input
                  name="user_id"
                  placeholder="pilih"
                  onChange={formik.handleChange}
                  value={formik.values.user_id}
                />
                <FormErrorMessage>
                  {formik.errors.user_id as string}
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
