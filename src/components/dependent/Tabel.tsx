import {
  Avatar,
  Badge,
  BoxProps,
  Button,
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
  onCheckItem?: (checkedItem: any) => void;
  noMore?: boolean;
  noCheckList?: boolean;
  action?: any;
}

export default function Tabel({
  columns,
  data,
  paginationData,
  pageConfig,
  setPageConfig,
  limitConfig,
  setLimitConfig,
  onCheckItem,
  noMore,
  noCheckList,
  action,
  ...props
}: Props) {
  // Check List Config
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleCheckItem = (id: string) => {
    let updatedCheckedItems;
    if (checkedItems.includes(id)) {
      updatedCheckedItems = checkedItems.filter((item) => item !== id);
    } else {
      updatedCheckedItems = [...checkedItems, id];
    }
    setCheckedItems(updatedCheckedItems);
    onCheckItem && onCheckItem(updatedCheckedItems);
  };
  const handleCheckAll = () => {
    if (isCheckAll) {
      setCheckedItems([]);
      onCheckItem && onCheckItem([]);
    } else {
      const allIds = data.map((item) => item.id);
      setCheckedItems(allIds);
      onCheckItem && onCheckItem(allIds);
    }
    setIsCheckAll(!isCheckAll);
  };

  // Sort Config
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
    <>
      <TabelContainer {...props}>
        <Table minW={"100%"}>
          <Thead>
            <Tr position={"sticky"} top={0} zIndex={3}>
              {!noCheckList && (
                <Th
                  position={"sticky"}
                  left={0}
                  p={0}
                  borderBottom={"none !important"}
                  zIndex={3}
                  w={"50px"}
                >
                  <Center
                    p={4}
                    h={"52px"}
                    w={"50px"}
                    borderRight={"1px solid var(--divider3)"}
                    bg={bodyColor}
                    borderBottom={"1px solid var(--divider3) !important"}
                  >
                    <Checkbox
                      colorScheme="ap"
                      isChecked={isCheckAll}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckAll();
                      }}
                    />
                  </Center>
                </Th>
              )}

              {columns.map((column, i) => (
                <Th
                  key={i}
                  whiteSpace={"nowrap"}
                  onClick={() => {
                    if (column.dataType !== "action") {
                      sort(column.key);
                    }
                  }}
                  cursor={"pointer"}
                  borderBottom={"none !important"}
                  bg={bodyColor}
                  zIndex={2}
                  p={0}
                  {...column.thProps}
                >
                  {column.dataType === "action" ||
                  column.dataType === "link" ? (
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                      pl={i === 0 ? 4 : ""}
                      pr={i === columns.length - 1 ? 4 : ""}
                      {...column.thContentProps}
                    >
                      <Text>{column.label}</Text>
                    </HStack>
                  ) : (
                    <HStack
                      justify={
                        column.preferredTextAlign === "center"
                          ? "center"
                          : column.dataType === "numeric"
                          ? "flex-end"
                          : "space-between"
                      }
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                      pl={i === 0 ? 4 : ""}
                      pr={i === columns.length - 1 ? 4 : ""}
                      {...column.thContentProps}
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
                  )}
                </Th>
              ))}

              {/* Kolom tetap di sebelah kanan */}
              {!noMore && (
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
              )}
            </Tr>
          </Thead>

          <Tbody>
            {sortedData.map((row, i) => (
              <Tr key={i} bg={i % 2 === 0 ? contentBgColor : ""}>
                {!noCheckList && (
                  <Td
                    position={"sticky"}
                    left={0}
                    p={0}
                    bg={bodyColor}
                    zIndex={2}
                    w={"50px"}
                  >
                    <Center
                      h={"72px"}
                      w={"50px"}
                      bg={i % 2 === 0 ? contentBgColor : bodyColor}
                      p={4}
                      borderRight={"1px solid var(--divider3)"}
                    >
                      <Checkbox
                        colorScheme="ap"
                        isChecked={checkedItems.includes(row.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckItem(row.id);
                        }}
                      />
                    </Center>
                  </Td>
                )}

                {columns.map((column, colIndex) => {
                  const typicalRender = {
                    string: row[column.key],
                    date: formatDate(row[column.key]),
                    number: formatNumber(row[column.key]),
                    numeric: formatNumber(row[column.key]),
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
                    action: (
                      <Center {...column.tdContentProps}>
                        <Button
                          onClick={() => {
                            column.action(row.id);
                          }}
                          {...column.actionButtonProps}
                        >
                          {column.actionLabel}
                        </Button>
                      </Center>
                    ),
                  };

                  return (
                    <Td
                      key={colIndex}
                      h={"72px !important"}
                      pl={colIndex === 0 ? 4 : ""}
                      pr={colIndex === columns.length - 1 ? 4 : ""}
                      whiteSpace={"nowrap"}
                      bg={i % 2 === 0 ? contentBgColor : bodyColor}
                      // @ts-ignore
                      textAlign={
                        column.preferredTextAlign
                          ? column.preferredTextAlign
                          : row[column.key] === undefined ||
                            row[column.key] === null ||
                            column.dataType === "link"
                          ? "left"
                          : column.dataType === "numeric"
                          ? "right"
                          : "left"
                      }
                      opacity={
                        (row[column.key] === undefined ||
                          row[column.key] === null) &&
                        column.dataType !== "action"
                          ? 0.6
                          : 1
                      }
                      {...column.tdProps}
                    >
                      {(row[column.key] !== undefined &&
                        row[column.key] !== null) ||
                      column.dataType === "action"
                        ? // @ts-ignore
                          typicalRender[column.dataType]
                        : "-"}
                    </Td>
                  );
                })}

                {/* Kolom tetap di sebelah kanan */}
                {!noMore && (
                  <Td
                    position={"sticky"}
                    top={0}
                    right={0}
                    borderBottom={"none !important"}
                    p={0}
                    bg={i % 2 === 0 ? contentBgColor : bodyColor}
                    zIndex={1}
                    w={"50px"}
                  >
                    <VStack
                      borderLeft={"1px solid var(--divider3)"}
                      justify={"center"}
                    >
                      <IconButton
                        h={"72px"}
                        w={"50px"}
                        aria-label="Option Button"
                        icon={<Icon as={RiMore2Fill} fontSize={iconSize} />}
                        className="btn"
                        borderRadius={0}
                      />
                    </VStack>
                  </Td>
                )}
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
  );
}
