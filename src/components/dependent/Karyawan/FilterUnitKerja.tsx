import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiSearch2Line } from "@remixicon/react";
import { Dispatch, useState } from "react";
import { useBodyColor } from "../../../const/colors";
import { iconSize } from "../../../const/sizes";
import DataNotFound from "../../independent/DataNotFound";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";

interface Props {
  filterConfig: any;
  setFilterConfig: Dispatch<any>;
}

export default function FilterUnitKerja({
  filterConfig,
  setFilterConfig,
}: Props) {
  const [search, setSearch] = useState<string>("");
  //TODO get list unit kerja
  //TODO get list unit kerja
  const dummy = [
    {
      id: 1,
      nama_unit: "Hukum dan Kerjasama",
      jenis_karyawan: 0,
      created_at: "2023-08-06T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 2,
      nama_unit: "Teknologi Informasi dan Komunikasi (TIK)",
      jenis_karyawan: 1,
      created_at: "2024-04-04T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 3,
      nama_unit: "Pemeliharaan Sarana Prasarana",
      jenis_karyawan: 0,
      created_at: "2023-07-08T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 4,
      nama_unit: "Mushola",
      jenis_karyawan: 1,
      created_at: "2024-01-27T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 5,
      nama_unit: "Pendidikan dan Pelatihan",
      jenis_karyawan: 0,
      created_at: "2024-03-15T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 6,
      nama_unit: "Fisioterapi",
      jenis_karyawan: 0,
      created_at: "2024-03-24T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 7,
      nama_unit: "Rehabilitasi Medik",
      jenis_karyawan: 0,
      created_at: "2023-06-21T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 8,
      nama_unit: "Penyakit Dalam",
      jenis_karyawan: 0,
      created_at: "2023-10-15T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 9,
      nama_unit: "Unit Gawat Darurat (UGD)",
      jenis_karyawan: 0,
      created_at: "2023-08-21T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 10,
      nama_unit: "Gigi dan Mulut",
      jenis_karyawan: 0,
      created_at: "2024-03-14T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 11,
      nama_unit: "Rekam Medis",
      jenis_karyawan: 1,
      created_at: "2024-04-22T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 12,
      nama_unit: "Patologi Klinik",
      jenis_karyawan: 1,
      created_at: "2024-05-05T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 13,
      nama_unit: "Radiologi",
      jenis_karyawan: 1,
      created_at: "2023-05-31T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 14,
      nama_unit: "Transportasi",
      jenis_karyawan: 0,
      created_at: "2023-10-11T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 15,
      nama_unit: "Kebersihan",
      jenis_karyawan: 1,
      created_at: "2023-10-10T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 16,
      nama_unit: "Keamanan",
      jenis_karyawan: 0,
      created_at: "2024-02-06T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 17,
      nama_unit: "Rawat Jalan",
      jenis_karyawan: 0,
      created_at: "2023-12-17T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 18,
      nama_unit: "Apotek",
      jenis_karyawan: 1,
      created_at: "2023-12-30T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 19,
      nama_unit: "Gizi",
      jenis_karyawan: 1,
      created_at: "2023-07-26T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 20,
      nama_unit: "Jantung",
      jenis_karyawan: 0,
      created_at: "2023-08-28T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 21,
      nama_unit: "Direktur",
      jenis_karyawan: 0,
      created_at: "2024-03-24T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
    {
      id: 22,
      nama_unit: "Promosi dan Humas",
      jenis_karyawan: 1,
      created_at: "2023-08-05T03:18:23.000000Z",
      updated_at: "2024-05-07T03:18:23.000000Z",
    },
  ];

  const filteredData = dummy.filter((data) =>
    data.nama_unit.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <FilterItemWrapper
      title="Unit Kerja"
      filterValue={filterConfig.unit_kerja?.nama_unit}
      setFilterConfig={setFilterConfig}
      filterKey="unit_kerja"
    >
      <InputGroup position={"sticky"} top={0} bg={useBodyColor()} zIndex={2}>
        <InputLeftElement>
          <Icon as={RiSearch2Line} fontSize={iconSize} color={"p.500"} />
        </InputLeftElement>

        <Input
          name="search"
          placeholder="Pencarian"
          border={"0 !important"}
          borderBottom={"1px solid var(--divider) !important"}
          borderRadius={"0 !important"}
          _focus={{
            border: "0 !important",
            borderBottom: "1px solid var(--p500) !important",
          }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </InputGroup>

      <VStack align={"stretch"} minH={"calc(300px - 52px)"} gap={0}>
        {filteredData?.length === 0 && <DataNotFound mt={4} />}

        {filteredData?.map((data, i) => (
          <HStack
            key={i}
            px={4}
            opacity={
              filterConfig?.unit_kerja &&
              filterConfig?.unit_kerja?.id === data.id
                ? 1
                : 0.6
            }
            justifyContent={"space-between"}
            gap={2}
            fontWeight={400}
            className="btn"
            flexShrink={0}
            borderRadius={0}
            h={"50px"}
            cursor={"pointer"}
            onClick={() => {
              setFilterConfig((ps: any) => ({ ...ps, unit_kerja: data }));
            }}
          >
            <Text noOfLines={1}>{data.nama_unit}</Text>

            {filterConfig?.unit_kerja &&
              filterConfig?.unit_kerja?.id === data.id && (
                <Box h={"6px"} w={"6px"} borderRadius={"full"} bg={"p.500"} />
              )}
          </HStack>
        ))}
      </VStack>
    </FilterItemWrapper>
  );
}
