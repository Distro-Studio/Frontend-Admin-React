import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { RiMore2Fill } from "@remixicon/react";
import { iconSize } from "../../../const/sizes";
import EditTransferKaryawanModal from "./EditTransferKaryawanModal";

interface Props {
  data: any;
}

export default function OptionModalTransferKaryawan({ data }: Props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        h={"72px"}
        w={"50px"}
        aria-label="Option Button"
        icon={<Icon as={RiMore2Fill} fontSize={iconSize} />}
        className="btn"
        borderRadius={0}
      >
        Actions
      </MenuButton>
      <Portal>
        <MenuList minW={"140px"} zIndex={99}>
          <EditTransferKaryawanModal data={data} />
        </MenuList>
      </Portal>
    </Menu>
  );
}
