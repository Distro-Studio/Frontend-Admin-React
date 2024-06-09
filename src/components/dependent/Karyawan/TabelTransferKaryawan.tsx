import {
  Avatar,
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
import { useBodyColor, useContentBgColor } from "../../../const/colors";
import { dummyTransferKaryawan } from "../../../const/dummy";
import { Tabel__Column__Interface } from "../../../const/interfaces";
import formatDate from "../../../lib/formatDate";
import ComponentSpinner from "../../independent/ComponentSpinner";
import TabelContainer from "../../wrapper/TabelContainer";
import TabelFooterConfig from "../TabelFooterConfig";
import EditTransferKaryawanModal from "./EditTransferKaryawanModal";
import isDatePassed from "../../../lib/isDatePassed";

interface Props {
  filterConfig?: any;
}

export default function TabelRekamJejak({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "tgl_mulai",
      label: "Tanggal Mulai",
      dataType: "date",
    },
    {
      key: "tipe",
      label: "Tipe",
      dataType: "string",
    },
    {
      key: "unit_kerja_tujuan",
      label: "Unit Kerja Tujuan",
      dataType: "string",
    },
    {
      key: "jabatan_tujuan",
      label: "Jabatan Tujuan",
      dataType: "string",
    },
    {
      key: "status_transfer",
      label: "Status Transfer",
      dataType: "badge",
      preferredTextAlign: "center",
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  //! DEBUG

  //TODO get karyawan

  const [data] = useState<any[] | null>(dummyTransferKaryawan);
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
      let aValue = a[sortConfig.key];
      //@ts-ignore
      let bValue = b[sortConfig.key];

      // Handle nested properties
      if (sortConfig.key === "nama") {
        aValue = a.user?.nama;
        bValue = b.user?.nama;
      } else if (sortConfig.key === "tipe") {
        aValue = a.tipe?.label;
        bValue = b.tipe?.label;
      } else if (sortConfig.key === "unit_kerja_tujuan") {
        aValue = a.unit_kerja_tujuan?.nama_unit;
        bValue = b.unit_kerja_tujuan?.nama_unit;
      } else if (sortConfig.key === "jabatan_tujuan") {
        aValue = a.jabatan_tujuan?.nama_jabatan;
        bValue = b.jabatan_tujuan?.nama_jabatan;
      } else if (sortConfig.key === "status_transfer") {
        aValue = isDatePassed(a.tgl_mulai, true) ? 1 : 0;
        bValue = isDatePassed(b.tgl_mulai, true) ? 1 : 0;
      }

      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1; // Nilai null di bawah
      if (bValue === null) return -1; // Nilai null di bawah

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
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
                {sortedData.map((row, i) => (
                  <Tr key={i} bg={i % 2 === 0 ? contentBgColor : ""}>
                    <Td whiteSpace={"nowrap"}>
                      <HStack>
                        <Avatar
                          size={"sm"}
                          name={row.user.nama}
                          src={row.user.foto_profil}
                        />
                        <Text>{row.user.nama}</Text>
                      </HStack>
                    </Td>
                    <Td whiteSpace={"nowrap"}>
                      {formatDate(row.tgl_mulai as string)}
                    </Td>
                    <Td whiteSpace={"nowrap"}>{row.tipe.label}</Td>
                    <Td whiteSpace={"nowrap"}>
                      {row.unit_kerja_tujuan.nama_unit}
                    </Td>
                    <Td whiteSpace={"nowrap"}>
                      {row.jabatan_tujuan.nama_jabatan}
                    </Td>
                    <Td whiteSpace={"nowrap"} textAlign={"center"}>
                      <Badge
                        w={"100%"}
                        maxW={"100px"}
                        textAlign={"center"}
                        colorScheme={
                          isDatePassed(row.tgl_mulai, true) ? "ap" : "orange"
                        }
                      >
                        {isDatePassed(row.tgl_mulai, true)
                          ? "Sukses"
                          : "Menunggu"}
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
                    >
                      <VStack
                        borderLeft={"1px solid var(--divider3)"}
                        h={"72px"}
                        px={4}
                        align={"stretch"}
                        justify={"center"}
                      >
                        {!isDatePassed(row.tgl_mulai, true) && (
                          <EditTransferKaryawanModal data={row} />
                        )}
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
