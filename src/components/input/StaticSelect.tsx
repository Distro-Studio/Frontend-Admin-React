import {
  Button,
  ButtonProps,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
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
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";
import { useRef, useState } from "react";
import { Select__Item__Interface } from "../../const/interfaces";
import { iconSize } from "../../const/sizes";
import useBackOnClose from "../../lib/useBackOnClose";

interface Props extends ButtonProps {
  formik?: any;
  name?: string;
  placeholder: string;
  options: { value: any; label: string }[];
  selectedValue: any;
  noSearch?: boolean;
  noUseBackOnClose?: boolean;
  confirmSelect?: (status: Select__Item__Interface) => void;
}

export default function StaticSelect({
  formik,
  name,
  placeholder,
  options,
  selectedValue,
  noSearch,
  noUseBackOnClose,
  confirmSelect,
  ...props
}: Props) {
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
  const [search, setSearch] = useState<string>("");
  const filteredOptions = options?.filter((option) =>
    option.label.toLowerCase().includes(search.toLocaleLowerCase())
  );

  // SX
  const selectOnError = useColorModeValue(
    "0 0 0 1px #E53E3E",
    "0 0 0 1px #FC8181"
  );

  // console.log(selectedValue);

  return (
    <>
      <Button
        className="btn-clear"
        h={"40px"}
        px={"16px !important"}
        border={"1px solid var(--divider3)"}
        boxShadow={formik && name && formik.errors[name] ? selectOnError : ""}
        borderRadius={8}
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
          {options[selectedValue - 1]?.label || placeholder}
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
            {!noSearch && (
              <InputGroup mt={6}>
                <InputLeftElement>
                  <Icon as={RiSearchLine} fontSize={iconSize} />
                </InputLeftElement>

                <Input
                  ref={initialRef}
                  w={"100%"}
                  placeholder={"Pencarian"}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </InputGroup>
            )}
          </ModalHeader>

          <ModalBody className="scrollY">
            <VStack
              align={"stretch"}
              // bg={"blackAlpha.200"}
              borderRadius={8}
              overflow={"clip"}
              // p={2}
            >
              {filteredOptions && filteredOptions?.length > 0 ? (
                filteredOptions?.map((option, i) => (
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
                        console.log(option);
                        confirmSelect(option);
                      }
                      handleOnClose();
                      setSearch("");
                    }}
                  >
                    <HStack justify={"center"} w={"100%"}>
                      <Text>{option.label}</Text>
                    </HStack>
                  </Button>
                ))
              ) : (
                <Text textAlign={"center"}>Opsi tidak ditemukan</Text>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter pt={"0 !important"}></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
