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
  formattedData: Interface__FormattedTableData[];
  onRowClick?: (rowData: any) => void;
  onBatchAction?: (selectedIds: (string | number)[]) => void; // to get row ids
}

export default function CustomTable({
  formattedHeader,
  formattedData,
  onRowClick,
  onBatchAction,
}: Props) {
  const [selectAllRows, setSelectAllRows] = useState<boolean>(false);
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

  if (onBatchAction) {
    onBatchAction(selectedRows);
  }

  const handleSelectAllRows = (isChecked: boolean) => {
    setSelectAllRows(!selectAllRows);
    if (!isChecked) {
      const allIds = formattedData.map((row) => row.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };
  const toggleRowSelection = (rowId: string | number) => {
    setSelectedRows((prevSelected) => {
      const isSelected = prevSelected.includes(rowId);

      if (isSelected) {
        setSelectAllRows(false);
        return prevSelected.filter((id) => id !== rowId);
      } else {
        if (formattedData.length === selectedRows.length + 1) {
          setSelectAllRows(true);
        }
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
        //@ts-ignore
        const aValue = a.rows[sortConfig.sortKey].value;
        //@ts-ignore
        const bValue = b.rows[sortConfig.sortKey].value;

        if (
          //@ts-ignore
          a.rows[sortConfig.sortKey].isNumeric &&
          //@ts-ignore
          b.rows[sortConfig.sortKey].isNumeric
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
            <Icon as={RiArrowUpLine} color={"p.500"} fontSize={16} />
          ) : (
            <Icon as={RiArrowDownLine} color={"p.500"} fontSize={16} />
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
          {onBatchAction && (
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
                  onChange={() => handleSelectAllRows(selectAllRows)}
                  isChecked={selectAllRows}
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
            onClick={handleRowClick}
            cursor={onRowClick ? "pointer" : "auto"}
          >
            {onBatchAction && (
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
                      toggleRowSelection(row.id);
                    }}
                    isChecked={selectedRows.includes(row.id)}
                  />
                </Center>
              </Td>
            )}
            {row.rows.map((col, colIndex) => (
              <Td
                key={colIndex}
                whiteSpace={"nowrap"}
                bg={lightDarkColor}
                p={0}
                {...col.props}
              >
                <HStack
                  _groupHover={{ bg: "var(--divider)" }}
                  py={3}
                  px={4}
                  h={"60px"}
                  transition={"200ms"}
                  {...col.cProps}
                >
                  {typeof col.td === "string" || typeof col.td === "number" ? (
                    <Text>{col.td}</Text>
                  ) : (
                    col.td
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
