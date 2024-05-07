import { Box, ButtonGroup, HStack, StackProps, Text } from "@chakra-ui/react";
import BackButton from "../Independent/BackButton";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import NotificationButton from "../Independent/NotificationButton";
import AdminMiniProfile from "../Independent/AdminMiniProfile";

interface Props extends StackProps {
  title?: string;
  left?: any;
  right?: any;
}

export default function Header({ title, left, right, ...props }: Props) {
  return (
    <HStack mb={6} justify={"space-between"} {...props}>
      {left && <Box w={"40px"}>{left === "back" ? <BackButton /> : left}</Box>}

      <Text fontSize={24} fontWeight={700}>
        {title}
      </Text>

      <ButtonGroup>
        <NotificationButton
          className="btn-solid"
          aria-label="Notification Button"
        />
        <ColorModeSwitcher className="btn-solid" />
        <AdminMiniProfile />
      </ButtonGroup>
    </HStack>
  );
}