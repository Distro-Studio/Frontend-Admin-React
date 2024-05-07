import { SimpleGrid, VStack } from "@chakra-ui/react";
import navs from "../../const/navs";
import Container from "./Container";
import { useBodyColor } from "../../const/colors";
import NavItem from "../dependent/NavItem";

interface Props {
  active: number;
  children?: any;
  noNavs?: boolean;
}

export default function NavContainer({ children, active, noNavs }: Props) {
  // SX
  const bodyColor = useBodyColor();

  return (
    <Container p={0}>
      <VStack gap={0} minH={"100vh"} align={"stretch"}>
        <VStack
          id="content"
          flex={1}
          mb={noNavs ? 0 : "85px"}
          align={"stretch"}
          gap={0}
        >
          {children}
        </VStack>

        {!noNavs && (
          <VStack
            position={"fixed"}
            bottom={0}
            left={0}
            w={"100%"}
            overflow={"clip"}
            // zIndex={999999}
          >
            <SimpleGrid
              bg={bodyColor}
              pb={4}
              w={"100%"}
              columns={5}
              borderTop={"1px solid var(--divider)"}
              h={"85px"}
              maxW={"720px"}
              mx={"auto"}
            >
              {navs.map((nav, i) => (
                <NavItem key={i} nav={nav} index={i} active={active} />
              ))}
            </SimpleGrid>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
