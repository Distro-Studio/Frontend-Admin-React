import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import { RiNotification2Line } from "@remixicon/react";
import { Link } from "react-router-dom";

interface Props extends IconButtonProps {}

export default function NotificationButton({ ...props }: Props) {
  return (
    <IconButton
      icon={<Icon as={RiNotification2Line} mb={"2px"} fontSize={18} />}
      className="btn clicky"
      as={Link}
      to={"/notifikasi"}
      {...props}
    />
  );
}
