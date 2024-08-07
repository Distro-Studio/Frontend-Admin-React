import { Center, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { dummyRiwayatPenggajian } from "../../const/dummy";
import { responsiveSpacing } from "../../const/sizes";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";
import DetailThrModal from "./DetailThrModal";
import Retry from "./Retry";
import TabelFooterConfig from "./TabelFooterConfig";

interface Props {
  filterConfig: any;
}

export default function TabelRiwayatThr({ filterConfig }: Props) {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Karyawan Detail Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { error, loading, data, retry } = useDataState<any[]>({
    initialData: dummyRiwayatPenggajian,
    url: "",
    payload: {
      filterConfig: filterConfig,
    },
    limit: limitConfig,
    dependencies: [limitConfig, pageConfig, filterConfig],
  });

  const formattedHeader = [
    {
      th: "Periode",
      isSortable: true,
      props: {
        position: "sticky",
        left: 0,
        zIndex: 3,
        w: "180px",
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
      },
    },
    {
      th: "Status THR",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Pembaruan Terakhir",
      isSortable: true,
    },
    {
      th: "Karyawan Dapat THR",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Dibuat",
      isSortable: true,
    },
  ];
  const formattedData = data?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.periode,
        td: formatDate(item.periode, "periode"),
        isDate: true,
        props: {
          position: "sticky",
          left: 0,
          zIndex: 2,
          w: "180px",
        },
        cProps: {
          borderRight: "1px solid var(--divider3)",
        },
      },
      {
        value: item.status_riwayat_gaji,
        td: (
          <BooleanBadge
            w={"150px"}
            data={item.status_riwayat_gaji}
            trueValue="Dipublikasi"
            falseValue="Belum Dipublikasi"
          />
        ),
        isNumeric: true,
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.updated_at,
        td: formatDate(item.updated_at),
        isDate: true,
      },
      {
        value: item.karyawan_verifikasi,
        td: item.karyawan_verifikasi,
        isNumeric: true,
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.created_at,
        td: formatDate(item.created_at),
        isDate: true,
      },
    ],
  }));

  return (
    <>
      {error && (
        <Center my={"auto"} minH={"400px"}>
          <Retry loading={loading} retry={retry} />
        </Center>
      )}
      {!error && (
        <>
          {loading && (
            <>
              <Skeleton minH={"300px"} flex={1} mx={"auto"} />
              <HStack justify={"space-between"} mt={responsiveSpacing}>
                <Skeleton maxW={"120px"} />
                <Skeleton maxW={"300px"} h={"20px"} />
                <Skeleton maxW={"112px"} />
              </HStack>
            </>
          )}
          {!loading && (
            <>
              {!formattedData && <NoData minH={"400px"} />}

              {formattedData && (
                <>
                  <CustomTableContainer>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
                      initialSortOrder="desc"
                      onRowClick={onOpen}
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
                        Klik row untuk melihat laporan penggajian
                      </Text>
                    }
                  />

                  <DetailThrModal
                    thr_id={1}
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
