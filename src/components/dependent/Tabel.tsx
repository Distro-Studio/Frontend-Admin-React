import {
  Avatar,
  Badge,
  BoxProps,
  Center,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine, RiMore2Fill } from "@remixicon/react";
import { useState } from "react";
import { useBodyColor, useContentBgColor } from "../../const/colors";
import { Tabel__Column__Interface } from "../../const/interfaces";
import { iconSize } from "../../const/sizes";
import formatDate from "../../lib/formatDate";
import formatNumber from "../../lib/formatNumber";
import TabelContainer from "../wrapper/TabelContainer";
import TabelFooterConfig from "./TabelFooterConfig";
import { Link } from "react-router-dom";

interface Props extends BoxProps {
  columns: Tabel__Column__Interface[];
  data: any[];
  limitConfig?: number;
  setLimitConfig?: (limit: number) => void;
  pageConfig?: number;
  setPageConfig?: (page: number) => void;
  paginationData?: any;
}

export default function Tabel({
  columns,
  data,
  paginationData,
  pageConfig,
  setPageConfig,
  limitConfig,
  setLimitConfig,
  ...props
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

  // SX
  const contentBgColor = useContentBgColor();
  const bodyColor = useBodyColor();

  return (
    // <div style={{ overflowX: "auto" }}>
    <>
      <TabelContainer {...props}>
        <Table minW={"100%"}>
          <Thead>
            <Tr position={"sticky"} top={0} zIndex={3}>
              <Th
                position={"sticky"}
                left={0}
                p={0}
                borderBottom={"none !important"}
                zIndex={3}
              >
                <Center
                  p={4}
                  h={"52px"}
                  borderRight={"1px solid var(--divider3)"}
                  bg={bodyColor}
                  borderBottom={"1px solid var(--divider3) !important"}
                >
                  <Checkbox colorScheme="ap" />
                </Center>
              </Th>

              {columns.map((column, i) => (
                <Th
                  key={i}
                  whiteSpace={"nowrap"}
                  onClick={() => sort(column.key)}
                  cursor={"pointer"}
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
              <Tr key={i} bg={i % 2 === 0 ? contentBgColor : ""}>
                <Td
                  position={"sticky"}
                  left={0}
                  p={0}
                  bg={bodyColor}
                  zIndex={2}
                >
                  <Center
                    h={"94px"}
                    bg={i % 2 === 0 ? contentBgColor : bodyColor}
                    p={4}
                    borderRight={"1px solid var(--divider3)"}
                  >
                    <Checkbox colorScheme="ap" />
                  </Center>
                </Td>

                {columns.map((column, colIndex) => {
                  const typicalRender = {
                    date: formatDate(row[column.key]),
                    number: formatNumber(row[column.key]),
                    badge: (
                      <Badge w={"100%"} textAlign={"center"} colorScheme="teal">
                        {row[column.key]}
                      </Badge>
                    ),
                    avatarAndName: (
                      <HStack>
                        <Avatar
                          size={"sm"}
                          name={row[column.key]}
                          src={row.avatar}
                        />
                        <Text>{row[column.key]}</Text>
                      </HStack>
                    ),
                    link: (
                      <Text
                        as={Link}
                        color={"p.500"}
                        fontWeight={500}
                        w={"100%"}
                        to={`${column.link}`}
                        borderBottom={"1px solid var(--p500)"}
                      >
                        {row[column.key]}
                      </Text>
                    ),
                  };

                  return (
                    <Td
                      key={colIndex}
                      pl={colIndex === 0 ? 4 : ""}
                      pr={colIndex === columns.length - 1 ? 4 : ""}
                      whiteSpace={"nowrap"}
                      textAlign={
                        row[column.key] === undefined ||
                        row[column.key] === null ||
                        column.dataType === "link"
                          ? "center" // Jika datanya kosong, textAlign menjadi center
                          : column.dataType === "number"
                          ? "right" // Jika numeric, textAlign menjadi right
                          : "left" // Jika tidak, textAlign defaultnya menjadi left
                      }
                      opacity={
                        row[column.key] === undefined ||
                        row[column.key] === null
                          ? 0.6
                          : 1
                      }
                    >
                      {row[column.key] !== undefined && row[column.key] !== null
                        ? // @ts-ignore
                          typicalRender[column.dataType]
                        : "-"}
                    </Td>
                  );
                })}

                {/* Kolom tetap di sebelah kanan */}
                <Td
                  position={"sticky"}
                  right={0}
                  p={0}
                  bg={i % 2 === 0 ? contentBgColor : bodyColor}
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

      <TabelFooterConfig
        limitConfig={limitConfig}
        setLimitConfig={setLimitConfig}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
        paginationData={paginationData}
      />
    </>
    // </div>
  );
}
