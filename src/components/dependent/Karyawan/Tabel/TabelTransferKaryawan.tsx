import {
  Avatar,
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
import { dummyKaryawanList } from "../../../../const/dummy";
import {
  Karyawan__Interface,
  Tabel__Column__Interface,
} from "../../../../const/interfaces";
import { iconSize, responsiveSpacing } from "../../../../const/sizes";
import formatDate from "../../../../lib/formatDate";
import Skeleton from "../../../independent/Skeleton";
import TabelContainer from "../../../wrapper/TabelContainer";
import TabelFooterConfig from "../../TabelFooterConfig";

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
      key: "no_induk_karyawan",
      label: "No. Induk Karyawan",
      dataType: "string",
    },
    {
      key: "tgl",
      label: "Tanggal",
      dataType: "date",
    },
    {
      key: "tipe",
      label: "Tipe",
      dataType: "string",
    },
    {
      key: "unit_kerja",
      label: "Unit Kerja",
      dataType: "string",
    },
    {
      key: "jabatan",
      label: "Jabatan",
      dataType: "string",
    },
    {
      key: "status_karyawan",
      label: "Pengharagaan",
      dataType: "badge",
    },
  ];

  //! DEBUG
  // console.log(filterConfig);
  //! DEBUG

  //TODO get karyawan

  const [data] = useState<Karyawan__Interface[] | null>(dummyKaryawanList);
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
                  <Tr key={i} bg={i % 2 === 0 ? contentBgColor : ""}>
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
                    <Td whiteSpace={"nowrap"}>{row.nik}</Td>
                    <Td whiteSpace={"nowrap"}>
                      {formatDate(row.tgl_masuk as string)}
                    </Td>
                    <Td whiteSpace={"nowrap"}>{row.status_karyawan}</Td>
                    <Td whiteSpace={"nowrap"}>{row.unit_kerja}</Td>
                    <Td whiteSpace={"nowrap"}>{row.jabatan}</Td>
                    <Td whiteSpace={"nowrap"}>{row.penghargaan}</Td>
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
