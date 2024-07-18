import { Box } from "@chakra-ui/react";
import { dummyKaryawans } from "../../../const/dummy";
import { Interface__Karyawan } from "../../../const/interfaces";
import useDataState from "../../../hooks/useDataState";
import NoData from "../../alert/NoData";
import Skeleton from "../../independent/Skeleton";
import CustomTableContainer from "../../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "../AvatarAndNameTableData";
import CustomTable from "../CustomTable";
import Retry from "../Retry";
import StatusKaryawanBadge from "./StatusKaryawanBadge";

interface Props {
  filterConfig?: any;
}

export default function TabelKaryawan({ filterConfig }: Props) {
  const { error, loading, data, retry } = useDataState<Interface__Karyawan[]>({
    initialData: dummyKaryawans,
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
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} flex={1} mx={"auto"} />
              ))}
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
                      onBatchAction={(selectedIds) => {
                        console.log("selected_ids", selectedIds);
                      }}
                    />
                  </CustomTableContainer>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
