import {
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  StackProps,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { RiLogoutBoxLine } from "@remixicon/react";
import { Link, useNavigate } from "react-router-dom";
import { useBodyColor, useContentBgColor } from "../../const/colors";
import navs from "../../const/navs";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";
import Header from "../dependent/Header";
import CContainer from "./CContainer";
import Container from "./Container";
import TopNavs from "../dependent/TopNavs";
import { useEffect, useRef, useState } from "react";

const NavMenu = ({ nav, i, active, topNavActive }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 50);
  };

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        as={IconButton}
        aria-label={`Nav Button ${nav.label}`}
        icon={
          <Icon
            as={nav.icon}
            fontSize={iconSize} // Assuming iconSize is 24
            opacity={active === i ? 1 : 0.6}
          />
        }
        className="btn"
        onClick={() => {
          navigate(nav.link);
        }}
        color={active === i ? "p.500" : ""}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <Portal>
        <MenuList
          zIndex={20}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => {
            setIsOpen(false);
          }}
          sx={{
            position: "absolute",
            top: "-50px", // Adjust this value as needed
            left: "calc(100% + 42px)", // Place it to the right of the button
            marginLeft: "8px", // Optional: adjust space between button and menu
          }}
        >
          {nav.subNavs.map((subNav: any, ii: number) => (
            <MenuItem
              key={ii}
              as={Link}
              to={subNav.link}
              color={(active === i && ii) === topNavActive ? "p.500" : ""}
            >
              {subNav.label}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

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
            overflowX={"clip"}
            position={"sticky"}
            top={0}
            w={"72px"}
            flexShrink={0}
          >
            <VStack>
              <Image src="/logo512.png" w={"40px"} mb={8} />
              {navs.map((nav, i) => {
                console.log(nav);

                return nav.subNavs ? (
                  <NavMenu
                    key={i}
                    nav={nav}
                    i={i}
                    topNavActive={topNavActive}
                    active={active}
                  />
                ) : (
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
                      className="btn"
                      color={active === i ? "p.500" : ""}
                      as={Link}
                      to={nav.link}
                    />
                  </Tooltip>
                );
              })}
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
          h={"100vh"}
          maxW={smScreen ? "100%" : "calc(100% - 72px)"}
          // w={"100%"}
          flex={"1 1 0"}
          overflowX={"clip"}
          overflowY={"auto"}
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
            overflowY={"auto"}
            // maxW={"1280px"}
          >
            {children}
          </VStack>
        </CContainer>
      </HStack>
    </Container>
  );
}
