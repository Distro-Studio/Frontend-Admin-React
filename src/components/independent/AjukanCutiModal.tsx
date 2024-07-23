import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
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
import backOnClose from "../../lib/backOnCloseOld";
import useBackOnClose from "../../lib/useBackOnCloseOld";
import SelectKaryawan from "../dependent/_Select/SelectKaryawan";
import SelectTipeCuti from "../dependent/_Select/SelectTipeCuti";
import RequiredForm from "../form/RequiredForm";
import { RiCalendarCloseFill } from "@remixicon/react";
import { iconSize } from "../../const/sizes";

interface Props extends ButtonProps {}

export default function AjukanCutiModal({ ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      karyawan: "" as any,
      tipe_cuti: "" as any,
      durasi: "",
    },
    validationSchema: yup.object().shape({
      karyawan: yup.object().required("Harus diisi"),
      tipe_cuti: yup.object().required("Harus diisi"),
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
        leftIcon={<Icon as={RiCalendarCloseFill} fontSize={iconSize} />}
        {...props}
      >
        Ajukan Cuti
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
          formik.resetForm();
        }}
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader ref={initialRef}>Ajukan Cuti</ModalHeader>
          <ModalBody>
            <form id="ajukanCutiForm" onSubmit={formik.handleSubmit}>
              <FormControl
                mb={4}
                isInvalid={formik.errors.karyawan ? true : false}
              >
                <FormLabel>
                  Karyawan
                  <RequiredForm />
                </FormLabel>
                <SelectKaryawan
                  name="karyawan"
                  formik={formik}
                  placeholder="Pilih Karyawan"
                  initialSelected={formik.values.karyawan}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.karyawan as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mb={4}
                isInvalid={formik.errors.tipe_cuti ? true : false}
              >
                <FormLabel>
                  Tipe Cuti
                  <RequiredForm />
                </FormLabel>
                <SelectTipeCuti
                  name="tipe_cuti"
                  formik={formik}
                  placeholder="Pilih Tipe Cuti"
                  initialSelected={formik.values.tipe_cuti}
                  noUseBackOnClose
                />
                <FormErrorMessage>
                  {formik.errors.tipe_cuti as string}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.durasi ? true : false}>
                <FormLabel>
                  Durasi
                  <RequiredForm />
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
            <Button
              type="submit"
              form="ajukanCutiForm"
              w={"100%"}
              colorScheme="ap"
              className="btn-ap clicky"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
