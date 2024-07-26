import { Box, HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { RiEditLine } from "@remixicon/react";
import { useState } from "react";
import { dummyKaryawans } from "../../const/dummy";
import { Interface__DetailKaryawan } from "../../const/interfaces";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import useKaryawanTableColumnsConfig from "../../global/useKaryawanTableColumnsConfig";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import formatMasaKerja from "../../lib/formatMasaKerja";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";
import DetailKaryawanModal from "./DetailKaryawanModal";
import Retry from "./Retry";
import StatusKaryawanBadge from "./StatusKaryawanBadge";
import TabelFooterConfig from "./TabelFooterConfig";

export default function TabelKaryawan() {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Karyawan Detail Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Filter Config
  const { filterKaryawan } = useFilterKaryawan();
  // Columns Config
  const { columnsConfig } = useKaryawanTableColumnsConfig();
  // Row Options Config
  const rowOptions = [
    {
      callback: (row: any) => {
        console.log(row);
      },
      element: (
        <HStack w={"100%"} justify={"space-between"} gap={4}>
          <Text>Tes Aja</Text>
          <Icon as={RiEditLine} opacity={0.4} />
        </HStack>
      ),
    },
  ];
  const [userId, setUserId] = useState<number | undefined>(undefined);

  const { error, loading, data, retry } = useDataState<
    Interface__DetailKaryawan[]
  >({
    initialData: dummyKaryawans,
    url: "",
    payload: {
      filterConfig: filterKaryawan,
    },
    limit: limitConfig,
    dependencies: [limitConfig, pageConfig, filterKaryawan],
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
      th: "Status Aktif",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Status Karyawan",
      isSortable: true,
      cProps: {
        justify: "center",
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
      th: "Email",
      isSortable: true,
    },
    {
      th: "Username",
      isSortable: true,
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
  const formattedData = data?.map((item: Interface__DetailKaryawan) => ({
    id: item.user.id,
    columnsFormat: [
      {
        value: item.user.nama,
        td: (
          <AvatarAndNameTableData
            data={{
              id: item.user.id,
              nama: item.user.nama,
              foto_profil: item.user.foto_profil,
            }}
          />
        ),
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
        value: item.user.status_aktif,
        td: (
          <BooleanBadge
            data={item.user.status_aktif}
            trueValue="Aktif"
            falseValue="Tidak Aktif"
            w={"120px"}
          />
        ),
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.status_karyawan.label,
        td: (
          <StatusKaryawanBadge w={"120px"} data={item.status_karyawan.label} />
        ),
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.nik,
        td: item.nik,
        isNumeric: true,
      },
      {
        value: item.no_rm,
        td: item.no_rm,
        isNumeric: true,
      },
      {
        value: item.unit_kerja.nama_unit,
        td: item.unit_kerja.nama_unit,
      },
      {
        value: item.email,
        td: item.email,
      },
      {
        value: item.user.username,
        td: item.user.username,
      },
      {
        value: item.ayah.nama,
        td: item.ayah.nama,
      },
      {
        value: item.ibu.nama,
        td: item.ibu.nama,
      },
      {
        value: item.jumlah_keluarga,
        td: item.jumlah_keluarga,
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.tgl_masuk,
        td: formatDate(item.tgl_masuk),
        isDate: true,
      },
      {
        value: item.tgl_keluar,
        td: formatDate(item.tgl_keluar),
        isDate: true,
      },
      {
        value: item.masa_kerja,
        td: formatMasaKerja(item.masa_kerja),
      },
      {
        value: "-",
        td: "-",
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
              {!formattedData && <NoData minH={"400px"} />}

              {formattedData && (
                <>
                  <CustomTableContainer>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
                      onRowClick={(row) => {
                        setUserId(row.id);
                        onOpen();
                      }}
                      columnsConfig={columnsConfig}
                      rowOptions={rowOptions}
                      batchActions={rowOptions}
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
                    id={"detail-karyawan-row-on-click-modal"}
                    user_id={userId}
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
