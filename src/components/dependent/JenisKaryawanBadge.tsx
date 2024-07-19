import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: boolean | number;
}

export default function JenisKaryawanBadge({ data, ...props }: Props) {
  // SX

  return (
    <Badge
      borderRadius={"full"}
      textAlign={"center"}
      colorScheme={data ? "orange" : "blue"}
      {...props}
    >
      {data ? "Shift" : "Non-Shift"}
    </Badge>
  );
}
