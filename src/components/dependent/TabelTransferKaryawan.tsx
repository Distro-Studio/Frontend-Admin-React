import { Box, HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { RiEditLine, RiShutDownLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import { dummyTransferKaryawan } from "../../const/dummy";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import useTabelKaryawanColumns from "../../global/useTabelKaryawanColumns";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import Retry from "./Retry";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import CustomTable from "./CustomTable";
import TabelFooterConfig from "./TabelFooterConfig";
import DetailKaryawanModal from "./DetailKaryawanModal";

export default function TabelRekamJejak() {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Karyawan Detail Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Filter Config
  const { filterKaryawan } = useFilterKaryawan();
  // Batch Actions Config
  const batchActions = [
    {
      label: "Non-aktifkan",
      icon: (
        <Icon
          as={RiShutDownLine}
          fontSize={iconSize}
          opacity={0.4}
          // color={chartColors[4]}
        />
      ),
      callback: (selectedRows: number[]) => {
        console.log("Non-aktifkan", selectedRows);
      },
    },
    {
      label: "Export",
      icon: (
        <Icon
          as={RiUploadLine}
          fontSize={iconSize}
          opacity={0.4}
          // color={chartColors[1]}
        />
      ),
      callback: (selectedRows: number[]) => {
        console.log("Exporting", selectedRows);
      },
    },
  ];
  // Columns Config
  const { tabelKaryawanColumns } = useTabelKaryawanColumns();
  // Row Options Config
  const rowOptions = [
    {
      label: "Edit",
      icon: <Icon as={RiEditLine} fontSize={iconSize} opacity={0.4} />,
      callback: (row: any) => {
        console.log("Editing", row);
      },
    },
    {
      label: "Non-aktifkan",
      icon: (
        <Icon
          as={RiShutDownLine}
          fontSize={iconSize}
          opacity={0.4}
          // color={chartColors[4]}
        />
      ),
      callback: (selectedRows: number[]) => {
        console.log("Non-aktifkan", selectedRows);
      },
    },
  ];

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyTransferKaryawan,
    url: "",
    dependencies: [],
  });

  const formattedHeader = [
    {
      th: "Nama",
      isSortable: true,
      props: {
        position: "sticky",
        left: "52px",
        zIndex: 99,
        w: "180px",
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
    {
      th: "Email",
      isSortable: true,
    },
    {
      th: "Username",
      isSortable: true,
    },
    {
      th: "Status Aktif",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Ayah",
      isSortable: true,
    },
    {
      th: "Ibu",
      isSortable: true,
    },
    {
      th: "Jumlah Keluarga",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Tanggal Masuk",
      isSortable: true,
    },
    {
      th: "Tanggal Keluar",
      isSortable: true,
    },
    {
      th: "Masa Kerja",
      isSortable: true,
    },
    {
      th: "Promosi",
    },
    {
      th: "Mutasi",
    },
  ];
  const formattedData = data?.map((riwayat: any) => ({
    id: riwayat.id,
    rows: [
      {
        value: "-",
        td: "-",
        props: {
          position: "sticky",
          left: "52px",
          zIndex: 2,
        },
        cProps: {
          borderRight: "1px solid var(--divider3)",
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
              {(!data || (data && data.length === 0)) && <NoData />}

              {(data || (data && data.length > 0)) && (
                <>
                  <CustomTableContainer>
                    {/* <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
                      batchActions={batchActions}
                      onRowClick={() => {
                        onOpen();
                      }}
                      columnsConfig={tabelKaryawanColumns}
                      rowOptions={rowOptions}
                    /> */}
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
                        Klik row untuk melihat detail karyawan
                      </Text>
                    }
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
