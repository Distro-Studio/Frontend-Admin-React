import { Box, Button, HStack, StackProps, Text } from "@chakra-ui/react";
import { TopNavs__Interface } from "../../const/interfaces";
import { Link } from "react-router-dom";
import CWrapper from "../wrapper/CWrapper";

interface Props extends StackProps {
  data: TopNavs__Interface[];
  active: number;
}

export default function TopNavs({ data, active, ...props }: Props) {
  return (
    <Box overflowX={"auto"} className="noScroll" w={"100%"}>
      <CWrapper>
        <HStack w={"max-content"} {...props}>
          {data.map((nav, i) => (
            <Button
              key={i}
              as={Link}
              to={nav.link}
              className={active === i ? "btn-apa" : "btn-solid"}
            >
              <Text opacity={active === i ? 1 : 0.6}>{nav.label}</Text>
            </Button>
          ))}
        </HStack>
      </CWrapper>
    </Box>
  );
}
