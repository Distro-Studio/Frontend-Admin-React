import {
  Box,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { RiMenu4Line, RiNotification2Line } from "@remixicon/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";
import AdminMiniProfile from "../independent/AdminMiniProfile";
import BackButton from "../independent/BackButton";
import NotificationButton from "../independent/NotificationButton";
import { ColorModeSwitcherHeaderMenu } from "../independent/ColorModeSwitcherHeaderMenu";

interface Props extends StackProps {
  title?: string;
  left?: any;
  backLink?: string;
  right?: any;
}

export default function Header({
  title,
  left,
  backLink,
  right,
  ...props
}: Props) {
  const smScreen = useScreenWidth() <= 768;

  return (
    <HStack
      // flexDir={["column", null, "row"]}
      mb={responsiveSpacing}
      justify={"space-between"}
      gap={4}
      {...props}
    >
      <HStack>
        {left && (
          <Box w={"40px"}>
            {left === "back" ? <BackButton backLink={backLink} /> : left}
          </Box>
        )}

        <Text fontSize={24} fontWeight={700} noOfLines={1}>
          {title}
        </Text>
      </HStack>

      {!smScreen && (
        <ButtonGroup>
          <NotificationButton aria-label="Notification Button" />
          <ColorModeSwitcher />
          <AdminMiniProfile />
        </ButtonGroup>
      )}

      {smScreen && (
        <HStack>
          <AdminMiniProfile />

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={RiMenu4Line} fontSize={24} />}
              className="btn-solid"
            />

            <MenuList>
              <MenuItem>
                <HStack>
                  <Icon as={RiNotification2Line} fontSize={iconSize} />
                  <Text>Notifikasi</Text>
                </HStack>
              </MenuItem>

              <MenuItem p={0}>
                {/* <HStack>
                  <Icon as={RiNotification2Line} fontSize={iconSize} />
                  <Text>Mode Gelap</Text>
                </HStack> */}
                <ColorModeSwitcherHeaderMenu />
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      )}
    </HStack>
  );
}
