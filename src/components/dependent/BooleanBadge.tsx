import { Badge, BadgeProps } from "@chakra-ui/react";

interface Props extends BadgeProps {
  data: boolean | number;
  trueValue: string;
  falseValue: string;
}

export default function BooleanBadge({
  data,
  trueValue,
  falseValue,
  ...props
}: Props) {
  return (
    <Badge textAlign={"center"} colorScheme={data ? "green" : "red"} {...props}>
      {data ? trueValue : falseValue}
    </Badge>
  );
}