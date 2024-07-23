import { Box, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { dummyPresensi } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";
import useDataState from "../../hooks/useDataState";
import formatTime from "../../lib/formatTime";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";
import DetailPresensiKaryawanModal from "./DetailPresensiKaryawanModal";
import Retry from "./Retry";
import TabelFooterConfig from "./TabelFooterConfig";

interface Props {
  filterConfig?: any;
}

export default function TabelPresensi({ filterConfig }: Props) {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Presensi Detail Disclosure Config
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Columns Config
  // const { columnsConfig } = useKaryawanTableColumnsConfig();

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyPresensi,
    url: "",
    payload: filterConfig,
    dependencies: [],
  });

  const formattedHeader = [
    {
      th: "Nama",
      isSortable: true,
      props: {
        position: "sticky",
        left: 0,
        zIndex: 99,
        w: "180px",
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
      },
    },
    {
      th: "Jenis Karyawan",
      isSortable: true,
      justify: "center",
    },
    {
      th: "Unit Kerja",
      isSortable: true,
    },
    {
      th: "Presensi Masuk",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Presensi keluar",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
  ];
  const formattedData = data?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.user.nama,
        td: <AvatarAndNameTableData data={item} />,
        props: {
          position: "sticky",
          left: 0,
          zIndex: 2,
        },
        cProps: {
          borderRight: "1px solid var(--divider3)",
        },
      },
      {
        value: item.unit_kerja.jenis_karyawan,
        td: (
          <BooleanBadge
            w={"120px"}
            data={item.unit_kerja.jenis_karyawan}
            colorScheme={item.unit_kerja.jenis_karyawan ? "cyan" : "orange"}
            trueValue="Shift"
            falseValue="Non-Shift"
          />
        ),
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.unit_kerja.nama_unit,
        td: item.unit_kerja.nama_unit,
      },
      {
        value: item.jam_masuk,
        td: formatTime(item.jam_masuk),
        isTime: true,
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.jam_keluar,
        td: formatTime(item.jam_keluar),
        isTime: true,
        cProps: {
          justify: "center",
        },
      },
    ],
  }));

  return (
    <>
      {error && (
        <Box my={"auto"}>
          <Retry loading={loading} retry={retry} />
        </Box>
      )}
      {!error && (
        <>
          {loading && (
            <>
              <Skeleton flex={1} mx={"auto"} />
              <HStack justify={"space-between"} mt={responsiveSpacing}>
                <Skeleton maxW={"120px"} />
                <Skeleton maxW={"300px"} h={"20px"} />
                <Skeleton maxW={"112px"} />
              </HStack>
            </>
          )}
          {!loading && (
            <>
              {!formattedData && <NoData />}

              {formattedData && (
                <>
                  <CustomTableContainer>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
                      onRowClick={onOpen}
                      // columnsConfig={columnsConfig}
                    />
                  </CustomTableContainer>

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
                    footer={
                      <Text opacity={0.4}>
                        Klik row untuk melihat detail presensi
                      </Text>
                    }
                  />

                  <DetailPresensiKaryawanModal
                    presensi_id={1}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
