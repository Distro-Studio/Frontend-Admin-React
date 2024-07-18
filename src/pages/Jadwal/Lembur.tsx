import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import SelectMultiKompensasi from "../../components/dependent/_Select/SelectMultiKompensasi";
import TabelLembur from "../../components/dependent/TabelLembur";
import SearchComponent from "../../components/dependent/SearchComponent";
import AjukanLemburModal from "../../components/independent/AjukanLemburModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Lembur() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    kompensasi: [],
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmSelectKompensasi = (newKompensasi: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      kompensasi: newKompensasi,
    }));
  };

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

            <SelectMultiKompensasi
              nullLabel={"Semua Kompensasi"}
              placeholder="Filter Kompensasi"
              initialSelected={filterConfig.kompensasi}
              confirmSelect={confirmSelectKompensasi}
              noSearch
              flex={"1 1 165px"}
              maxDisplayed={1}
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

            <AjukanLemburModal flex={"1 1 220px"} />
          </Wrap>

          <TabelLembur filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
