import { Button, Wrap } from "@chakra-ui/react";
import { Dispatch } from "react";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";
import { usePrimaryAlphaColor } from "../../../const/colors";

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

  // SX
  const primaryAlphaColor = usePrimaryAlphaColor();

  return (
    <FilterItemWrapper
      title="Status Karyawan"
      filterValue={filterConfig.status_karyawan}
      setFilterConfig={setFilterConfig}
      filterKey="status_karyawan"
    >
      <Wrap py={4}>
        {statusKaryawanList?.map((data, i) => {
          const active =
            filterConfig?.status_karyawan &&
            filterConfig?.status_karyawan.some(
              (unit: any) => unit.id === data.id
            );

          return (
            <Button
              key={i}
              borderRadius={"full"}
              className="btn-outline"
              fontWeight={400}
              opacity={active ? 1 : 0.6}
              bg={active && `${primaryAlphaColor} !important`}
              borderColor={active && "var(--p500a2)"}
              onClick={() => {
                setFilterConfig((ps: any) => {
                  // Mengecek apakah data sudah ada dalam status_karyawan
                  const isDataExist =
                    ps.status_karyawan &&
                    ps.status_karyawan.some((unit: any) => unit.id === data.id);

                  // Jika data sudah ada, maka hapus data dari status_karyawan
                  if (isDataExist) {
                    return {
                      ...ps,
                      status_karyawan: ps.status_karyawan.filter(
                        (unit: any) => unit.id !== data.id
                      ),
                    };
                  } else {
                    // Jika data belum ada, maka tambahkan data ke status_karyawan
                    return {
                      ...ps,
                      status_karyawan: ps.status_karyawan
                        ? [...ps.status_karyawan, data]
                        : [data],
                    };
                  }
                });
              }}
            >
              {data.nama_status}
            </Button>
          );
        })}
      </Wrap>
    </FilterItemWrapper>
  );
}
