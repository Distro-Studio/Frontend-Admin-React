import { Box, Button, HStack, StackProps, Text } from "@chakra-ui/react";
import { TopNavs__Interface } from "../../const/interfaces";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import CWrapper from "../wrapper/CWrapper";

interface Props extends StackProps {
  data: TopNavs__Interface[];
  active: number;
}

export default function TopNavs({ data, active, ...props }: Props) {
  const activeNavRef = useRef<any>(null);

  useEffect(() => {
    if (activeNavRef.current) {
      activeNavRef.current.scrollIntoView({
        inline: "start",
      });
    }
  }, [active]);

  return (
    <Box overflowX={"auto"} className="noScroll" w={"100%"}>
      <CWrapper scrollSnapType={"x mandatory"}>
        <HStack w={"max-content"} {...props}>
          {data.map((nav, i) => (
            <Button
              key={i}
              as={Link}
              to={nav.link}
              className={active === i ? "btn-apa" : "btn-solid"}
              scrollSnapAlign={"center"}
              ref={active === i ? activeNavRef : null}
            >
              <Text opacity={active === i ? 1 : 0.6}>{nav.label}</Text>
            </Button>
          ))}
        </HStack>
      </CWrapper>
    </Box>
  );
}
