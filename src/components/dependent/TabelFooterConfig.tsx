import {
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import PaginationNav from "./PaginationNav";
import { useEffect, useRef, useState } from "react";

interface Props {
  limitConfig?: number;
  setLimitConfig?: (limit: number) => void;
  pageConfig?: number;
  setPageConfig?: (page: number) => void;
  paginationData?: any;
}

export default function TabelFooterConfig({
  limitConfig,
  setLimitConfig,
  pageConfig,
  setPageConfig,
  paginationData,
}: Props) {
  const limitButtonRef = useRef<HTMLButtonElement>(null);
  const [limitMenuListW, setLimitMenuListW] = useState<
    number | (number | null)[] | null
  >(null);
  useEffect(() => {
    if (limitButtonRef.current) {
      setLimitMenuListW(limitButtonRef.current.offsetWidth);
    }
  }, [limitButtonRef, limitConfig]);

  return (
    <Wrap
      spacing={responsiveSpacing}
      justify={"space-between"}
      mt={responsiveSpacing}
    >
      {limitConfig && setLimitConfig && (
        <Menu>
          <MenuButton
            ref={limitButtonRef}
            as={Button}
            className="btn-outline"
            rightIcon={
              <Icon as={RiArrowDownSLine} fontSize={iconSize} opacity={0.6} />
            }
          >
            <HStack>
              <Text color={"p.500"}>{limitConfig}</Text>
              <Text>Row</Text>
            </HStack>
          </MenuButton>

          <MenuList minW={`${limitMenuListW}px`} zIndex={10}>
            <MenuItem
              color={limitConfig === 10 ? "p.500" : ""}
              onClick={() => {
                setLimitConfig(10);
              }}
            >
              10
            </MenuItem>
            <MenuItem
              color={limitConfig === 50 ? "p.500" : ""}
              onClick={() => {
                setLimitConfig(50);
              }}
            >
              50
            </MenuItem>
            <MenuItem
              color={limitConfig === 100 ? "p.500" : ""}
              onClick={() => {
                setLimitConfig(100);
              }}
            >
              100
            </MenuItem>
          </MenuList>
        </Menu>
      )}

      {pageConfig && setPageConfig && (
        <PaginationNav
          page={pageConfig}
          setPage={setPageConfig}
          paginationData={paginationData}
        />
      )}
    </Wrap>
  );
}
