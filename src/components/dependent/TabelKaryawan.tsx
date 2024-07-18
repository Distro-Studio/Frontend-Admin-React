import { Box, HStack, useDisclosure } from "@chakra-ui/react";
import { dummyKaryawans } from "../../const/dummy";
import { Interface__Karyawan } from "../../const/interfaces";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import CustomTable from "./CustomTable";
import Retry from "./Retry";
import StatusKaryawanBadge from "./StatusKaryawanBadge";
import TabelFooterConfig from "./TabelFooterConfig";
import { useState } from "react";
import DetailKaryawanModal from "./DetailKaryawanModal";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import { responsiveSpacing } from "../../const/sizes";

interface Props {
  filterConfig?: any;
}

export default function TabelKaryawan({ filterConfig }: Props) {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Karyawan Detail Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Filter Config
  const { filterKaryawan } = useFilterKaryawan();

  const { error, loading, data, retry } = useDataState<Interface__Karyawan[]>({
    initialData: dummyKaryawans,
    url: "",
    limit: limitConfig,
    dependencies: [limitConfig, pageConfig, filterKaryawan],
  });
  const formattedHeader = [
    {
      th: "Nama",
      isSortable: true,
      props: {
        position: "sticky",
        left: "52px",
        zIndex: 99,
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
      },
    },
    {
      th: "No. Induk Karyawan",
      isSortable: true,
    },
    {
      th: "No. Rekam Medis",
      isSortable: true,
    },
    {
      th: "Unit Kerja",
      isSortable: true,
    },
    {
      th: "Status Karyawan",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
  ];
  const formattedData = data?.map((karyawan: Interface__Karyawan) => ({
    id: karyawan.id,
    rows: [
      {
        column: "nama",
        value: karyawan.user.nama,
        td: <AvatarAndNameTableData data={karyawan} />,
        props: {
          position: "sticky",
          left: "52px",
          zIndex: 2,
        },
        cProps: {
          borderRight: "1px solid var(--divider3)",
        },
      },
      {
        column: "nik",
        value: karyawan.nik,
        td: karyawan.nik,
        isNumeric: true,
      },
      {
        column: "no_rm",
        value: karyawan.no_rm,
        td: karyawan.no_rm,
        isNumeric: true,
      },
      {
        column: "unit_kerja",
        value: karyawan.unit_kerja.nama_unit,
        td: karyawan.unit_kerja.nama_unit,
      },
      {
        column: "status_karyawan",
        value: karyawan.status_karyawan.label,
        td: (
          <StatusKaryawanBadge
            w={"120px"}
            data={karyawan.status_karyawan.label}
          />
        ),
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
                <Skeleton maxW={"112px"} />
              </HStack>
            </>
          )}
          {!loading && (
            <>
              {!formattedData && <NoData />}

              {formattedData && (
                <>
                  <CustomTableContainer flex={1}>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      // @ts-ignore
                      formattedData={formattedData}
                      onBatchAction={(selectedRows) => {
                        console.log("selected_rows", selectedRows);
                      }}
                      onRowClick={() => {
                        onOpen();
                      }}
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
                  />

                  <DetailKaryawanModal
                    karyawan_id={1}
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
