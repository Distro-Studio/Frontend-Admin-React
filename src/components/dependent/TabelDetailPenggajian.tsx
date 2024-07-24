import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import { responsiveSpacing } from "../../const/sizes";
import formatNumber from "../../lib/formatNumber";
import NotFound from "../independent/NotFound";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";
import SearchComponent from "./input/SearchComponent";

interface Props {
  data: any[];
}

export default function TabelDetailPenggajian({ data }: Props) {
  const [search, setSearch] = useState("");

  const fd = data.filter((item) => {
    const searchTerm = search.toLowerCase();
    return item.user.nama.toLowerCase().includes(searchTerm);
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
      th: "Verifikasi Penggajian",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Unit Kerja",
      isSortable: true,
    },
    {
      th: "Kelompok Gaji",
      isSortable: true,
    },
    {
      th: "Gaji Pokok",
      isSortable: true,
      cProps: {
        justify: "end",
      },
    },
    {
      th: "Take Home Pay",
      isSortable: true,
      cProps: {
        justify: "end",
      },
    },
  ];
  const formattedData = fd.map((item) => ({
    id: item.id,
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
        value: item.status_penggajian,
        td: (
          <BooleanBadge
            data={item.status_penggajian}
            trueValue="Diverifikasi"
            falseValue="Belum Diverifikasi"
            w={"150px"}
          />
        ),
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.unit_kerja.nama_unit,
        td: item.unit_kerja.nama_unit,
      },
      {
        value: item.kelompok_gaji.nama_kelompok,
        td: item.kelompok_gaji.nama_kelompok,
      },
      {
        value: item.kelompok_gaji.besaran_gaji,
        td: `Rp ${formatNumber(item.kelompok_gaji.besaran_gaji)}`,
        isNumeric: true,
        cProps: {
          justify: "end",
        },
      },
      {
        value: item.take_home_pay,
        td: `Rp ${formatNumber(item.take_home_pay)}`,
        isNumeric: true,
        cProps: {
          justify: "end",
        },
      },
    ],
  }));

  return (
    <>
      <HStack mb={responsiveSpacing}>
        <SearchComponent
          name="search"
          onChangeSetter={(input) => {
            setSearch(input);
          }}
          inputValue={search}
          maxW={"400px"}
        />
      </HStack>

      {fd.length === 0 && <NotFound />}

      {fd.length > 0 && (
        <CustomTableContainer>
          <CustomTable
            formattedHeader={formattedHeader}
            formattedData={formattedData}
            // rowOptions={rowOptions}
          />
        </CustomTableContainer>
      )}
    </>
  );
}
