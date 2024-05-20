import {
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
import { useBodyColor, useContentBgColor } from "../../../../const/colors";
import { Tabel__Column__Interface } from "../../../../const/interfaces";
import ComponentSpinner from "../../../independent/ComponentSpinner";
import TabelContainer from "../../../wrapper/TabelContainer";
import TabelFooterConfig from "../../TabelFooterConfig";

interface Props {
  data: any;
}

export default function TabelKeizinan({ data }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "name",
      label: "Nama Modul",
      dataType: "string",
    },
  ];

  const [loading] = useState<boolean>(false);

  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);

  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);

  // Sort Config
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>({ key: columns[0].key, direction: "asc" });
  const sortedData = data && [...data];
  if (sortConfig !== null && sortedData) {
    sortedData.sort((a: any, b: any) => {
      //@ts-ignore
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      //@ts-ignore
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
      {loading && <ComponentSpinner mt={4} />}

      {!loading && sortedData && (
        <>
          <TabelContainer>
            <Table minW={"100%"}>
              <Thead>
                <Tr position={"sticky"} top={0} zIndex={3} bg={bodyColor}>
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
                      zIndex={2}
                      p={0}
                      {...column.thProps}
                    >
                      {column.dataType === "action" ? (
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
                          <Text
                            fontWeight={600}
                            flexShrink={0}
                            lineHeight={1.2}
                          >
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

                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                    >
                      <Text>View</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                    >
                      <Text>Add</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      h={"52px"}
                    >
                      <Text>Edit</Text>
                    </HStack>
                  </Th>
                  <Th borderBottom={"none !important"} p={0}>
                    <HStack
                      justify={"center"}
                      borderBottom={"1px solid var(--divider3)"}
                      px={4}
                      py={3}
                      pr={4}
                      h={"52px"}
                    >
                      <Text>Delete</Text>
                    </HStack>
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {sortedData.map((row: any, i: number) => (
                  <Tr
                    h={"72px"}
                    key={i}
                    bg={i % 2 === 0 ? contentBgColor : bodyColor}
                  >
                    <Td whiteSpace={"nowrap"}>{row.name}</Td>
                    <Td textAlign={"center"}>
                      <Checkbox colorScheme="ap" size={"lg"}></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox colorScheme="ap" size={"lg"}></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox colorScheme="ap" size={"lg"}></Checkbox>
                    </Td>
                    <Td textAlign={"center"}>
                      <Checkbox colorScheme="ap" size={"lg"}></Checkbox>
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
            paginationData={{
              prev_page_url: "",
              next_page_url: "",
              last_page: 1,
            }}
          />
        </>
      )}
    </>
  );
}
