import { useState } from "react";
import { Interface__AnggotaKeluarga } from "../../const/interfaces";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import BooleanBadge from "./BooleanBadge";
import CustomTable from "./CustomTable";
import { HStack } from "@chakra-ui/react";
import { responsiveSpacing } from "../../const/sizes";
import SearchComponent from "./input/SearchComponent";
import NotFound from "../independent/NotFound";

interface Props {
  data: Interface__AnggotaKeluarga[];
}

export default function TabelDetailKeluargaKaryawan({ data }: Props) {
  const [search, setSearch] = useState("");

  const fd = data.filter((item) => {
    const searchTerm = search.toLowerCase();
    console.log(item.nama, searchTerm);
    return item.nama.toLowerCase().includes(searchTerm);
  });

  const formattedHeader = [
    {
      th: "Nama",
      isSortable: true,
    },
    {
      th: "Status Hubungan",
      isSortable: true,
    },
    {
      th: "Status Hidup",
      isSortable: true,
      cProps: {
        justify: "center",
      },
    },
    {
      th: "Pendidikan Terakhir",
      isSortable: true,
    },
    {
      th: "Pekerjaan",
      isSortable: true,
    },
    {
      th: "No. Telepon",
      isSortable: true,
    },
    {
      th: "Email",
      isSortable: true,
    },
  ];

  const formattedData = fd.map((item) => ({
    id: item.id,
    columnsFormat: [
      {
        value: item.nama,
        td: item.nama,
      },
      {
        value: item.hubungan.label,
        td: item.hubungan.label,
      },
      {
        value: item.status_hidup,
        td: (
          <BooleanBadge
            data={item.status_hidup}
            trueValue="Hidup"
            falseValue="Meninggal"
            w={"120px"}
          />
        ),
        cProps: {
          justify: "center",
        },
      },
      {
        value: item.pendidikan_terakhir,
        td: item.pendidikan_terakhir,
      },
      {
        value: item.pekerjaan,
        td: item.pekerjaan,
      },
      {
        value: item.no_hp,
        td: item.no_hp,
      },
      {
        value: item.email,
        td: item.email,
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
