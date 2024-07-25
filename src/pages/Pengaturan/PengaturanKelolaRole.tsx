import { HStack, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import ImportModal from "../../components/dependent/ImportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import PengaturanNavs from "../../components/dependent/PengaturanNavs";
import TabelKelolaRole from "../../components/dependent/TabelPengaturanKelolaRole";
import TambahRole from "../../components/independent/TambahRole";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanKelolaRole() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  // SX
  const lightDarkColor = useLightDarkColor();

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
            px={responsiveSpacing}
            pb={responsiveSpacing}
            pt={0}
            h={"100%"}
            overflowY={"auto"}
            className="scrollY"
            bg={lightDarkColor}
            borderRadius={12}
            flex={"1 1 600px"}
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
                minW={"165px"}
                name="search"
                onChangeSetter={(input) => {
                  setFilterConfig(input);
                }}
                inputValue={filterConfig.search}
              />

              <ExportModal url="" title="Export Kelola Role" />

              <ImportModal url="" title="Import Kelola Role" />

              <TambahRole minW={"fit-content"} />
            </HStack>

            <TabelKelolaRole filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
