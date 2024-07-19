import { Box, HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { RiShutDownLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import { dummyKaryawans } from "../../const/dummy";
import { Interface__DetailKaryawan } from "../../const/interfaces";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import CustomTable from "./CustomTable";
import DetailKaryawanModal from "./DetailKaryawanModal";
import Retry from "./Retry";
import StatusKaryawanBadge from "./StatusKaryawanBadge";
import TabelFooterConfig from "./TabelFooterConfig";
import formatDate from "../../lib/formatDate";
import formatMasaKerja from "../../lib/formatMasaKerja";
import BooleanBadge from "./BooleanBadge";

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

  const { error, loading, data, retry } = useDataState<
    Interface__DetailKaryawan[]
  >({
    initialData: dummyKaryawans,
    url: "",
    limit: limitConfig,
    dependencies: [limitConfig, pageConfig, filterKaryawan],
  });

  const formattedHeader = [
    {
      column: "nama",
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
      column: "nik",
      th: "No. Induk Karyawan",
      isSortable: true,
    },
    {
      column: "no_rm",
      th: "No. Rekam Medis",
      isSortable: true,
    },
    {
      column: "unit_kerja",
      th: "Unit Kerja",
      isSortable: true,
    },
    {
      column: "status_karyawan",
      th: "Status Karyawan",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      column: "email",
      th: "Email",
      isSortable: true,
    },
    {
      column: "username",
      th: "Username",
      isSortable: true,
    },
    {
      column: "status_aktif",
      th: "Status Aktif",
      isSortable: true,
    },
    {
      column: "ayah",
      th: "Ayah",
      isSortable: true,
    },
    {
      column: "ibu",
      th: "Ibu",
      isSortable: true,
    },
    {
      column: "jumlah_keluarga",
      th: "Jumlah Keluarga",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      column: "tgl_masuk",
      th: "Tanggal Masuk",
      isSortable: true,
    },
    {
      column: "tgl_keluar",
      th: "Tanggal Keluar",
      isSortable: true,
    },
    {
      column: "masa_kerja",
      th: "Masa Kerja",
      isSortable: true,
    },
    {
      column: "promosi",
      th: "Promosi",
    },
    {
      column: "mutasi",
      th: "Mutasi",
    },
  ];
  const formattedData = data?.map((karyawan: Interface__DetailKaryawan) => ({
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
      {
        column: "email",
        value: karyawan.email,
        td: karyawan.email,
      },
      {
        column: "username",
        value: karyawan.user.username,
        td: karyawan.user.username,
      },
      {
        column: "status_aktif",
        value: karyawan.user.status_aktif,
        td: (
          <BooleanBadge
            data={karyawan.user.status_aktif}
            trueValue="Aktif"
            falseValue="Tidak Aktif"
            w={"120px"}
          />
        ),
      },
      {
        column: "ayah",
        value: karyawan.ayah.nama,
        td: karyawan.ayah.nama,
      },
      {
        column: "ibu",
        value: karyawan.ibu.nama,
        td: karyawan.ibu.nama,
      },
      {
        column: "jumlah_keluarga",
        value: karyawan.jumlah_keluarga,
        td: karyawan.jumlah_keluarga,
        cProps: {
          justify: "center",
        },
      },
      {
        column: "tgl_masuk",
        value: karyawan.tgl_masuk,
        td: formatDate(karyawan.tgl_masuk),
      },
      {
        column: "tgl_keluar",
        value: karyawan.tgl_keluar,
        td: formatDate(karyawan.tgl_keluar),
      },
      {
        column: "masa_kerja",
        value: karyawan.masa_kerja,
        td: formatMasaKerja(karyawan.masa_kerja),
      },
      {
        column: "promosi",
        value: "-",
        td: "-",
      },
      {
        column: "mutasi",
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
              {!formattedData && <NoData />}

              {formattedData && (
                <>
                  <CustomTableContainer>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      // @ts-ignore
                      formattedData={formattedData}
                      batchActions={batchActions}
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
