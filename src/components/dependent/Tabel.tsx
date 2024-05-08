import {
  Badge,
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

interface Props {
  columns: Tabel__Column__Interface[];
  data: any[];
}

export default function Tabel({ columns, data }: Props) {
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

  const requestSort = (key: string) => {
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
  const contectBgColor = useContentBgColor();
  const bodyColor = useBodyColor();

  return (
    // <div style={{ overflowX: "auto" }}>
    <TabelContainer>
      <Table minW={"100%"}>
        <Thead>
          <Tr>
            {columns.map((column, i) => (
              <Th
                key={i}
                whiteSpace={"nowrap"}
                onClick={() => requestSort(column.key)}
                cursor={"pointer"}
                pl={i === 0 ? 4 : ""}
                pr={i === columns.length - 1 ? 4 : ""}
                position={"sticky"}
                top={0}
                bg={bodyColor}
              >
                <HStack justify={"space-between"}>
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
            <Th position={"sticky"} right={0} top={0} p={0} bg={bodyColor}>
              <VStack
                px={4}
                py={3}
                borderLeft={"1px solid var(--divider3)"}
                h={"51px"}
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
                >
                  {column.dataType === "date" ? (
                    formatDate(row[column.key])
                  ) : column.dataType === "number" ? (
                    formatNumber(row[column.key])
                  ) : column.dataType === "badge" ? (
                    <Badge w={"100%"} textAlign={"center"} colorScheme="teal">
                      {row[column.key]}
                    </Badge>
                  ) : (
                    row[column.key]
                  )}
                </Td>
              ))}

              {/* Kolom tetap di sebelah kanan */}
              <Td
                position={"sticky"}
                right={0}
                p={0}
                bg={i % 2 === 0 ? contectBgColor : bodyColor}
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
                    className="btn-clear clicky"
                    borderRadius={0}
                  />
                </VStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TabelContainer>
    // </div>
  );
}
