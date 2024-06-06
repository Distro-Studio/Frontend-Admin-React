import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: boolean | number;
}

export default function JenisKaryawanBadge({ data, ...props }: Props) {
  return (
    <Badge textAlign={"center"} colorScheme={data ? "ap" : "gray"} {...props}>
      {data ? "Shift" : "Non-Shift"}
    </Badge>
  );
}
