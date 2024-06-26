import {
  Avatar,
  Button,
  HStack,
  Icon,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { iconSize } from "../../const/sizes";

interface Props extends StackProps {}

export default function AdminMiniProfile({ ...props }: Props) {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    const dataCookie = getCookie("userData");
    if (dataCookie) {
      setData(JSON.parse(dataCookie));
    }
  }, []);

  return (
    <HStack as={Button} className="btn-solid clicky" pl={3} {...props}>
      <Icon as={RiArrowDownSLine} fontSize={iconSize} />

      <Text>{data?.name || "Admin"}</Text>

      <Avatar name={data?.name} size={"xs"} />
    </HStack>
  );
}
