import {
  Center,
  Checkbox,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  StackProps,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { useState } from "react";
import { useLightDarkColor } from "../../const/colors";
import {
  Interface__FormattedTableData,
  Interface__FormattedTableHeader,
} from "../../const/interfaces";

interface Props {
  formattedHeader: Interface__FormattedTableHeader[];
  formattedData: Interface__FormattedTableData[][];
  onRowClick?: (rowData: any) => void;
  batchActions?: boolean; // to show checkbox each row
  onBatchAction?: (selectedIds: (string | number)[]) => void; // to get row ids
}

export default function CustomTable({
  formattedHeader,
  formattedData,
  onRowClick,
  batchActions = false,
  onBatchAction,
}: Props) {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    sortKey: number;
    direction: "asc" | "desc";
  }>({
    sortKey: 0,
    direction: "asc",
  });

  const handleRowClick = (rowData: any) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  };

  const handleBatchAction = () => {
    if (onBatchAction) {
      onBatchAction(selectedRows);
    }
  };

  const toggleRowSelection = (rowId: string | number) => {
    setSelectedRows((prevSelected) => {
      const isSelected = prevSelected.includes(rowId);

      if (isSelected) {
        return prevSelected.filter((id) => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  const requestSort = (columnIndex: number) => {
    setSortConfig((prevConfig) => ({
      sortKey: columnIndex,
      direction:
        prevConfig.sortKey === columnIndex && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const sortedData = () => {
    if (sortConfig.sortKey !== null) {
      return [...formattedData].sort((a, b) => {
        const aValue = a[sortConfig.sortKey].rows.value;
        const bValue = b[sortConfig.sortKey].rows.value;

        if (
          a[sortConfig.sortKey].rows.isNumeric &&
          b[sortConfig.sortKey].rows.isNumeric
        ) {
          return sortConfig.direction === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        } else {
          return sortConfig.direction === "asc"
            ? String(aValue).localeCompare(String(bValue))
            : String(bValue).localeCompare(String(aValue));
        }
      });
    }
    return formattedData;
  };

  const renderSortIcon = (columnIndex: number) => {
    if (sortConfig.sortKey === columnIndex) {
      return (
        <>
          {sortConfig.direction === "asc" ? (
            <Icon as={RiArrowUpLine} color={"pink.500"} fontSize={16} />
          ) : (
            <Icon as={RiArrowDownLine} color={"pink.500"} fontSize={16} />
          )}
        </>
      );
    }
    return null;
  };

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <Table minW={"100%"}>
      <Thead>
        <Tr position={"sticky"} top={0} zIndex={3}>
          {batchActions && (
            <Td p={0} position={"sticky"} left={0}>
              <Center
                h={"52px"}
                w={"52px"}
                borderRight={"1px solid var(--divider3)"}
                borderBottom={"1px solid var(--divider3)"}
                bg={lightDarkColor}
              >
                <Checkbox
                  colorScheme="ap"
                  size={"lg"}
                  onChange={() => {
                    // toggleRowSelection(row.id);
                  }}
                />
              </Center>
            </Td>
          )}

          {formattedHeader.map((header, i) => (
            <Th
              key={i}
              bg={lightDarkColor}
              whiteSpace={"nowrap"}
              onClick={() => {
                header.isSortable && requestSort(i);
              }}
              cursor={"pointer"}
              borderBottom={"none !important"}
              p={0}
              {...header.props}
            >
              <HStack
                borderBottom={"1px solid var(--divider3)"}
                // justify={"space-between"}
                px={4}
                py={3}
                gap={4}
                h={"52px"}
                pl={i === 0 ? 4 : ""}
                pr={i === formattedHeader.length - 1 ? 4 : ""}
                {...header.cProps}
              >
                <Text>{header.th}</Text>

                {renderSortIcon(i)}
              </HStack>
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {sortedData().map((row, rowIndex) => (
          <Tr
            key={rowIndex}
            role="group"
            transition={"200ms"}
            // cursor={"pointer"}
          >
            {batchActions && (
              <Td
                w={"52px"}
                p={0}
                position={"sticky"}
                left={0}
                bg={lightDarkColor}
                zIndex={2}
              >
                <Center
                  w={"52px"}
                  h={"60px"}
                  borderRight={"1px solid var(--divider3)"}
                  _groupHover={{ bg: "var(--divider)" }}
                  transition={"200ms"}
                >
                  <Checkbox
                    colorScheme="ap"
                    size={"lg"}
                    onChange={() => {
                      toggleRowSelection(row[rowIndex].id);
                    }}
                  />
                </Center>
              </Td>
            )}
            {row.map((col, colIndex) => (
              <Td
                key={colIndex}
                whiteSpace={"nowrap"}
                bg={lightDarkColor}
                p={0}
                {...col.rows.props}
              >
                <HStack
                  _groupHover={{ bg: "var(--divider)" }}
                  py={3}
                  px={4}
                  h={"60px"}
                  transition={"200ms"}
                  {...col.rows.cProps}
                >
                  {typeof col.rows.td === "string" ||
                  typeof col.rows.td === "number" ? (
                    <Text>{col.rows.td}</Text>
                  ) : (
                    col.rows.td
                  )}
                </HStack>
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>

      {/* {batchActions && (
        <tfoot>
          <Tr>
            <Td colSpan={formattedData.length}>
              <button>Lakukan Aksi Batch</button>
            </Td>
          </Tr>
        </tfoot>
      )} */}
    </Table>
  );
}
