import {
  Button,
  ButtonProps,
  FormControl,
  FormErrorMessage,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiUploadLine } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import { iconSize } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "./DisclosureHeader";
import FileInputLarge from "./input/FileInputLarge";

interface Props extends ButtonProps {
  url: string;
}

export default function ImportModal({ url, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(`export-modal-${1}`, isOpen, onOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { file: undefined },
    validationSchema: yup.object().shape({
      file: yup
        .mixed()
        .nullable()
        .test(
          "fileType",
          "Hanya file dengan ekstensi .csv, .xls, atau .xlsx yang diperbolehkan",
          (value: any) => {
            if (value === null || value === undefined) return false; // Tidak boleh kosong
            if (typeof value === "string") return true; // String dianggap valid
            if (value instanceof File) {
              const validExtensions = [".csv", ".xls", ".xlsx"];
              const extension = value.name.split(".").pop();
              return extension
                ? validExtensions.includes(`.${extension}`)
                : false;
            }
            return false;
          }
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      //TODO post file
    },
  });

  return (
    <>
      <Button
        variant={"outline"}
        colorScheme="ap"
        className="clicky"
        rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
        onClick={onOpen}
        {...props}
      >
        Import
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
            <DisclosureHeader title={"Import"} />
          </ModalHeader>
          <ModalBody>
            <form id="importForm" onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={!!formik.errors.file}>
                <FileInputLarge
                  name="file"
                  accept=".csv, .xls, .xlsx"
                  onChangeSetter={(input) => {
                    formik.setFieldValue("file", input);
                  }}
                  inputValue={formik.values.file}
                  placeholder="Mendukung CSV, XLS, XLSX"
                />
                <FormErrorMessage>
                  {formik.errors.file as string}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              type="submit"
              form="importForm"
              w={"100%"}
              className="btn-ap clicky"
              colorScheme="ap"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
