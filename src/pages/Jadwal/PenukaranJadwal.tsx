import { Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelTukarJadwal from "../../components/dependent/TabelTukarJadwal";
import AjukanPenukaranJadwalModal from "../../components/independent/AjukanPenukaranJadwalModal";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import SelectStatusPenukaranJadwal from "../../components/dependent/_Select/SelectStatusPenukaranJadwal";

export default function PenukaranJadwal() {
  // Filter Config
  const { filterKaryawan, setFilterKaryawan } = useFilterKaryawan();
  const [filterConfig, setFilterConfig] = useState({
    ...filterKaryawan,
    status_pertukaran: undefined,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilterKaryawan({ search });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, setFilterKaryawan]);

  useEffect(() => {
    console.log("Current filterKaryawan state:", filterKaryawan);
  }, [filterKaryawan]);

  return (
    <>
      <CWrapper>
        <CContainer
          p={responsiveSpacing}
          bg={useBodyColor()}
          borderRadius={12}
          overflowY={"auto"}
        >
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <SearchComponent
              flex={"1 0 200px"}
              name="search"
              onChangeSetter={(input) => {
                setSearch(input);
              }}
              inputValue={search}
            />

            <SelectStatusPenukaranJadwal
              name="status_penukaran"
              onConfirm={(input) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  status_pertukaran: input,
                }));
              }}
              inputValue={filterConfig.status_pertukaran}
              w={"fit-content"}
            />

            <FilterKaryawan />

            <ExportModal url="" title="Export Penukaran Jadwal" />

            <AjukanPenukaranJadwalModal w={"fit-content"} />
          </Wrap>

          <TabelTukarJadwal filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
