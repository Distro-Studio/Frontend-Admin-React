import { Box, ButtonGroup, HStack, StackProps, Text } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import AdminMiniProfile from "../independent/AdminMiniProfile";
import BackButton from "../independent/BackButton";
import NotificationButton from "../independent/NotificationButton";

interface Props extends StackProps {
  title?: string;
  left?: any;
  right?: any;
}

export default function Header({ title, left, right, ...props }: Props) {
  return (
    <HStack
      flexDir={["column", null, "row"]}
      mb={6}
      justify={"space-between"}
      {...props}
    >
      <HStack>
        {left && (
          <Box w={"40px"}>{left === "back" ? <BackButton /> : left}</Box>
        )}

        <Text fontSize={24} fontWeight={700}>
          {title}
        </Text>
      </HStack>

      <ButtonGroup>
        <NotificationButton aria-label="Notification Button" />
        <ColorModeSwitcher />
        <AdminMiniProfile />
      </ButtonGroup>
    </HStack>
  );
}
