import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useRef } from "react";
import { ButtonProps } from "react-day-picker";
import { Select__Item__Interface } from "../../../const/interfaces";
import useBackOnClose from "../../../lib/useBackOnClose";

interface Props extends ButtonProps {
  formik?: any;
  name?: string;
  placeholder: string;
  selectedValue: any;
  noSearch?: boolean;
  noUseBackOnClose?: boolean;
  confirmSelect?: (status: Select__Item__Interface) => void;
  isBooleanOptions?: boolean;
}

export default function SelectStatusHidup({
  formik,
  name,
  placeholder,
  selectedValue,
  noSearch,
  noUseBackOnClose,
  confirmSelect,
  isBooleanOptions,
  ...props
}: Props) {
  const options = [
    {
      value: 0,
      label: "Meninggal",
    },
    {
      value: 1,
      label: "Hidup",
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const backOnClose = useBackOnClose;
  if (!noUseBackOnClose) {
    backOnClose(isOpen, onClose);
  }
  const handleOnClose = () => {
    onClose();
    if (!noUseBackOnClose) {
      window.history.back();
    }
  };
  const initialRef = useRef(null);

  // SX
  const selectOnError = useColorModeValue(
    "0 0 0 1px #E53E3E",
    "0 0 0 1px #FC8181"
  );

  return (
    <>
      <Button
        className="btn-clear"
        h={"40px"}
        px={"16px !important"}
        border={"1px solid var(--divider3)"}
        boxShadow={formik && name && formik.errors[name] ? selectOnError : ""}
        borderRadius={8}
        _focus={{ border: "1px solid var(--p500)" }}
        cursor={"pointer"}
        onClick={onOpen}
        justifyContent={"space-between"}
        w={"100%"}
        {...props}
      >
        <Text
          opacity={
            selectedValue !== null &&
            selectedValue !== undefined &&
            selectedValue !== ""
              ? 1
              : 0.3
          }
          fontSize={14}
          fontWeight={400}
        >
          {options[selectedValue].label || placeholder}
        </Text>

        <Icon as={RiArrowDownSLine} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        scrollBehavior="inside"
        initialFocusRef={initialRef}
        isCentered
      >
        <ModalOverlay />
        <ModalContent overflow={"clip"} borderRadius={12}>
          <ModalCloseButton />

          <ModalHeader pr={6}>
            <Text fontSize={20}>{placeholder}</Text>
          </ModalHeader>

          <ModalBody className="scrollY" minH={"88px"}>
            <VStack
              align={"stretch"}
              // bg={"blackAlpha.200"}
              borderRadius={8}
              overflow={"clip"}
              // p={2}
            >
              {options?.map((option, i) => (
                <Button
                  bg={
                    selectedValue === option.value
                      ? "var(--p500a3) !important"
                      : ""
                  }
                  _hover={{
                    bg:
                      selectedValue === option.value
                        ? "var(--p500a3) !important"
                        : "var(--divider) !important",
                  }}
                  // color={selectedValue === option.value ? "p.500" : ""}
                  border={"1px solid var(--divider)"}
                  borderColor={
                    selectedValue === option.value ? "var(--p500a1)" : ""
                  }
                  key={i}
                  onClick={() => {
                    if (formik) {
                      formik.setFieldValue(name, option.value);
                    }
                    if (confirmSelect) {
                      confirmSelect(option);
                    }
                    handleOnClose();
                  }}
                >
                  <HStack justify={"center"} w={"100%"}>
                    <Text>{option.label}</Text>
                  </HStack>
                </Button>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter pt={"0 !important"}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
