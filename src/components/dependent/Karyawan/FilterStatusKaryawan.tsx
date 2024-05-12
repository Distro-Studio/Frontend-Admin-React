import { Button, Wrap } from "@chakra-ui/react";
import { Dispatch } from "react";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";

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
      <Wrap pt={2} pb={4} px={3}>
        {statusKaryawanList.map((data, i) => (
          <Button
            borderRadius={"full"}
            className="btn-outline"
            opacity={
              filterConfig?.status_karyawan &&
              filterConfig?.status_karyawan?.id === data.id
                ? 1
                : 0.6
            }
            // color={
            //   filterConfig?.status_karyawan &&
            //   filterConfig?.status_karyawan?.id === data.id
            //     ? "p.500"
            //     : ""
            // }
            borderColor={
              filterConfig?.status_karyawan &&
              filterConfig?.status_karyawan?.id === data.id
                ? "p.500"
                : ""
            }
            onClick={() => {
              setFilterConfig((ps: any) => ({ ...ps, status_karyawan: data }));
            }}
          >
            {data.nama_status}
          </Button>
        ))}
      </Wrap>
    </FilterItemWrapper>
  );
}
