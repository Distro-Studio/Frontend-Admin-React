import {
  Button,
  ButtonProps,
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
import { Dispatch, forwardRef, useImperativeHandle, useRef } from "react";
import { iconSize } from "../../const/sizes";
import capFirst from "../../lib/capFirst";
import useBackOnClose from "../../lib/useBackOnClose";

interface Props extends ButtonProps {
  placeholder: string;
  children: any;
  selected: any;
  initialSelected?: any;
  formik?: any;
  name?: string;
  noUseBackOnClose?: boolean;
  noSearch?: boolean;
  search?: string;
  setSearch?: Dispatch<string>;
  modalSize?: string;
  isMultiSelect?: boolean;
  confirmMultiSelect?: any;
  setSelected?: Dispatch<any>;
}

const Select = forwardRef(
  (
    {
      placeholder,
      children,
      selected,
      initialSelected,
      formik,
      name,
      noUseBackOnClose,
      noSearch,
      search,
      setSearch,
      modalSize,
      isMultiSelect,
      confirmMultiSelect,
      setSelected,
      ...props
    }: Props,
    ref
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const backOnCloseHook = useBackOnClose;
    if (!noUseBackOnClose) {
      backOnCloseHook(isOpen, onClose);
    }
    const handleOnClose = () => {
      onClose();
      if (!noUseBackOnClose) {
        window.history.back();
      }
    };
    const initialRef = useRef(null);

    useImperativeHandle(ref, () => ({
      handleOnClose,
    }));

    // XS
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
          _focus={{
            border: "1px solid var(--p500)",
            boxShadow: "none !important",
          }}
          cursor={"pointer"}
          onClick={onOpen}
          justifyContent={"space-between"}
          w={"100%"}
          {...props}
        >
          <Text
            opacity={
              selected !== null && selected !== undefined && selected !== ""
                ? 1
                : 0.3
            }
            fontSize={14}
            fontWeight={400}
          >
            {!isMultiSelect && selected
              ? selected.label
              : capFirst(placeholder)}
          </Text>

          <Icon as={RiArrowDownSLine} />
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => {
            handleOnClose();
            if (isMultiSelect && setSelected) {
              setSelected(initialSelected);
            }
          }}
          scrollBehavior="inside"
          initialFocusRef={initialRef}
          isCentered
          size={modalSize}
        >
          <ModalOverlay />
          <ModalContent overflow={"clip"} borderRadius={12}>
            <ModalCloseButton />

            <ModalHeader pr={6}>
              <Text fontSize={20}>{placeholder}</Text>
              {!noSearch && setSearch && (
                <InputGroup mt={6}>
                  <InputLeftElement>
                    <Icon as={RiSearchLine} fontSize={iconSize} />
                  </InputLeftElement>

                  <Input
                    ref={initialRef}
                    w={"100%"}
                    placeholder={"Pencarian"}
                    boxShadow={"none !important"}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    value={search}
                  />
                </InputGroup>
              )}
            </ModalHeader>

            <ModalBody className="scrollY">
              <VStack align={"stretch"} borderRadius={8} overflow={"clip"}>
                {children}
              </VStack>
            </ModalBody>

            <ModalFooter pt={isMultiSelect ? "" : "0 !important"}>
              {isMultiSelect && (
                <Button
                  w={"100%"}
                  className="btn-ap clicky"
                  colorScheme="ap"
                  onClick={() => {
                    if (confirmMultiSelect) {
                      confirmMultiSelect();
                      handleOnClose();
                    }
                  }}
                >
                  Konfirmasi
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default Select;
