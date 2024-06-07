import { Button, ButtonProps } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface Props extends ButtonProps {
  to: string;
  children: any;
}

export default function SImpleLink({ to, children, ...props }: Props) {
  return (
    <Button
      colorScheme="ap"
      variant={"ghost"}
      size={"xs"}
      as={Link}
      to={to}
      {...props}
    >
      {children}
    </Button>
  );
}
