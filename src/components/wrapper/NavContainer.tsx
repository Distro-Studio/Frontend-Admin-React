import {
  HStack,
  Icon,
  IconButton,
  Image,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { RiLogoutBoxLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { useContentBg } from "../../const/colors";
import navs from "../../const/navs";
import { iconSize } from "../../const/sizes";
import CContainer from "./CContainer";
import Container from "./Container";
import Header from "../Dependent/Header";

interface Props {
  active: number;
  children?: any;
  noNavs?: boolean;
  title?: string;
  left?: any;
  right?: any;
}

export default function NavContainer({
  children,
  active,
  noNavs,
  title,
  left,
  right,
}: Props) {
  // SX

  return (
    <Container>
      <HStack flex={1} align={"stretch"} gap={0}>
        {!noNavs && (
          <VStack
            // borderRight={"1px solid var(--divider)"}
            p={4}
            justify={"space-between"}
          >
            <VStack>
              <Image src="/logo512.png" w={"40px"} mb={8} />
              {navs.map((nav, i) => (
                <Tooltip key={i} label={nav.label} placement="right">
                  <IconButton
                    aria-label={`Nav Button ${nav.label}`}
                    icon={
                      <Icon
                        as={nav.icon}
                        fontSize={iconSize}
                        opacity={active === i ? 1 : 0.6}
                      />
                    }
                    className="btn clicky"
                    color={active === i ? "p.500" : ""}
                    as={Link}
                    to={nav.link}
                  />
                </Tooltip>
              ))}
            </VStack>

            <Tooltip label={"Keluar"} placement="right">
              <IconButton
                aria-label="Logout Butotn"
                icon={
                  <Icon
                    as={RiLogoutBoxLine}
                    fontSize={iconSize}
                    transform={"scaleX(-1)"}
                  />
                }
                bg={"var(--reda)"}
                _hover={{ bg: "var(--reda)" }}
                _active={{ bg: "var(--reda)" }}
                color={"red.400"}
                className="clicky"
              />
            </Tooltip>
          </VStack>
        )}

        <CContainer bg={useContentBg()} p={6}>
          <Header title={title} left={left} right={right} />

          {children}
        </CContainer>
      </HStack>
    </Container>
  );
}
