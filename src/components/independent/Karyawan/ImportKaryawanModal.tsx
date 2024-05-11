import {
  Button,
  ButtonGroup,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { RiDownloadLine } from "@remixicon/react";
import React, { useRef } from "react";
import { iconSize } from "../../../const/sizes";
import useBackOnClose from "../../../lib/useBackOnClose";
import backOnClose from "../../../lib/backOnClose";
import * as yup from "yup";
import { useFormik } from "formik";
import FileInputBig from "../../input/FileInputBig";

export default function ImportKaryawanModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { file: [] as File[] | null },
    validationSchema: yup.object().shape({
      file: yup
        .array()
        .min(1, "File harus diisi")
        .test(
          "fileType",
          "Hanya file dengan ekstensi .csv, .xls, atau .xlsx yang diperbolehkan",
          (value: File[] | null | undefined) => {
            if (!value) return false;
            return value.every((file) => {
              const validExtensions = [".csv", ".xls", ".xlsx"];
              const extension = file.name.split(".").pop();
              return extension
                ? validExtensions.includes(`.${extension}`)
                : false;
            });
          }
        ) as any,
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <>
      <Button
        flex={"1 1 110px"}
        variant={"outline"}
        colorScheme="ap"
        className="clicky"
        rightIcon={<Icon as={RiDownloadLine} fontSize={iconSize} />}
        onClick={onOpen}
      >
        Import
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          backOnClose(onClose);
        }}
        initialFocusRef={initialRef}
        isCentered
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent ref={initialRef}>
          <ModalCloseButton />
          <ModalHeader>Import Data Karyawan</ModalHeader>
          <ModalBody>
            <form id="importDataKaryawanForm" onSubmit={formik.handleSubmit}>
              <FileInputBig
                formik={formik}
                name="file"
                accept=".csv, .xls, .xlsx"
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                w={"50%"}
                onClick={() => {
                  backOnClose(onClose);
                }}
                className="clicky"
                bg={"var(--reda)"}
                _hover={{ bg: "var(--reda)" }}
                variant={"ghost"}
                colorScheme="red"
              >
                Batal
              </Button>
              <Button
                w={"50%"}
                type="submit"
                form="importDataKaryawanForm"
                className="btn-ap clicky"
                colorScheme="ap"
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
