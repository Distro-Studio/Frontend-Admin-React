import { Button, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ExportModal from "../../components/dependent/ExportModal";
import ImportModal from "../../components/dependent/ImportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelKaryawan from "../../components/dependent/Karyawan/TabelKaryawan";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";

export default function Karyawan() {
  const { filterKaryawan, setFilterKaryawan } = useFilterKaryawan();

  return (
    <>
      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <SearchComponent
              name="search"
              onChangeSetter={(input) => {
                setFilterKaryawan((ps: any) => ({
                  ...ps,
                  search: input,
                }));
              }}
              inputValue={filterKaryawan.search}
            />

            <FilterKaryawan flex={"1 1 110px"} />

            <ExportModal url={""} flex={"1 1 110px"} />

            <ImportModal url={""} flex={"1 1 110px"} />

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

          <TabelKaryawan />
        </CContainer>
      </CWrapper>
    </>
  );
}
