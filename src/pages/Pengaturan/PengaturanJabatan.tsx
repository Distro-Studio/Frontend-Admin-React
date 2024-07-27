import { HStack, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import PengaturanNavs from "../../components/dependent/PengaturanNavs";
import TabelPengaturanJabatan from "../../components/dependent/TabelPengaturanJabatan";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TambahKelompokGaji from "../../components/independent/TambahKelompokGaji";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanJabatan() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CWrapper>
        <Wrap
          borderRadius={12}
          overflowY={"auto"}
          className="scrollY"
          align={"start"}
          pt={0}
          spacing={responsiveSpacing}
        >
          <PengaturanNavs activeTopNavs={1} active={1} />

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

              <TambahKelompokGaji minW={"fit-content"} />
            </HStack>

            <TabelPengaturanJabatan filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
