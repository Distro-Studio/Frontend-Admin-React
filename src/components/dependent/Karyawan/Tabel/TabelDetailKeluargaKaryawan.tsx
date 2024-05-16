import {
  Badge,
  Center,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { useState } from "react";
import { useBodyColor, useContentBgColor } from "../../../../const/colors";
import { Tabel__Column__Interface } from "../../../../const/interfaces";
import { responsiveSpacing } from "../../../../const/sizes";
import Skeleton from "../../../independent/Skeleton";
import TabelContainer from "../../../wrapper/TabelContainer";
import TabelFooterConfig from "../../TabelFooterConfig";
import EditDataKeluargaKaryawanModal from "./EditDataKeluargaKaryawanModal";

interface Props {
  data: any;
}

export default function TabelDetailKeluargaKaryawan({ data }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "string",
    },
    {
      key: "hubungan",
      label: "Status Hubungan",
      dataType: "string",
    },
    {
      key: "pendidikan_terakhir",
      label: "Pendidikan Terakhir",
      dataType: "string",
    },
    {
      key: "pekerjaan",
      label: "Pekerjaan",
      dataType: "string",
    },
    {
      key: "status_hidup",
      label: "Status Hidup",
      dataType: "badge",
    },
    {
      key: "no_hp",
      label: "No. Telepon",
      dataType: "string",
    },
    {
      key: "email",
      label: "Email",
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
      {loading && (
        <>
          <TabelContainer p={responsiveSpacing}>
            <VStack h={"100%"} align={"stretch"} gap={responsiveSpacing}>
              <Skeleton h={"52px"} />
              <Skeleton flex={1} flexShrink={0} />
            </VStack>
          </TabelContainer>

          <HStack justify={"space-between"} mt={responsiveSpacing}>
            <Skeleton h={"40px"} w={"120px"} />
            <Skeleton h={"40px"} w={"120px"} />
          </HStack>
        </>
      )}

      {!loading && data && (
        <TabelContainer>
          <Table>
            <Thead>
              <Tr>
                {columns.map((column, i) => (
                  <Th
                    key={i}
                    whiteSpace={"nowrap"}
                    onClick={() => {
                      sort(column.key);
                    }}
                    cursor={"pointer"}
                    borderBottom={"none !important"}
                    bg={bodyColor}
                    zIndex={2}
                    p={0}
                    {...column.thProps}
                  >
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
                  </Th>
                ))}

                <Th
                  position={"sticky"}
                  top={0}
                  right={0}
                  borderBottom={"none !important"}
                  p={0}
                  bg={bodyColor}
                  zIndex={2}
                >
                  <Center
                    px={4}
                    py={3}
                    zIndex={99}
                    borderLeft={"1px solid var(--divider3)"}
                    borderBottom={"1px solid var(--divider3)"}
                    h={"52px"}
                  >
                    <Text>Edit</Text>
                  </Center>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {sortedData.map((row, rowIndex) => (
                <Tr
                  key={row.id}
                  bg={rowIndex % 2 === 0 ? contentBgColor : bodyColor}
                >
                  <Td pl={4} whiteSpace={"nowrap"}>
                    {row.nama}
                  </Td>
                  <Td whiteSpace={"nowrap"}>{row.hubungan}</Td>
                  <Td whiteSpace={"nowrap"}>{row.pendidikan_terakhir}</Td>
                  <Td whiteSpace={"nowrap"}>{row.pekerjaan}</Td>
                  <Td whiteSpace={"nowrap"}>
                    <Badge
                      w={"100%"}
                      textAlign={"center"}
                      colorScheme={row.status_hidup === 1 ? "teal" : "gray"}
                    >
                      {row.status_hidup === 1 ? "Hidup" : "Meninggal"}
                    </Badge>
                  </Td>
                  <Td whiteSpace={"nowrap"}>{row.no_hp}</Td>
                  <Td whiteSpace={"nowrap"} pr={4}>
                    {row.email}
                  </Td>
                  <Td
                    position={"sticky"}
                    top={0}
                    right={0}
                    borderBottom={"none !important"}
                    p={0}
                    bg={rowIndex % 2 === 0 ? contentBgColor : bodyColor}
                    zIndex={1}
                    w={"120px"}
                  >
                    <VStack
                      borderLeft={"1px solid var(--divider3)"}
                      w={"120px"}
                      h={"72px"}
                      px={4}
                      align={"stretch"}
                      justify={"center"}
                    >
                      <EditDataKeluargaKaryawanModal data={row} />
                    </VStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TabelContainer>
      )}

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
  );
}
