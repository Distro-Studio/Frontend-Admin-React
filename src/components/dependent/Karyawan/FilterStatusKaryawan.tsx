import { Box, Button } from "@chakra-ui/react";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";
import { Dispatch } from "react";

interface Props {
  filterConfig: any;
  setFilterConfig: Dispatch<any>;
}

export default function FilterStatusKaryawan({
  filterConfig,
  setFilterConfig,
}: Props) {
  const statusKaryawanList = [
    {
      id: 1,
      nama_status: "Tetap",
    },
    {
      id: 2,
      nama_status: "Kontrak",
    },
    {
      id: 3,
      nama_status: "Magang",
    },
  ];
  //TODO get list status karyawan

  return (
    <FilterItemWrapper
      title="Status Karyawan"
      filterValue={filterConfig.status_karyawan?.nama_status}
      setFilterConfig={setFilterConfig}
      filterKey="status_karyawan"
    >
      <>
        {statusKaryawanList.map((data, i) => (
          <Button
            key={i}
            opacity={
              filterConfig?.status_karyawan &&
              filterConfig?.status_karyawan?.id === data.id
                ? 1
                : 0.6
            }
            justifyContent={"space-between"}
            gap={4}
            fontWeight={400}
            className="btn"
            flexShrink={0}
            borderRadius={0}
            h={"50px"}
            // color={data.id === filterConfig.status_karyawan ? "p.500" : ""}
            onClick={() => {
              setFilterConfig((ps: any) => ({ ...ps, status_karyawan: data }));
            }}
          >
            {data.nama_status}

            {filterConfig?.status_karyawan &&
              filterConfig?.status_karyawan?.id === data.id && (
                <Box h={"6px"} w={"6px"} borderRadius={"full"} bg={"p.500"} />
              )}
          </Button>
        ))}
      </>
    </FilterItemWrapper>
  );
}
