import {
  Avatar,
  Badge,
  Button,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowDownSLine,
  RiArrowUpLine,
  RiMore2Fill,
} from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { useBodyColor, useContentBgColor } from "../../const/colors";
import { Tabel__Column__Interface } from "../../const/interfaces";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import TabelContainer from "../wrapper/TabelContainer";
import PaginationNav from "./PaginationNav";

interface Props {
  columns: Tabel__Column__Interface[];
  data: any[];
  paginationData?: any;
  pageConfig?: number;
  setPageConfig?: (page: number) => void;
  limitConfig?: number;
  setLimitConfig?: (limit: number) => void;
}

export default function Tabel({
  columns,
  data,
  paginationData,
  pageConfig,
  setPageConfig,
  limitConfig,
  setLimitConfig,
}: Props) {
  // Sort Congig
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>({ key: columns[0].key, direction: "asc" });
  const sortedData = [...data];
  if (sortConfig !== null) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  const sort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const limitButtonRef = useRef<HTMLButtonElement>(null);
  const [limitMenuListW, setLimitMenuListW] = useState<
    number | (number | null)[] | null
  >(null);
  useEffect(() => {
    if (limitButtonRef.current) {
      setLimitMenuListW(limitButtonRef.current.offsetWidth);
    }
  }, [limitButtonRef, limitConfig]);

  // SX
  const contectBgColor = useContentBgColor();
  const bodyColor = useBodyColor();

  return (
    // <div style={{ overflowX: "auto" }}>
    <>
      <TabelContainer>
        <Table minW={"100%"}>
          <Thead>
            <Tr>
              {columns.map((column, i) => (
                <Th
                  key={i}
                  whiteSpace={"nowrap"}
                  onClick={() => sort(column.key)}
                  cursor={"pointer"}
                  position={"sticky"}
                  top={0}
                  borderBottom={"none !important"}
                  bg={bodyColor}
                  zIndex={2}
                  p={0}
                >
                  <HStack
                    justify={"space-between"}
                    borderBottom={"1px solid var(--divider3)"}
                    px={4}
                    py={3}
                    h={"52px"}
                    pl={i === 0 ? 4 : ""}
                    pr={i === columns.length - 1 ? 4 : ""}
                  >
                    <Text fontWeight={600} flexShrink={0} lineHeight={1.2}>
                      {column.label}
                    </Text>

                    {sortConfig && sortConfig.key === column.key && (
                      <>
                        {sortConfig.direction === "asc" ? (
                          <Icon
                            as={RiArrowUpLine}
                            color={"p.500"}
                            fontSize={16}
                          />
                        ) : (
                          <Icon
                            as={RiArrowDownLine}
                            color={"p.500"}
                            fontSize={16}
                          />
                        )}
                      </>
                    )}
                  </HStack>
                </Th>
              ))}

              {/* Kolom tetap di sebelah kanan */}
              <Th
                position={"sticky"}
                top={0}
                right={0}
                borderBottom={"none !important"}
                p={0}
                bg={bodyColor}
                zIndex={2}
              >
                <VStack
                  px={4}
                  py={3}
                  zIndex={99}
                  borderLeft={"1px solid var(--divider3)"}
                  borderBottom={"1px solid var(--divider3)"}
                  h={"52px"}
                ></VStack>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {sortedData.map((row, i) => (
              <Tr key={i} bg={i % 2 === 0 ? contectBgColor : ""}>
                {columns.map((column, colIndex) => (
                  <Td
                    key={colIndex}
                    pl={colIndex === 0 ? 4 : ""}
                    pr={colIndex === columns.length - 1 ? 4 : ""}
                    whiteSpace={"nowrap"}
                    textAlign={
                      row[column.key] === undefined || row[column.key] === null
                        ? "center" // Jika datanya kosong, textAlign menjadi center
                        : column.dataType === "number"
                        ? "right" // Jika numeric, textAlign menjadi right
                        : "left" // Jika tidak, textAlign defaultnya menjadi left
                    }
                    opacity={
                      row[column.key] === undefined || row[column.key] === null
                        ? 0.6
                        : 1
                    }
                  >
                    {row[column.key] !== undefined &&
                    row[column.key] !== null ? (
                      column.dataType === "date" ? (
                        formatDate(row[column.key])
                      ) : column.dataType === "number" ? (
                        formatNumber(row[column.key])
                      ) : column.dataType === "badge" ? (
                        <Badge
                          w={"100%"}
                          textAlign={"center"}
                          colorScheme="teal"
                        >
                          {row[column.key]}
                        </Badge>
                      ) : column.dataType === "avatarAndName" ? (
                        <HStack>
                          <Avatar
                            size={"sm"}
                            name={row[column.key]}
                            src={row.avatar}
                          />
                          <Text>{row[column.key]}</Text>
                        </HStack>
                      ) : (
                        row[column.key]
                      )
                    ) : (
                      "-"
                    )}
                  </Td>
                ))}

                {/* Kolom tetap di sebelah kanan */}
                <Td
                  position={"sticky"}
                  right={0}
                  p={0}
                  bg={i % 2 === 0 ? contectBgColor : bodyColor}
                  zIndex={1}
                >
                  <VStack
                    h={"72px"}
                    borderLeft={"1px solid var(--divider3)"}
                    justify={"center"}
                  >
                    <IconButton
                      h={"72px"}
                      aria-label="Option Button"
                      icon={<Icon as={RiMore2Fill} fontSize={iconSize} />}
                      className="btn"
                      borderRadius={0}
                    />
                  </VStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TabelContainer>

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
              className="btn-solid"
              rightIcon={
                <Icon as={RiArrowDownSLine} fontSize={iconSize} opacity={0.6} />
              }
            >
              <HStack>
                <Text opacity={0.6}>Row</Text>
                <Text color={"p.500"}>{limitConfig}</Text>
              </HStack>
            </MenuButton>

            <MenuList minW={`${limitMenuListW}px`}>
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
    </>
    // </div>
  );
}
