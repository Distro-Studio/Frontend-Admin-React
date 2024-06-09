import {
  Avatar,
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
import {
  statusKaryawanColorScheme,
  useBodyColor,
  useContentBgColor,
} from "../../../const/colors";
import { dummyKaryawanList } from "../../../const/dummy";
import { Tabel__Column__Interface } from "../../../const/interfaces";
import { iconSize } from "../../../const/sizes";
import ComponentSpinner from "../../independent/ComponentSpinner";
import TabelContainer from "../../wrapper/TabelContainer";
import TabelFooterConfig from "../TabelFooterConfig";
import StatusKaryawanBadge from "../Karyawan/StatusKaryawanBadge";
import formatNumber from "../../../lib/formatNumber";

interface Props {
  filterConfig?: any;
}

export default function TabelPenggajian({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "unit_kerja",
      label: "Unit Kerja",
      dataType: "string",
    },
    {
      key: "kelompok_gaji",
      label: "Kelompok Gaji",
      dataType: "string",
    },
    {
      key: "take_home_pay",
      label: "Take Home Pay",
      dataType: "string",
    },
    {
      key: "status",
      label: "Status Karyawan",
      dataType: "badge",
      preferredTextAlign: "center",
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  //! DEBUG

  //TODO get karyawan

  const [data] = useState<any[] | null>(dummyKaryawanList);
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
                  <Tr key={i} bg={i % 2 === 0 ? contentBgColor : bodyColor}>
                    <Td whiteSpace={"nowrap"}>
                      <HStack>
                        <Avatar
                          size={"sm"}
                          name={row.nama}
                          src={row.foto_profil}
                        />
                        <Text>{row.nama}</Text>
                      </HStack>
                    </Td>
                    <Td whiteSpace={"nowrap"}>{row.unit_kerja.nama_unit}</Td>
                    <Td whiteSpace={"nowrap"}>{row.kelompok_gaji}</Td>
                    <Td whiteSpace={"nowrap"}>
                      Rp {formatNumber(row.no_bpjsksh)}
                    </Td>
                    <Td whiteSpace={"nowrap"} textAlign={"center"}>
                      <StatusKaryawanBadge
                        data={row.status_karyawan}
                        w={"100%"}
                        maxW={"120px"}
                      />
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
