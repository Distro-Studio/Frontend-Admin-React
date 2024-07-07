import {
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import backOnClose from "../../lib/backOnCloseOld";
import { useFormik } from "formik";
import * as yup from "yup";
import BackOnCloseButton from "./BackOnCloseButton";
import useBackOnClose from "../../lib/useBackOnClose";

export default function BuatPenggajianModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose(isOpen, onClose);
  const initialRef = useRef(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { sertakan_bor: false },
    validationSchema: yup.object().shape({ sertakan_bor: yup.boolean() }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <>
      <Button
        flex={"1 1 110px"}
        className="btn-ap clicky"
        colorScheme="ap"
        onClick={onOpen}
      >
        Buat Penggajian
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
          <ModalHeader ref={initialRef}>
            <HStack justify={"space-between"}>
              <Text fontSize={20} fontWeight={600}>
                Buat Penggajian
              </Text>

              <BackOnCloseButton aria-label="back on close button" />
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Text mb={6}>Apakah penggajian ini menyertakan BOR?</Text>
            <ButtonGroup w={"100%"}>
              <Button
                w={"50%"}
                colorScheme={!formik.values.sertakan_bor ? "ap" : ""}
                variant={!formik.values.sertakan_bor ? "outline" : ""}
                className={!formik.values.sertakan_bor ? "" : "btn-outline"}
                onClick={() => {
                  formik.setFieldValue("sertakan_bor", false);
                }}
              >
                Tidak
              </Button>
              <Button
                w={"50%"}
                colorScheme={formik.values.sertakan_bor ? "ap" : ""}
                variant={formik.values.sertakan_bor ? "outline" : ""}
                className={formik.values.sertakan_bor ? "" : "btn-outline"}
                onClick={() => {
                  formik.setFieldValue("sertakan_bor", true);
                }}
              >
                Ya
              </Button>
            </ButtonGroup>
          </ModalBody>
          <ModalFooter>
            <Button w={"100%"} className="btn-ap clicky">
              Buat Penggajian
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
