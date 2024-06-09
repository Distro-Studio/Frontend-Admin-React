import {
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
import { useBodyColor, useContentBgColor } from "../../../const/colors";
import { Tabel__Column__Interface } from "../../../const/interfaces";
import ComponentSpinner from "../../independent/ComponentSpinner";
import TabelContainer from "../../wrapper/TabelContainer";
import BooleanBadge from "../BooleanBadge";
import TabelFooterConfig from "../TabelFooterConfig";
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
      //@ts-ignore
      let aValue = a[sortConfig.key];
      //@ts-ignore
      let bValue = b[sortConfig.key];

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1; // Nilai null di bawah
      if (bValue === null) return -1; // Nilai null di bawah

      //@ts-ignore
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      //@ts-ignore
      if (aValue > bValue) {
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

      {!loading && data && (
        <TabelContainer noTopNavs customReducer={24}>
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
                    {row.nama_keluarga}
                  </Td>
                  <Td whiteSpace={"nowrap"}>{row.hubungan}</Td>
                  <Td whiteSpace={"nowrap"}>{row.pendidikan_terakhir}</Td>
                  <Td whiteSpace={"nowrap"}>{row.pekerjaan}</Td>
                  <Td whiteSpace={"nowrap"}>
                    <VStack>
                      <BooleanBadge
                        data={row.status_hidup}
                        trueValue="Hidup"
                        falseValue="Meninggal"
                        w={"100%"}
                        maxW={"120px"}
                      />
                    </VStack>
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
                  >
                    <VStack
                      borderLeft={"1px solid var(--divider3)"}
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
