import {
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
import { useBodyColor, useContentBgColor } from "../../../../const/colors";
import { Tabel__Column__Interface } from "../../../../const/interfaces";
import { iconSize } from "../../../../const/sizes";
import ComponentSpinner from "../../../independent/ComponentSpinner";
import TabelContainer from "../../../wrapper/TabelContainer";
import TabelFooterConfig from "../../TabelFooterConfig";

interface Props {
  filterConfig?: any;
}

export default function TabelUnitKerja({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama_unit",
      label: "Nama Unit",
      dataType: "string",
    },
    {
      key: "jenis_karyawan",
      label: "Jenis Karyawan",
      dataType: "string",
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  const dummy = [
    {
      id: 1,
      nama_unit: "Hukum dan Kerjasama",
      jenis_karyawan: 0,
      created_at: "2023-08-06T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 2,
      nama_unit: "Teknologi Informasi dan Komunikasi (TIK)",
      jenis_karyawan: 1,
      created_at: "2024-04-04T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 3,
      nama_unit: "Pemeliharaan Sarana Prasarana",
      jenis_karyawan: 0,
      created_at: "2023-07-08T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 4,
      nama_unit: "Mushola",
      jenis_karyawan: 1,
      created_at: "2024-01-27T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 5,
      nama_unit: "Pendidikan dan Pelatihan",
      jenis_karyawan: 0,
      created_at: "2024-03-15T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 6,
      nama_unit: "Fisioterapi",
      jenis_karyawan: 0,
      created_at: "2024-03-24T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 7,
      nama_unit: "Rehabilitasi Medik",
      jenis_karyawan: 0,
      created_at: "2023-06-21T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 8,
      nama_unit: "Penyakit Dalam",
      jenis_karyawan: 0,
      created_at: "2023-10-15T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 9,
      nama_unit: "Unit Gawat Darurat (UGD)",
      jenis_karyawan: 0,
      created_at: "2023-08-21T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 12,
      nama_unit: "Gigi dan Mulut",
      jenis_karyawan: 0,
      created_at: "2024-03-14T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 11,
      nama_unit: "Rekam Medis",
      jenis_karyawan: 1,
      created_at: "2024-04-22T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 12,
      nama_unit: "Patologi Klinik",
      jenis_karyawan: 1,
      created_at: "2024-05-05T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 13,
      nama_unit: "Radiologi",
      jenis_karyawan: 1,
      created_at: "2023-05-31T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 14,
      nama_unit: "Transportasi",
      jenis_karyawan: 0,
      created_at: "2023-10-11T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 15,
      nama_unit: "Kebersihan",
      jenis_karyawan: 1,
      created_at: "2023-10-10T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 16,
      nama_unit: "Keamanan",
      jenis_karyawan: 0,
      created_at: "2024-02-06T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 17,
      nama_unit: "Rawat Jalan",
      jenis_karyawan: 0,
      created_at: "2023-12-17T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 18,
      nama_unit: "Apotek",
      jenis_karyawan: 1,
      created_at: "2023-12-30T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 19,
      nama_unit: "Gizi",
      jenis_karyawan: 1,
      created_at: "2023-07-26T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 20,
      nama_unit: "Jantung",
      jenis_karyawan: 0,
      created_at: "2023-08-28T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 21,
      nama_unit: "Direktur",
      jenis_karyawan: 0,
      created_at: "2024-03-24T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 22,
      nama_unit: "Promosi dan Humas",
      jenis_karyawan: 1,
      created_at: "2023-08-05T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
  ];
  //! DEBUG

  //TODO get karyawan

  const [data] = useState<any[] | null>(dummy);
  const [loading] = useState<boolean>(false);

  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);

  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);

  // Check List Config
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const handleCheckItem = (id: number) => {
    let updatedCheckedItems;
    if (checkedItems.includes(id)) {
      updatedCheckedItems = checkedItems.filter((item) => item !== id);
    } else {
      updatedCheckedItems = [...checkedItems, id];
    }
    setCheckedItems(updatedCheckedItems);
  };
  const handleCheckAll = () => {
    if (data) {
      if (isCheckAll) {
        setCheckedItems([]);
      } else {
        const allIds = data.map((item) => item.id);
        setCheckedItems(allIds);
      }
      setIsCheckAll(!isCheckAll);
    }
  };

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

                    <Td whiteSpace={"nowrap"}>{row.nama_unit}</Td>
                    <Td whiteSpace={"nowrap"}>
                      {row.jenis_karyawan === 1 ? "Shift" : "Non-Shift"}
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
