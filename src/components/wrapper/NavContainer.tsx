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

interface Props {
  active: number;
  children?: any;
  noNavs?: boolean;
}

export default function NavContainer({ children, active, noNavs }: Props) {
  // SX

  return (
    <Container>
      <HStack flex={1} align={"stretch"} gap={0}>
        {!noNavs && (
          <VStack
            p={4}
            borderRight={"1px solid var(--divider)"}
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

        <CContainer bg={useContentBg()}>{children}</CContainer>
      </HStack>
    </Container>
  );
}
