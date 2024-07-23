import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { dummyTabelJadwalData } from "../../const/dummy";
import useDataState from "../../hooks/useDataState";
import NoData from "../independent/NoData";
import Skeleton from "../independent/Skeleton";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import CustomTable from "./CustomTable";
import TabelJadwalItem from "./JadwalTabelItem";
import Retry from "./Retry";
import TabelFooterConfig from "./TabelFooterConfig";
import TerapkanJadwalKaryawanTerpilih from "./TerapkanJadwalKaryawanTerpilih";
import { eachDayOfInterval } from "date-fns";
import formatDate from "../../lib/formatDate";

interface Props {
  filterConfig?: any;
}

export default function TabelJadwal({ filterConfig }: Props) {
  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);
  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyTabelJadwalData,
    url: "",
    payload: filterConfig,
    limit: limitConfig,
    dependencies: [limitConfig, pageConfig, filterConfig],
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
    ...eachDayOfInterval({
      start: filterConfig.range_tgl.from,
      end: filterConfig.range_tgl.to,
    }).map((date) => ({
      th: formatDate(date, "longShort"),
    })),
  ];
  const formattedData = data?.map((item: any) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.user.nama,
        td: <AvatarAndNameTableData data={item} withJenisKaryawan />,
        props: {
          position: "sticky",
          left: 0,
          zIndex: 2,
        },
        cProps: {
          h: "92px",
          borderRight: "1px solid var(--divider3)",
        },
      },
      ...(item.list_jadwal?.map((jadwal: any, i: number) => ({
        value: jadwal?.label,
        td:
          jadwal !== null ? (
            <TabelJadwalItem
              data={item}
              jadwal={jadwal}
              tgl={new Date()}
              index={i}
            />
          ) : (
            <TerapkanJadwalKaryawanTerpilih
              data={item}
              tgl={new Date()}
              index={i}
            />
          ),
        cProps: {
          align: "stretch",
          h: "92px",
          p: "6px",
        },
      })) || []),
    ],
  }));

  // console.log(formattedData);

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
              {(!data || (data && data.length === 0)) && <NoData />}
              {(data || (data && data.length > 0)) && (
                <>
                  <CustomTableContainer>
                    <CustomTable
                      formattedHeader={formattedHeader}
                      formattedData={formattedData}
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
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
