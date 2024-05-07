import { Icon, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

interface Props {
  nav: { label: string; icon: any; iconFill: any; link: string };
  index: number;
  active: number;
}

export default function NavItem({ nav, index, active }: Props) {
  const navItemRef = useRef<HTMLDivElement>(null);

  // SX
  const onClickRipple = () => {
    if (navItemRef.current) {
      navItemRef.current.classList.remove("ripple-sm");
      setTimeout(() => {
        if (navItemRef.current) {
          navItemRef.current.classList.add("ripple-sm");
        }
      }, 10);
    }
  };

  return (
    <VStack
      // className={active === index ? "ripple-sm" : ""}
      ref={navItemRef}
      position={"relative"}
      as={Link}
      to={nav.link}
      justify={"center"}
      color={active === index ? "p.500" : ""}
      py={3}
      px={2}
      opacity={active === index ? 1 : 0.6}
      gap={1}
      onClick={onClickRipple}
    >
      <Icon as={active === index ? nav.iconFill : nav.icon} fontSize={24} />
      <Text fontSize={11} fontWeight={550}>
        {nav.label}
      </Text>
    </VStack>
  );
}
