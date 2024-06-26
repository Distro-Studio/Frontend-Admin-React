import {
  Avatar,
  Box,
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
import { addDays } from "date-fns";
import { useState } from "react";
import { useBodyColor, useContentBgColor } from "../../../const/colors";
import { dummyTabelJadwalData } from "../../../const/dummy";
import ComponentSpinner from "../../independent/ComponentSpinner";
import TabelContainer from "../../wrapper/TabelContainer";
import JenisKaryawanBadge from "../JenisKaryawanBadge";
import TabelFooterConfig from "../TabelFooterConfig";
import TabelJadwalItem from "./JadwalTabelItem";
import TerapkanJadwalKaryawanTerpilih from "./TerapkanJadwalKaryawanTerpilih";
import JadwalTabelHeader from "./JadwalTabelHeader";

interface Props {
  filterConfig?: any;
  onCheckItem?: (checkedItem: any) => void;
}

export default function TabelJadwal({ onCheckItem, filterConfig }: Props) {
  const [data] = useState<any | null>(dummyTabelJadwalData);
  const [loading] = useState<boolean>(false);
  const dateList: Date | string[] = [];
  let currentDate = filterConfig.range_tgl.from;
  while (currentDate <= filterConfig.range_tgl.to) {
    dateList.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  //TODO get jadwal by given range

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

  return (
    <>
      {loading && <ComponentSpinner mt={4} />}

      {!loading && data && (
        <TabelContainer>
          <Table minW={"100%"}>
            <Thead>
              <Tr position={"sticky"} top={0} bg={bodyColor} zIndex={3}>
                <Th
                  position={"sticky"}
                  left={0}
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
              {sortedData.map((row: any, i: number) => (
                <Tr key={i} bg={i % 2 === 0 ? contentBgColor : bodyColor}>
                  <Td
                    position={"sticky"}
                    left={0}
                    p={0}
                    zIndex={2}
                    bg={i % 2 === 0 ? contentBgColor : bodyColor}
                    maxW={"250px"}
                  >
                    <HStack
                      px={4}
                      py={2}
                      h={"94px"}
                      gap={4}
                      borderRight={"1px solid var(--divider3)"}
                    >
                      <Avatar
                        src={row.foto_profil}
                        name={row.nama}
                        size={"md"}
                      />
                      <Box w={"100%"}>
                        <Text noOfLines={1} mb={2}>
                          {row.nama}
                        </Text>
                        <JenisKaryawanBadge
                          data={row.unit_kerja.jenis_karyawan}
                          w={"100%"}
                        />
                      </Box>
                    </HStack>
                  </Td>

                  {row.jadwal_list.map((jadwal: any, ii: number) => (
                    <Td
                      key={ii}
                      pl={ii === 0 ? 4 : 2}
                      pr={ii === row.jadwal_list.length - 1 ? 4 : 2}
                      py={2}
                    >
                      {!jadwal ? (
                        <TerapkanJadwalKaryawanTerpilih
                          data={row}
                          tgl={dateList[i]}
                        />
                      ) : (
                        <TabelJadwalItem
                          data={row}
                          jadwal={jadwal}
                          tgl={dateList[i]}
                        />
                      )}
                    </Td>
                  ))}
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
