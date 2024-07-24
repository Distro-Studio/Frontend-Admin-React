import { HStack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { responsiveSpacing } from "../../const/sizes";
import formatNumber from "../../lib/formatNumber";
import NotFound from "../independent/NotFound";
import CustomTableContainer from "../wrapper/CustomTableContainer";
import AvatarAndNameTableData from "./AvatarAndNameTableData";
import CustomTable from "./CustomTable";
import DetailPenggajianKaryawanModal from "./DetailPenggajianKaryawanModal";
import SearchComponent from "./input/SearchComponent";

interface Props {
  data: any[];
}

export default function TabelDetailPenggajian({ data }: Props) {
  // Detail Penggajian Karyawan Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            onRowClick={onOpen}
            // rowOptions={rowOptions}
          />
        </CustomTableContainer>
      )}

      <DetailPenggajianKaryawanModal
        karyawan_id={1}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}
