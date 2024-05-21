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
import formatNumber from "../../../../lib/formatNumber";
import ComponentSpinner from "../../../independent/ComponentSpinner";
import TabelContainer from "../../../wrapper/TabelContainer";

interface Props {
  filterConfig?: any;
}

export default function TabelKompetensi({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama_kompetensi",
      label: "Nama Jabatan",
      dataType: "string",
    },
    {
      key: "jenis_kompetensi",
      label: "Jenis Kompetensi",
      dataType: "string",
    },
    {
      key: "total_tunjangan",
      label: "Tunjangan",
      dataType: "numeric",
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  const dummy = [
    {
      id: 1,
      nama_kompetensi: "Petugas Kebersihan",
      jenis_kompetensi: 2,
      total_tunjangan: 853165,
      created_at: "2024-04-07T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 2,
      nama_kompetensi: "Ahli Radiologi",
      jenis_kompetensi: 1,
      total_tunjangan: 2114169,
      created_at: "2024-03-10T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 3,
      nama_kompetensi: "Dokter Spesialis Anak",
      jenis_kompetensi: 2,
      total_tunjangan: 1475224,
      created_at: "2023-06-16T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 4,
      nama_kompetensi: "Fisioterapis",
      jenis_kompetensi: 1,
      total_tunjangan: 797643,
      created_at: "2024-02-02T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 5,
      nama_kompetensi: "Perawat",
      jenis_kompetensi: 1,
      total_tunjangan: 618347,
      created_at: "2023-10-12T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 6,
      nama_kompetensi: "Dokter Spesialis Bedah",
      jenis_kompetensi: 1,
      total_tunjangan: 2721133,
      created_at: "2023-11-29T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 7,
      nama_kompetensi: "Dokter Spesialis Penyakit Dalam",
      jenis_kompetensi: 1,
      total_tunjangan: 1989760,
      created_at: "2023-12-23T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 8,
      nama_kompetensi: "Ahli Gizi",
      jenis_kompetensi: 2,
      total_tunjangan: 1280272,
      created_at: "2023-10-16T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 9,
      nama_kompetensi: "Tenaga Farmasi",
      jenis_kompetensi: 2,
      total_tunjangan: 826164,
      created_at: "2023-07-03T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
  ];
  //! DEBUG

  //TODO get karyawan

  const [data] = useState<any[] | null>(dummy);
  const [loading] = useState<boolean>(false);

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
          <TabelContainer noFooterConfig>
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

                    <Td whiteSpace={"nowrap"}>{row.nama_kompetensi}</Td>
                    <Td whiteSpace={"nowrap"}>
                      {row.jenis_kompetensi === 1 ? "Medis" : "Non-Medis"}
                    </Td>
                    <Td whiteSpace={"nowrap"} textAlign={"right"}>
                      {formatNumber(row.total_tunjangan)}
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
        </>
      )}
    </>
  );
}
