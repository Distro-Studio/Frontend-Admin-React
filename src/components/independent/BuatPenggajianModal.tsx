import {
  Button,
  ButtonGroup,
  ButtonProps,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiFileList3Fill } from "@remixicon/react";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";
import { iconSize } from "../../const/sizes";
import backOnClose from "../../lib/backOnCloseOld";
import useBackOnClose from "../../lib/useBackOnCloseOld";
import BackOnCloseButton from "./BackOnCloseButton";

interface Props extends ButtonProps {}

export default function BuatPenggajianModal({ ...props }: Props) {
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
        className="btn-ap clicky"
        colorScheme="ap"
        onClick={onOpen}
        leftIcon={<Icon as={RiFileList3Fill} fontSize={iconSize} />}
        pl={5}
        {...props}
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
