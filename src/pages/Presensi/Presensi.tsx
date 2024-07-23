import { Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import ImportModal from "../../components/dependent/ImportModal";
import DatePickerModal from "../../components/dependent/input/DatePickerModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelPresensi from "../../components/dependent/TabelPresensi";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import PresensiTotal from "../../components/independent/PresensiTotal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";

export default function Presensi() {
  const today = new Date();

  // Filter Config
  const { filterKaryawan, setFilterKaryawan } = useFilterKaryawan();
  const [filterConfig, setFilterConfig] = useState({
    ...filterKaryawan,
    tgl: [today],
  });
  const [search, setSearch] = useState("");
  const confirmDate = (newDate: Date | undefined) => {
    setFilterConfig((ps: any) => ({ ...ps, tgl: [newDate] }));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilterKaryawan((ps: any) => ({
        ...ps,
        search: search,
      }));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, setFilterKaryawan]);

  // SX

  return (
    <>
      <CWrapper>
        <PresensiTotal mb={responsiveSpacing} />

        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <SearchComponent
              flex={"1 0 200px"}
              name="search"
              onChangeSetter={(input) => {
                setSearch(input);
              }}
              inputValue={search}
            />

            <DatePickerModal
              id="presensi-date-picker"
              name="'date-picker"
              flex={"1 1 200px"}
              onConfirm={confirmDate}
              inputValue={filterConfig.tgl[0]}
              nonNullable
            />

            <FilterKaryawan />

            <ExportModal url="" title="Export Presnsi" />

            <ImportModal url="" title="Import Presnsi" />
          </Wrap>

          <TabelPresensi filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
