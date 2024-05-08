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
import { useBodyColor, useContentBg } from "../../const/colors";
import navs from "../../const/navs";
import { iconSize } from "../../const/sizes";
import CContainer from "./CContainer";
import Container from "./Container";
import Header from "../dependent/Header";
import useScreenWidth from "../../lib/useScreenWidth";

interface Props {
  active: number;
  children?: any;
  noNavs?: boolean;
  title?: string;
  left?: any;
  right?: any;
}

export default function NavWrapper({
  children,
  active,
  noNavs,
  title,
  left,
  right,
}: Props) {
  const smScreen = useScreenWidth() <= 500;

  // SX
  const bodyColor = useBodyColor();

  return (
    <Container>
      <HStack flex={1} align={"stretch"} gap={0}>
        {!noNavs && !smScreen && (
          <VStack
            id="navs"
            p={4}
            justify={"space-between"}
            h={"100vh"}
            overflowY={"auto"}
            position={"sticky"}
            top={0}
            flexShrink={0}
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

            <Tooltip label={"Keluar"} placement="right" flexShrink={0}>
              <IconButton
                flexShrink={0}
                mt={8}
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

        {!noNavs && smScreen && (
          <HStack
            id="navs"
            overflowX={"auto"}
            position={"fixed"}
            bottom={0}
            left={0}
            minW={"100%"}
            h={"60px"}
            zIndex={99}
            bg={bodyColor}
            justify={"center"}
          >
            {navs.map((nav, i) => (
              <Tooltip key={i} placement="top">
                <IconButton
                  aria-label={`Nav Button ${nav.label}`}
                  icon={
                    <Icon
                      as={nav.icon}
                      fontSize={20}
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
          </HStack>
        )}

        <CContainer
          bg={useContentBg()}
          p={smScreen ? 4 : 6}
          pb={smScreen ? "76px" : ""}
        >
          <Header title={title} left={left} right={right} />

          {children}
        </CContainer>
      </HStack>
    </Container>
  );
}
