import { Button, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExportModal from "../../components/dependent/ExportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelKaryawan from "../../components/dependent/Karyawan/TabelKaryawan";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import ImportKaryawanModal from "../../components/independent/Karyawan/ImportKaryawanModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function Karyawan() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    unit_kerja: [],
    status_karyawan: [],
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  return (
    <>
      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <SearchComponent
              name="search"
              onChangeSetter={(input) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  search: input,
                }));
              }}
              inputValue={filterConfig.search}
            />

            <FilterKaryawan />

            <ExportModal url={""} />

            <ImportKaryawanModal />

            <Button
              flex={"1 0 170px"}
              colorScheme="ap"
              className="btn-ap clicky"
              as={Link}
              to={"/karyawan/tambah-karyawan"}
            >
              Tambah Karyawan
            </Button>
          </Wrap>

          <TabelKaryawan filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
