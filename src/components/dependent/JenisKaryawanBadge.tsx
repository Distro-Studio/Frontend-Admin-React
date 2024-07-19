import { Badge, BadgeProps } from "@chakra-ui/react";
import chartColors from "../../constant/chartColors";
import { useLightDarkColor } from "../../const/colors";

interface Props extends BadgeProps {
  data: boolean | number;
}

export default function JenisKaryawanBadge({ data, ...props }: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <Badge
      textAlign={"center"}
      color={lightDarkColor}
      bg={data ? chartColors[0] : chartColors[1]}
      {...props}
    >
      {data ? "Shift" : "Non-Shift"}
    </Badge>
  );
}
