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
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import formatDate from "../../lib/formatDate";

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
      th: "Kategori Transfer",
      isSortable: true,
    },
    {
      th: "Tanggal Pengajuan",
      isSortable: true,
    },
    {
      th: "Tanggal Mulai",
      isSortable: true,
    },
    {
      th: "Unit Kerja Asal",
      isSortable: true,
    },
    {
      th: "Unit Kerja Tujuan",
      isSortable: true,
    },
    {
      th: "Jabatan Asal",
      isSortable: true,
    },
    {
      th: "Jabatan Tujuan",
      isSortable: true,
    },
    {
      th: "Alasan",
    },
    {
      th: "Dokumen",
      isSortable: true,
    },
  ];
  const formattedData = data?.map((item: any) => ({
    id: item.id,
    rows: [
      {
        value: item.user.nama,
        td: <AvatarAndNameTableData data={item} />,
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
        value: item.nik,
        td: item.nik,
        isNumeric: true,
      },
      {
        value: item.kategori.label,
        td: item.kategori.label,
      },
      {
        value: item.created_at,
        td: formatDate(item.created_at),
      },
      {
        value: item.tgl_mulai,
        td: formatDate(item.tgl_mulai),
      },
      {
        value: item.unit_kerja_asal.nama_unit,
        td: item.unit_kerja_asal.nama_unit,
      },
      {
        value: item.unit_kerja_tujuan.nama_unit,
        td: item.unit_kerja_tujuan.nama_unit,
      },
      {
        value: item.jabatan_asal.nama_jabatan,
        td: item.jabatan_asal.nama_jabatan,
      },
      {
        value: item.jabatan_tujuan.nama_jabatan,
        td: item.jabatan_tujuan.nama_jabatan,
      },
      {
        value: item.alasan,
        td: item.alasan,
      },
      {
        value: "-",
        td: "-",
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
                    <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
                      batchActions={batchActions}
                      onRowClick={() => {
                        onOpen();
                      }}
                      columnsConfig={tabelKaryawanColumns}
                      rowOptions={rowOptions}
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
