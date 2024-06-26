import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FilterTabelKaryawan from "../../components/dependent/Karyawan/FilterTabelKaryawan";
import TabelKaryawan from "../../components/dependent/Karyawan/TabelKaryawan";
import SearchComponent from "../../components/dependent/SearchComponent";
import ImportKaryawanModal from "../../components/independent/Karyawan/ImportKaryawanModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

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
              search={filterConfig.search}
              setSearch={(newSearch) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  search: newSearch,
                }));
              }}
            />

            <FilterTabelKaryawan
              defaultFilterConfig={defaultFilterConfig}
              filterConfig={filterConfig}
              setFilterConfig={setFilterConfig}
            />

            <Button
              flex={"1 1 110px"}
              variant={"outline"}
              colorScheme="ap"
              className="clicky"
              rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
            >
              Export
            </Button>

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
