import React from "react";
import CContainer from "../wrapper/CContainer";
import { useLightDarkColor } from "../../const/colors";
import pengaturanTopNavs from "../../const/pengaturanTopNavs";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  active: number;
  activeTopNavs: number;
}

export default function PengaturanNavs({ active, activeTopNavs }: Props) {
  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <CContainer
      p={4}
      bg={lightDarkColor}
      borderRadius={12}
      w={"230px"}
      flex={"0 0 230px"}
      flexShrink={0}
      gap={2}
    >
      {pengaturanTopNavs[activeTopNavs].subNavs?.map((nav, i) => (
        <Button
          key={i}
          justifyContent={"flex-start"}
          className={i === active ? "btn-apa clicky" : "btn clicky"}
          fontWeight={500}
          as={Link}
          to={nav.link}
          h={"50px"}
          size={"sm"}
          px={"16px !important"}
        >
          {nav.label}
        </Button>
      ))}
    </CContainer>
  );
}
