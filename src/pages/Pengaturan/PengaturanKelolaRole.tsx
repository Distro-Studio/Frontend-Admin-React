import { Wrap } from "@chakra-ui/react";
import { useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import ImportModal from "../../components/dependent/ImportModal";
import PengaturanNavs from "../../components/dependent/PengaturanNavs";
import SearchComponent from "../../components/dependent/SearchComponent";
import TabelKelolaRole from "../../components/dependent/TabelPengaturanKelolaRole";
import TambahRole from "../../components/independent/TambahRole";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanKelolaRole() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  // SX
  // const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CWrapper overflowY={"auto"}>
        <Wrap
          flex={1}
          pt={0}
          borderRadius={12}
          overflowY={"auto"}
          className="scrollY"
          align={"start"}
        >
          <PengaturanNavs activeTopNavs={0} active={0} />

          <CContainer
            p={responsiveSpacing}
            h={"100%"}
            overflowY={"auto"}
            className="scrollY"
            bg={useBodyColor()}
            borderRadius={12}
            flex={"1 1 600px"}
          >
            <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
              <SearchComponent
                search={filterConfig.search}
                setSearch={(newSearch) => {
                  setFilterConfig((ps: any) => ({ ...ps, search: newSearch }));
                }}
              />

              <ExportModal url="" title="Export Kelola Role" />

              <ImportModal url="" title="Import Kelola Role" />

              <TambahRole minW={"fit-content"} />
            </Wrap>

            <TabelKelolaRole filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
