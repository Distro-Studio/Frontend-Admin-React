import { Box, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { dummyRekamJejak } from "../../const/dummy";
import { Interface__DetailKaryawan } from "../../const/interfaces";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import useDataState from "../../hooks/useDataState";
import formatDate from "../../lib/formatDate";
import formatMasaKerja from "../../lib/formatMasaKerja";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import CustomTable from "./CustomTable";
import DetailKaryawanModal from "./DetailKaryawanModal";
import Retry from "./Retry";
import TabelFooterConfig from "./TabelFooterConfig";

interface Props {
  filterConfig?: any;
}

export default function TabelRekamJejak({ filterConfig }: Props) {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);
  // Karyawan Detail Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Filter Config
  const { filterKaryawan } = useFilterKaryawan();

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyRekamJejak,
    url: "",
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
        w: "180px",
      },
      cProps: {
        borderRight: "1px solid var(--divider3)",
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
      isSortable: true,
    },
    {
      th: "Mutasi",
      isSortable: true,
    },
  ];
  const formattedData = data?.map((karyawan: Interface__DetailKaryawan) => ({
    id: karyawan.id,
    columns: [
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
          borderRight: "1 px solid var(--divider3)",
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
