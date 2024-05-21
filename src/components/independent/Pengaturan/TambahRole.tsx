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
import * as yup from "yup";
import useBackOnClose from "../../../lib/useBackOnClose";
import { useRef } from "react";
import backOnClose from "../../../lib/backOnClose";
import FormRequired from "../../form/FormRequired";
import Textarea from "../../input/Textarea";

interface Props extends ButtonProps {}

export default function TambahRole({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { name: "", deskripsi: "" },
    validationSchema: yup.object().shape({
      name: yup.string().required("Harus diisi"),
      deskripsi: yup.string().required("Harus diisi"),
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
        Tambah Role
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
          <ModalHeader ref={initialRef}>Tambah Role</ModalHeader>
          <ModalBody>
            <form id="tambahRoleForm">
              <FormControl mb={4} isInvalid={formik.errors.name ? true : false}>
                <FormLabel>
                  Nama Role
                  <FormRequired />
                </FormLabel>
                <Input
                  name="name"
                  placeholder="Human Resource"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <FormErrorMessage>
                  {formik.errors.name as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.deskripsi ? true : false}>
                <FormLabel>
                  Deskripsi
                  <FormRequired />
                </FormLabel>
                <Textarea
                  name="deskripsi"
                  placeholder="Diperuntukan untuk jabatan HR"
                  formik={formik}
                />
                <FormErrorMessage>
                  {formik.errors.deskripsi as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              form="tambahRoleForm"
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
