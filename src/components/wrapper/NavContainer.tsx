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
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContentBgColor, useLightDarkColor } from "../../const/colors";
import navs from "../../const/navs";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useScreenWidth from "../../lib/useScreenWidth";
import Header from "../dependent/Header";
import TopNavs from "../dependent/TopNavs";
import CContainer from "./CContainer";
import Container from "./Container";

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
            fontSize={iconSize}
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
          minW={"fit-content"}
          sx={{
            position: "absolute",
            top: nav.label === "Pengaturan" ? "4px" : "-52px",
            left: "calc(100% + 42px)",
            marginLeft: "8px",
          }}
        >
          {nav.subNavs.map((subNav: any, ii: number) => (
            <MenuItem
              key={ii}
              as={Link}
              to={subNav.link}
              fontWeight={(active === i && ii) === topNavActive ? 600 : 500}
              color={(active === i && ii) === topNavActive ? "p.500" : ""}
              bg={(active === i && ii) === topNavActive ? "var(--p500a5)" : ""}
              whiteSpace={"nowrap"}
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
  const lightDarkColor = useLightDarkColor();

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
            <VStack flex={1}>
              <Image src="/logo512.png" w={"40px"} mb={8} />

              {navs.map((nav, i) => (
                <Box key={i} mt={nav.label === "Pengaturan" ? "auto" : ""}>
                  <NavMenu
                    nav={nav}
                    i={i}
                    topNavActive={topNavActive}
                    active={active}
                  />
                </Box>
              ))}
            </VStack>
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
              bg={lightDarkColor}
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

          {topNavsData &&
            topNavsData.length > 1 &&
            typeof topNavActive === "number" && (
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
