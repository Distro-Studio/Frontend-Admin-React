import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiAddBoxFill } from "@remixicon/react";
import { Link } from "react-router-dom";
import ExportModal from "../../components/dependent/ExportModal";
import ImportModal from "../../components/dependent/ImportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelKaryawan from "../../components/dependent/TabelKaryawan";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";

export default function Karyawan() {
  const { filterKaryawan, setFilterKaryawan } = useFilterKaryawan();

  return (
    <>
      <CWrapper overflowY={"auto"}>
        <CContainer
          flex={1}
          p={responsiveSpacing}
          bg={useBodyColor()}
          borderRadius={12}
          overflowY={"auto"}
        >
          <Wrap
            justify={"space-between"}
            w={"100%"}
            mb={responsiveSpacing}
            className="tabelConfig"
          >
            <Wrap>
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

              <FilterKaryawan px={6} />
            </Wrap>

            <Wrap>
              <ExportModal url={""} label={"Export Karyawan"} px={6} />

              <ImportModal url={""} label={"Import Karyawan"} px={6} />

              <Button
                flex={"1 0 170px"}
                colorScheme="ap"
                className="btn-ap clicky"
                leftIcon={<Icon as={RiAddBoxFill} fontSize={iconSize} />}
                as={Link}
                to={"/karyawan/tambah-karyawan"}
              >
                Tambah Karyawan
              </Button>
            </Wrap>
          </Wrap>

          <TabelKaryawan />
        </CContainer>
      </CWrapper>
    </>
  );
}
