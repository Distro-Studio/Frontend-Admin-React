import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import SelectMultiStatusCuti from "../../components/dependent/_Select/SelectMultiStatusCuti";
import SelectMultiTipeCuti from "../../components/dependent/_Select/SelectMultiTipeCuti";
import ExportModal from "../../components/dependent/ExportModal";
import SearchComponent from "../../components/dependent/SearchComponent";
import TabelCuti from "../../components/dependent/TabelCuti";
import AjukanCutiModal from "../../components/independent/AjukanCutiModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function Cuti() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    tipe: [],
    status: [],
    kompensasi: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmTipeCuti = (newTipe: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      tipe: newTipe,
    }));
  };
  const confirmStatusCuti = (newStatus: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      status: newStatus,
    }));
  };

  return (
    <>
      <CWrapper>
        <CContainer
          p={responsiveSpacing}
          bg={useBodyColor()}
          borderRadius={12}
          overflowY={"auto"}
          className="scrollY"
        >
          <HStack
            py={responsiveSpacing}
            justify={"space-between"}
            w={"100%"}
            className="tabelConfig scrollX"
            overflowX={"auto"}
            flexShrink={0}
          >
            <SearchComponent
              search={filterConfig.search}
              setSearch={(newSearch) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  search: newSearch,
                }));
              }}
            />
            <SelectMultiTipeCuti
              placeholder="Filter Tipe Cuti"
              nullLabel={"Semua Tipe Cuti"}
              initialSelected={filterConfig.tipe}
              confirmSelect={confirmTipeCuti}
              noSearch
              flex={"1 1 165px"}
              maxDisplayed={1}
            />
            <SelectMultiStatusCuti
              placeholder="Filter Status Cuti"
              nullLabel={"Semua Status Cuti"}
              initialSelected={filterConfig.status}
              confirmSelect={confirmStatusCuti}
              noSearch
              flex={"1 1 165px"}
              maxDisplayed={1}
            />
            <ExportModal url="" title="Export Cuti" />
            <AjukanCutiModal minW={"fit-content"} />
          </HStack>

          <TabelCuti filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
