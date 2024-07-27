import { HStack, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import PengaturanNavs from "../../components/dependent/PengaturanNavs";
import TabelPengaturanKompetensi from "../../components/dependent/TabelPengaturanKompetensi";
import MultiSelectUnitKerja from "../../components/dependent/_Select/MultiSelectUnitKerja";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TambahKompetensi from "../../components/independent/TambahKompetensi";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanKuisioner() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    unit_kerja: [],
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CWrapper>
        <Wrap
          flex={1}
          borderRadius={12}
          overflowY={"auto"}
          className="scrollY"
          align={"start"}
          pt={0}
          spacing={responsiveSpacing}
        >
          <PengaturanNavs activeGroup={1} active={4} />

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
                  setFilterConfig((ps: any) => ({
                    ...ps,
                    search: input,
                  }));
                }}
                inputValue={filterConfig.search}
              />

              <MultiSelectUnitKerja
                name="unit_kerja"
                onConfirm={(input) => {
                  setFilterConfig((ps: any) => ({
                    ...ps,
                    unit_kerja: input,
                  }));
                }}
                inputValue={filterConfig.unit_kerja}
              />

              <TambahKompetensi minW={"fit-content"} />
            </HStack>

            <TabelPengaturanKompetensi filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
