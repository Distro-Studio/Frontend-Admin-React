import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  StackProps,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { RiLogoutBoxLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { useBodyColor, useContentBgColor } from "../../const/colors";
import navs from "../../const/navs";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";
import Header from "../dependent/Header";
import CContainer from "./CContainer";
import Container from "./Container";
import TopNavs from "../dependent/TopNavs";

interface Props extends StackProps {
  active: number;
  children?: any;
  noNavs?: boolean;
  title?: string;
  left?: any;
  backLink?: string;
  right?: any;
  topNavsData?: any;
  topNavActive?: number;
}

export default function NavContainer({
  children,
  active,
  noNavs,
  title,
  left,
  backLink,
  right,
  topNavsData,
  topNavActive,
  ...props
}: Props) {
  const smScreen = useScreenWidth() <= 768;

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
          <Box overflowX={"auto"}>
            <HStack
              id="navs"
              position={"fixed"}
              bottom={0}
              left={0}
              minW={"100%"}
              h={"70px"}
              pb={4}
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
          </Box>
        )}

        <CContainer
          bg={useContentBgColor()}
          pb={["86px", null, 6]}
          align={"stretch"}
          minH={"100vh"}
          // w={"100%"}
          flex={1}
          overflowX={"clip"}
          {...props}
        >
          <Header
            title={title}
            left={left}
            backLink={backLink}
            right={right}
            p={responsiveSpacing}
          />

          {topNavsData && typeof topNavActive === "number" && (
            <TopNavs
              data={topNavsData}
              active={topNavActive}
              mb={responsiveSpacing}
            />
          )}

          <VStack
            gap={0}
            w={"100%"}
            align={"stretch"}
            mx={"auto"}
            flex={1}
            // maxW={"1280px"}
          >
            {children}
          </VStack>
        </CContainer>
      </HStack>
    </Container>
  );
}
