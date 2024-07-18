import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import SelectMultiStatusCuti from "../../components/dependent/_Select/SelectMultiStatusCuti";
import SelectMultiTipeCuti from "../../components/dependent/_Select/SelectMultiTipeCuti";
import TabelCuti from "../../components/dependent/TabelCuti";
import SearchComponent from "../../components/dependent/SearchComponent";
import AjukanCutiModal from "../../components/independent/AjukanCutiModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

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

            <Button
              flex={"1 1 110px"}
              variant={"outline"}
              colorScheme="ap"
              className="clicky"
              rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
            >
              Export
            </Button>

            <AjukanCutiModal flex={"1 1 220px"} />
          </Wrap>

          <TabelCuti filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
