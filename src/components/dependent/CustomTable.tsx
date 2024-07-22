import {
  Center,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiListCheck,
  RiMore2Fill,
} from "@remixicon/react";
import { useRef, useState } from "react";
import { useLightDarkColor } from "../../const/colors";
import {
  Interface__FormattedTableData,
  Interface__FormattedTableHeader,
} from "../../const/interfaces";
import { iconSize } from "../../const/sizes";

interface BatchActionsProps {
  selectedRows: number[];
  batchActions: any[];
  selectAllRows: boolean;
  handleSelectAllRows: (isChecked: boolean) => void;
  tableRef: any;
}

const BatchActions = ({
  selectedRows,
  batchActions,
  selectAllRows,
  handleSelectAllRows,
  tableRef,
}: BatchActionsProps) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        h={"52px"}
        w={"52px"}
        borderRadius={0}
        className="btn"
        aria-label="batch actions options"
        icon={<Icon as={RiListCheck} fontSize={iconSize} />}
      />

      <Portal containerRef={tableRef}>
        <MenuList zIndex={10}>
          <MenuGroup title={`${selectedRows.length} Terpilih`}>
            <MenuDivider />

            <MenuItem
              justifyContent={"space-between"}
              onClick={() => {
                handleSelectAllRows(selectAllRows);
              }}
            >
              <Text color={"p.500"} fontWeight={550}>
                Pilih Semua
              </Text>
              <Checkbox colorScheme="ap" isChecked={selectAllRows} />
            </MenuItem>

            <MenuDivider />

            {batchActions?.map((action, i) => (
              <MenuItem
                key={i}
                justifyContent={"space-between"}
                onClick={() => {
                  action.callback(selectedRows);
                }}
                isDisabled={selectedRows.length === 0}
              >
                {action.element}
              </MenuItem>
            ))}
          </MenuGroup>
        </MenuList>
      </Portal>
    </Menu>
  );
};

interface RowOptionsProps {
  row: any;
  rowOptions: any[];
  tableRef: any;
}

const RowOptions = ({ row, rowOptions, tableRef }: RowOptionsProps) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        h={"60px"}
        w={"52px"}
        borderRadius={0}
        className="btn"
        aria-label="row options"
        icon={<Icon as={RiMore2Fill} fontSize={iconSize} />}
      />

      <Portal containerRef={tableRef}>
        <MenuList zIndex={99} className="rowOptionsList">
          {rowOptions?.map((option, i) => (
            <MenuItem
              key={i}
              justifyContent={"space-between"}
              onClick={() => {
                option.callback(row);
              }}
            >
              {option.element}
            </MenuItem>
          ))}
        </MenuList>
      </Portal>
    </Menu>
  );
};

interface Props {
  formattedHeader: Interface__FormattedTableHeader[];
  formattedData: Interface__FormattedTableData[];
  onRowClick?: (rowData: any) => void;
  batchActions?: any[];
  columnsConfig?: number[];
  rowOptions?: any[];
}

export default function CustomTable({
  formattedHeader,
  formattedData,
  onRowClick,
  batchActions,
  columnsConfig,
  rowOptions,
}: Props) {
  const tableHeader = columnsConfig
    ? columnsConfig.map((columnIndex) => formattedHeader[columnIndex])
    : formattedHeader;

  const tableBody = columnsConfig
    ? formattedData.map((data) => {
        const filteredRows = columnsConfig.map(
          (columnIndex) => data.rows[columnIndex]
        );
        return { ...data, rows: filteredRows };
      })
    : formattedData;

  const [selectAllRows, setSelectAllRows] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
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

  const handleSelectAllRows = (isChecked: boolean) => {
    setSelectAllRows(!selectAllRows);
    if (!isChecked) {
      const allIds = formattedData.map((row) => row.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };
  const toggleRowSelection = (rowId: number) => {
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
      return [...tableBody].sort((a, b) => {
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

  const tableRef = useRef(null);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <Table
      ref={tableRef}
      minW={"0"}
      w={tableHeader.length > 1 ? "100%" : "fit-content"}
    >
      <Thead>
        <Tr position={"sticky"} top={0} zIndex={3}>
          {batchActions && (
            <Td
              h={"52px"}
              w={"52px !important"}
              minW={"0% !important"}
              maxW={"52px !important"}
              p={0}
              position={"sticky"}
              left={0}
            >
              <Center
                h={"52px"}
                w={"52px"}
                borderRight={"1px solid var(--divider3)"}
                borderBottom={"1px solid var(--divider3)"}
                bg={lightDarkColor}
              >
                <BatchActions
                  selectedRows={selectedRows}
                  batchActions={batchActions}
                  selectAllRows={selectAllRows}
                  handleSelectAllRows={handleSelectAllRows}
                  tableRef={tableRef}
                />
              </Center>
            </Td>
          )}

          {tableHeader.map((header, i) => (
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
              {...header?.props}
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
                {...header?.cProps}
              >
                <Text>{header.th}</Text>

                {renderSortIcon(i)}
              </HStack>
            </Th>
          ))}

          {rowOptions && (
            <Td
              h={"52px"}
              w={"52px !important"}
              minW={"0% !important"}
              maxW={"52px !important"}
              p={0}
              position={"sticky"}
              right={0}
            >
              <Center
                h={"52px"}
                w={"52px"}
                borderLeft={"1px solid var(--divider3)"}
                borderBottom={"1px solid var(--divider3)"}
                bg={lightDarkColor}
              ></Center>
            </Td>
          )}
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
            {batchActions && (
              <Td
                h={"60px"}
                w={"52px !important"}
                minW={"0% !important"}
                maxW={"52px !important"}
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
                  _groupActive={
                    onRowClick ? { bg: "var(--divider2)" } : undefined
                  }
                  transition={"200ms"}
                  cursor={"pointer"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRowSelection(row.id);
                  }}
                >
                  <Checkbox
                    colorScheme="ap"
                    // size={"lg"}
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
                {...col?.props}
              >
                <HStack
                  _groupHover={{ bg: "var(--divider)" }}
                  _groupActive={
                    onRowClick ? { bg: "var(--divider2)" } : undefined
                  }
                  py={3}
                  px={4}
                  h={"60px"}
                  transition={"200ms"}
                  {...col?.cProps}
                >
                  {typeof col.td === "string" || typeof col.td === "number" ? (
                    <Text>{col.td}</Text>
                  ) : (
                    col.td
                  )}
                </HStack>
              </Td>
            ))}

            {rowOptions && (
              <Td
                h={"52px"}
                w={"52px !important"}
                minW={"0% !important"}
                maxW={"52px !important"}
                p={0}
                position={"sticky"}
                right={0}
                bg={lightDarkColor}
                zIndex={2}
              >
                <Center
                  h={"60px"}
                  w={"52px"}
                  borderLeft={"1px solid var(--divider3)"}
                  _groupHover={{ bg: "var(--divider)" }}
                  _groupActive={
                    onRowClick ? { bg: "var(--divider2)" } : undefined
                  }
                  transition={"200ms"}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <RowOptions
                    row={row}
                    rowOptions={rowOptions}
                    tableRef={tableRef}
                  />
                </Center>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
