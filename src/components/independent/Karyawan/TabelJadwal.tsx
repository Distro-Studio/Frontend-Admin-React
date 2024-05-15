import {
  Avatar,
  Box,
  Center,
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
  VStack,
} from "@chakra-ui/react";
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiEditBoxLine,
} from "@remixicon/react";
import { useState } from "react";
import {
  useBodyColor,
  useContentBgColor,
  useWhiteDarkColor,
} from "../../../const/colors";
import { dummyTabelJadwalData } from "../../../const/dummy";
import formatTime from "../../../const/formatTime";
import { responsiveSpacing } from "../../../const/sizes";
import JadwalTabelHeader from "../../dependent/Karyawan/JadwalTabelHeader";
import TabelContainer from "../../wrapper/TabelContainer";
import Skeleton from "../Skeleton";
import TabelFooterConfig from "../../dependent/TabelFooterConfig";

interface Props {
  filterConfig?: any;
}

export default function TabelJadwal({ filterConfig }: Props) {
  const [data] = useState<any | null>(dummyTabelJadwalData);
  const [loading] = useState<boolean>(false);

  const todayMasuk = new Date();
  const todayKeluar = new Date();

  //! DEBUG
  todayMasuk.setHours(9, 0, 0, 0); // Set jam menjadi 09:00
  todayKeluar.setHours(17, 0, 0, 0); // Set jam menjadi 17:00
  //! DEBUG

  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);

  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);

  // Sort Congig
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>({ key: "nama", direction: "asc" });
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
  const bodyColor = useBodyColor();
  const contentBgColor = useContentBgColor();
  const whiteDarkColor = useWhiteDarkColor();

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
          <Table minW={"100%"}>
            <Thead>
              <Tr position={"sticky"} top={0} bg={bodyColor} zIndex={3}>
                <Th
                  position={"sticky"}
                  left={0}
                  p={0}
                  borderBottom={"none !important"}
                  zIndex={3}
                >
                  <Center
                    p={4}
                    h={"52px"}
                    borderRight={"1px solid var(--divider3)"}
                    bg={bodyColor}
                    borderBottom={"1px solid var(--divider3) !important"}
                  >
                    <Checkbox colorScheme="ap" />
                  </Center>
                </Th>

                <Th
                  position={"sticky"}
                  left={"49px"}
                  bg={bodyColor}
                  onClick={() => sort("nama")}
                  cursor={"pointer"}
                  p={0}
                  borderBottom={"none !important"}
                >
                  <HStack
                    justify={"space-between"}
                    borderBottom={"1px solid var(--divider3)"}
                    borderRight={"1px solid var(--divider3)"}
                    px={4}
                    py={3}
                    h={"52px"}
                  >
                    <Text fontWeight={600} flexShrink={0} lineHeight={1.2}>
                      Nama
                    </Text>

                    {sortConfig && sortConfig.key === "nama" && (
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

                <JadwalTabelHeader range_tgl={filterConfig.range_tgl} />
              </Tr>
            </Thead>

            <Tbody>
              {sortedData.map((jadwalData: any, i: number) => (
                <Tr key={i} bg={i % 2 === 0 ? contentBgColor : bodyColor}>
                  <Td
                    position={"sticky"}
                    left={0}
                    p={0}
                    bg={bodyColor}
                    zIndex={2}
                  >
                    <Center
                      h={"94px"}
                      bg={i % 2 === 0 ? contentBgColor : bodyColor}
                      p={4}
                      borderRight={"1px solid var(--divider3)"}
                    >
                      <Checkbox colorScheme="ap" />
                    </Center>
                  </Td>

                  <Td
                    position={"sticky"}
                    left={"49px"}
                    p={0}
                    zIndex={2}
                    bg={i % 2 === 0 ? contentBgColor : bodyColor}
                  >
                    <HStack
                      px={4}
                      py={2}
                      h={"94px"}
                      borderRight={"1px solid var(--divider3)"}
                    >
                      <Avatar
                        src={jadwalData.foto_profil}
                        name={jadwalData.nama}
                        size={"sm"}
                      />
                      <Text>{jadwalData.nama}</Text>
                    </HStack>
                  </Td>

                  {jadwalData.jadwal_list.map((jadwal: any, ii: number) => {
                    if (!jadwal) {
                      return (
                        <Td
                          key={ii}
                          pt={i === 0 ? 4 : 2}
                          pb={i === data.length - 1 ? 4 : 2}
                          pl={ii === 0 ? 4 : 2}
                          pr={ii === jadwalData.jadwal_list.length - 1 ? 4 : 2}
                        >
                          <VStack
                            p={3}
                            gap={1}
                            borderRadius={8}
                            w={"180px"}
                            h={"70px"}
                            cursor={"pointer"}
                            bg={bodyColor}
                            color={whiteDarkColor}
                            className="btn-ap clicky"
                            // border={"1px solid var(--divider3) !important"}
                          >
                            <Icon as={RiEditBoxLine} fontSize={20} />
                            <Text>Terapkan</Text>
                          </VStack>
                        </Td>
                      );
                    }

                    return (
                      <Td
                        key={ii}
                        pt={i === 0 ? 4 : 2}
                        pb={i === data.length - 1 ? 4 : 2}
                        pl={ii === 0 ? 4 : 2}
                        pr={ii === jadwalData.jadwal_list.length - 1 ? 4 : 2}
                      >
                        <VStack
                          p={3}
                          gap={1}
                          borderRadius={8}
                          // bg={"var(--p500a3)"}
                          bg={"var(--divider)"}
                          w={"180px"}
                          h={"70px"}
                          // border={"1px solid var(--p500a2)"}
                          // color={whiteDarkColor}
                          align={"stretch"}
                        >
                          <Box>
                            <Text noOfLines={1} mb={1} fontSize={14}>
                              {jadwal.label}
                            </Text>
                            <Text whiteSpace={"nowrap"} fontSize={14}>
                              {formatTime(jadwal.jam_masuk)} -{" "}
                              {formatTime(jadwal.jam_keluar)}
                            </Text>
                          </Box>
                        </VStack>
                      </Td>
                    );
                  })}
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
