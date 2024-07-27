import {
  Avatar,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackProps,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiArrowDownSLine, RiLogoutBoxLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import { iconSize } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import backOnClose from "../../lib/backOnClose";
import DisclosureHeader from "../dependent/DisclosureHeader";

const LogoutConfirmation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useBackOnClose("logout-confirmation-modal", isOpen, onOpen, onClose);

  return (
    <>
      <MenuItem fontWeight={500} onClick={onOpen}>
        <Text color={"red.400"}>Keluar</Text>
        <Icon
          as={RiLogoutBoxLine}
          fontSize={iconSize}
          color={"red.400"}
          transform={"rotate(180deg)"}
        />
      </MenuItem>

      <Modal
        isOpen={isOpen}
        onClose={backOnClose}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <DisclosureHeader title={"Keluar"} />
          </ModalHeader>
          <ModalBody>
            <Text>Apakah anda yakin akan keluar akun?</Text>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button
              w={"100%"}
              className="btn-solid clicky"
              onClick={backOnClose}
            >
              Tidak
            </Button>
            <Button w={"100%"} className="clicky" colorScheme="red">
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface Props extends StackProps {}

export default function AdminMiniProfile({ ...props }: Props) {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    const dataCookie = getCookie("userData");
    if (dataCookie) {
      setData(JSON.parse(dataCookie));
    }
  }, []);

  const [menuButtonW, setMenuButtonW] = useState<number | undefined>();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (menuButtonRef.current) {
      setMenuButtonW(menuButtonRef.current.offsetWidth);
    }
  }, [menuButtonRef]);

  return (
    <Menu>
      <MenuButton>
        <HStack
          ref={menuButtonRef}
          as={Button}
          className="btn-solid"
          pl={3}
          {...props}
        >
          <Icon as={RiArrowDownSLine} fontSize={iconSize} />

          <Text>{data?.name || "Personalia"}</Text>

          <Avatar name={data?.name} size={"xs"} />
        </HStack>
      </MenuButton>

      <MenuList minW={menuButtonW}>
        <LogoutConfirmation />
      </MenuList>
    </Menu>
  );
}
