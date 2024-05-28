import {
  Badge,
  Button,
  Center,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiFileList3Line,
} from "@remixicon/react";
import { useState } from "react";
import { useBodyColor, useContentBgColor } from "../../../../const/colors";
import { dummyRiwayatPenggajian } from "../../../../const/dummy";
import {
  Riwayat__Penggajian__Interface,
  Tabel__Column__Interface,
} from "../../../../const/interfaces";
import formatDate from "../../../../lib/formatDate";
import formatNumber from "../../../../lib/formatNumber";
import ComponentSpinner from "../../../independent/ComponentSpinner";
import TabelContainer from "../../../wrapper/TabelContainer";
import TabelFooterConfig from "../../TabelFooterConfig";
import { Link } from "react-router-dom";

interface Props {
  filterConfig?: any;
}

export default function TabelThr({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "periode",
      label: "Periode",
      dataType: "date",
    },
    {
      key: "updated_at",
      label: "Tanggal Pembayaran",
      dataType: "date",
    },
    {
      key: "total_karyawan_terverifikasi",
      label: "Karyawan Terverifikasi",
      dataType: "number",
      preferredTextAlign: "center",
    },
    {
      key: "laporan",
      label: "Laporan",
      dataType: "link",
      preferredTextAlign: "center",
    },
    {
      key: "status_penggajian",
      label: "Status",
      dataType: "badge",
      preferredTextAlign: "center",
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  //! DEBUG

  //TODO get karyawan

  const [data] = useState<Riwayat__Penggajian__Interface[] | null>(
    dummyRiwayatPenggajian
  );
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
    sortedData.sort((a, b) => {
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
                <Tr position={"sticky"} top={0} zIndex={3}>
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
                    <Center
                      px={4}
                      py={3}
                      zIndex={99}
                      borderLeft={"1px solid var(--divider3)"}
                      borderBottom={"1px solid var(--divider3)"}
                      h={"52px"}
                    >
                      <Text>Aksi</Text>
                    </Center>
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {sortedData.map((row, i) => (
                  <Tr key={i} bg={i % 2 === 0 ? contentBgColor : bodyColor}>
                    <Td whiteSpace={"nowrap"}>
                      {formatDate(row.periode, {
                        month: "short",
                        year: "numeric",
                      })}
                    </Td>
                    <Td whiteSpace={"nowrap"}>{formatDate(row.updated_at)}</Td>
                    <Td whiteSpace={"nowrap"} textAlign={"center"}>
                      {formatNumber(row.total_karyawan_terverifikasi)}
                    </Td>
                    <Td whiteSpace={"nowrap"}>
                      <Button
                        leftIcon={<Icon as={RiFileList3Line} />}
                        colorScheme="ap"
                        className="clicky"
                        variant={"ghost"}
                        as={Link}
                        to={`/keuangan/thr/laporan/${row.laporan.id}`}
                      >
                        Lihat
                      </Button>
                    </Td>
                    <Td whiteSpace={"nowrap"}>
                      <Badge w={"100%"} textAlign={"center"} colorScheme="ap">
                        {row.status}
                      </Badge>
                    </Td>

                    {/* Kolom tetap di sebelah kanan */}
                    <Td
                      position={"sticky"}
                      top={0}
                      right={0}
                      borderBottom={"none !important"}
                      p={0}
                      bg={i % 2 === 0 ? contentBgColor : bodyColor}
                      zIndex={1}
                      w={"150px"}
                    >
                      <VStack
                        borderLeft={"1px solid var(--divider3)"}
                        w={"150px"}
                        h={"72px"}
                        px={4}
                        align={"stretch"}
                        justify={"center"}
                      >
                        <Tooltip label="Publikasi Payslip" openDelay={500}>
                          <Button
                            colorScheme="ap"
                            variant={"outline"}
                            className="clicky"
                          >
                            Publikasi
                          </Button>
                        </Tooltip>
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
