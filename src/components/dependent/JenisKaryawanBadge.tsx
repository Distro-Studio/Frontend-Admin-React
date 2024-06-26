import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: boolean | number;
}

export default function JenisKaryawanBadge({ data, ...props }: Props) {
  return (
    <Badge
      textAlign={"center"}
      colorScheme={data ? "ap" : "gray"}
      bg={data ? "var(--p500a4)" : "var(--divider)"}
      {...props}
    >
      {data ? "Shift" : "Non-Shift"}
    </Badge>
  );
}
