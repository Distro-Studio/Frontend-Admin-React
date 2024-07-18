import { Box, HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { RiShutDownLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import { dummyKaryawans } from "../../const/dummy";
import { Interface__Karyawan } from "../../const/interfaces";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import chartColors from "../../constant/chartColors";
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
                      <Text opacity={0.4}>Klik row untuk melihat detail</Text>
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
