import { Badge, BadgeProps } from "@chakra-ui/react";
import { statusKaryawanColorScheme } from "../../const/colors";

interface Props extends BadgeProps {
  data: string;
}

export default function StatusKaryawanBadge({ data, ...props }: Props) {
  return (
    <Badge
      textAlign={"center"}
      colorScheme={
        //@ts-ignore
        statusKaryawanColorScheme[data]
      }
      {...props}
    >
      {data}
    </Badge>
  );
}
