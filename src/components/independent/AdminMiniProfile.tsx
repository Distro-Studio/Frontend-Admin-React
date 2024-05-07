import { Avatar, Button, HStack, Icon, Text } from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import { iconSize } from "../../const/sizes";

export default function AdminMiniProfile() {
  const dataCookie = getCookie("userData");
  const [data, setData] = useState<any | null>(null);
  if (dataCookie) {
    setData(JSON.parse(dataCookie));
  }

  return (
    <HStack as={Button} className="btn-solid clicky" pl={3}>
      <Icon as={RiArrowDownSLine} fontSize={iconSize} />

      <Text>{data?.name || "Admin"}</Text>

      <Avatar name={data?.name} size={"xs"} />
    </HStack>
  );
}
